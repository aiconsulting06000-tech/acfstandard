#!/usr/bin/env python3
"""
Script de traduction automatique via Claude API
Traduit les 244 phrases dans 33 langues
"""

import json
import os
import time
from pathlib import Path
from typing import Dict, List

# Vous aurez besoin de : pip install anthropic
try:
    import anthropic
except ImportError:
    print("❌ Module 'anthropic' non installé")
    print("Installez-le avec : pip install anthropic")
    exit(1)

class AutoTranslator:
    def __init__(self, repo_path: str = "."):
        self.repo_path = Path(repo_path)
        self.final_mapping_file = self.repo_path / "string_to_key_mapping_FINAL.json"
        self.messages_dir = self.repo_path / "messages"
        self.output_dir = self.repo_path / "messages_translated"
        
        # Clé API
        self.api_key = None
        self.client = None
        
        # Données
        self.final_strings = {}
        self.existing_translations = {}
        
        # Configuration des langues
        self.languages = {
            # Existantes (14) - Mise à jour
            'en': 'English',
            'fr': 'French',
            'de': 'German',
            'es': 'Spanish',
            'it': 'Italian',
            'pt': 'Portuguese',
            'nl': 'Dutch',
            'sv': 'Swedish',
            'no': 'Norwegian',
            'da': 'Danish',
            'fi': 'Finnish',
            'pl': 'Polish',
            'ru': 'Russian',
            'zh': 'Chinese (Simplified)',
            
            # Nouvelles (19) - Création
            'ar': 'Arabic',
            'he': 'Hebrew',
            'tr': 'Turkish',
            'ja': 'Japanese',
            'ko': 'Korean',
            'vi': 'Vietnamese',
            'id': 'Indonesian',
            'ms': 'Malay',
            'th': 'Thai',
            'cs': 'Czech',
            'sk': 'Slovak',
            'hu': 'Hungarian',
            'ro': 'Romanian',
            'bg': 'Bulgarian',
            'hr': 'Croatian',
            'is': 'Icelandic',
            'et': 'Estonian',
            'lv': 'Latvian',
            'lt': 'Lithuanian',
        }
    
    def setup_api_key(self):
        """Configurer la clé API"""
        print("🔑 Configuration de la clé API Anthropic...")
        
        # Essayer variable d'environnement
        self.api_key = os.environ.get('ANTHROPIC_API_KEY')
        
        if not self.api_key:
            # Demander à l'utilisateur
            print("\nVotre clé API n'est pas dans les variables d'environnement.")
            print("Vous pouvez:")
            print("  1. L'entrer maintenant (sécurisé)")
            print("  2. Créer un fichier .env avec ANTHROPIC_API_KEY=votre_clé")
            print()
            self.api_key = input("Entrez votre clé API Anthropic (sk-ant-...): ").strip()
        
        if not self.api_key or not self.api_key.startswith('sk-ant-'):
            print("❌ Clé API invalide")
            exit(1)
        
        # Initialiser le client
        self.client = anthropic.Anthropic(api_key=self.api_key)
        print("✓ Clé API configurée")
    
    def load_data(self):
        """Charger les données"""
        print("\n📂 Chargement des données...")
        
        # Charger le mapping final
        with open(self.final_mapping_file, 'r', encoding='utf-8') as f:
            self.final_strings = json.load(f)
        print(f"✓ {len(self.final_strings)} phrases à traduire")
        
        # Charger les traductions existantes
        if self.messages_dir.exists():
            for json_file in self.messages_dir.glob("*.json"):
                lang = json_file.stem
                with open(json_file, 'r', encoding='utf-8') as f:
                    self.existing_translations[lang] = json.load(f)
            print(f"✓ {len(self.existing_translations)} fichiers existants chargés")
    
    def translate_batch(self, strings: List[str], target_lang: str) -> Dict[str, str]:
        """Traduire un batch de strings via Claude API"""
        
        lang_name = self.languages[target_lang]
        
        # Créer le prompt
        strings_json = json.dumps(strings, indent=2, ensure_ascii=False)
        
        prompt = f"""You are a professional translator. Translate the following English phrases into {lang_name}.

IMPORTANT RULES:
1. Preserve HTML entities like &amp; → keep as &amp;
2. Preserve special characters like ® ™ exactly
3. Maintain professional business tone
4. Keep proper nouns (ACF, Vincent DORANGE, etc.) unchanged
5. For acronyms like "EU AI Act", translate the full form but keep acronym
6. Return ONLY a JSON object with exact same keys, translated values
7. Do NOT add any explanation, just the JSON

Input strings to translate:
{strings_json}

Output format (JSON only):
{{
  "original string 1": "translated string 1",
  "original string 2": "translated string 2",
  ...
}}"""

        try:
            # Appel API
            message = self.client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=4000,
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            
            # Extraire la réponse
            response_text = message.content[0].text
            
            # Parser le JSON (nettoyer si nécessaire)
            response_text = response_text.strip()
            if response_text.startswith('```json'):
                response_text = response_text[7:]
            if response_text.startswith('```'):
                response_text = response_text[3:]
            if response_text.endswith('```'):
                response_text = response_text[:-3]
            response_text = response_text.strip()
            
            translations = json.loads(response_text)
            return translations
            
        except Exception as e:
            print(f"  ❌ Erreur traduction {lang_name}: {e}")
            return {}
    
    def translate_language(self, lang_code: str, batch_size: int = 20):
        """Traduire toutes les phrases pour une langue"""
        
        lang_name = self.languages[lang_code]
        print(f"\n🌍 Traduction en {lang_name} ({lang_code})...")
        
        # Créer la structure de base
        if lang_code in self.existing_translations:
            # Partir des traductions existantes
            result = self.existing_translations[lang_code].copy()
            print(f"  ✓ Base: traductions existantes")
        else:
            # Nouvelle langue, partir de vide
            result = {}
            print(f"  ✓ Nouvelle langue")
        
        # Traduire par batch
        strings_list = list(self.final_strings.keys())
        total_batches = (len(strings_list) + batch_size - 1) // batch_size
        
        for i in range(0, len(strings_list), batch_size):
            batch = strings_list[i:i+batch_size]
            batch_num = i // batch_size + 1
            
            print(f"  Batch {batch_num}/{total_batches} ({len(batch)} phrases)...", end=" ")
            
            translations = self.translate_batch(batch, lang_code)
            
            if translations:
                # Ajouter au résultat avec la structure de clés
                for original, translated in translations.items():
                    if original in self.final_strings:
                        key = self.final_strings[original]
                        self._set_nested_value(result, key, translated)
                
                print(f"✓")
            else:
                print(f"❌")
            
            # Pause pour éviter rate limit
            time.sleep(1)
        
        return result
    
    def _set_nested_value(self, d: dict, key_path: str, value: str):
        """Définir une valeur dans un dict imbriqué"""
        keys = key_path.split('.')
        current = d
        
        for key in keys[:-1]:
            if key not in current:
                current[key] = {}
            elif not isinstance(current[key], dict):
                # Clé existe déjà comme string, convertir en dict
                current[key] = {}
            current = current[key]
        
        current[keys[-1]] = value
    
    def save_translations(self, lang_code: str, translations: dict):
        """Sauvegarder les traductions"""
        self.output_dir.mkdir(exist_ok=True)
        
        output_file = self.output_dir / f"{lang_code}.json"
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(translations, f, indent=2, ensure_ascii=False)
        
        return output_file
    
    def run(self):
        """Exécuter la traduction complète"""
        print("="*60)
        print("TRADUCTION AUTOMATIQUE - 33 LANGUES")
        print("="*60)
        
        # Setup
        self.setup_api_key()
        self.load_data()
        
        # Créer dossier output
        self.output_dir.mkdir(exist_ok=True)
        
        print("\n" + "="*60)
        print("DÉBUT DE LA TRADUCTION")
        print("="*60)
        print(f"📝 {len(self.final_strings)} phrases à traduire")
        print(f"🌍 {len(self.languages)} langues cibles")
        print(f"⏱️  Estimation: ~{len(self.languages) * 2} minutes")
        print()
        
        input("Appuyez sur ENTRÉE pour démarrer...")
        
        # Traduire chaque langue
        results = {}
        for i, (lang_code, lang_name) in enumerate(self.languages.items(), 1):
            print(f"\n[{i}/{len(self.languages)}] {lang_name} ({lang_code})")
            
            translations = self.translate_language(lang_code, batch_size=20)
            output_file = self.save_translations(lang_code, translations)
            
            results[lang_code] = {
                'file': output_file,
                'keys_count': self._count_keys(translations)
            }
            
            print(f"  ✅ Sauvegardé: {output_file}")
            print(f"  📊 {results[lang_code]['keys_count']} clés totales")
        
        # Résumé final
        print("\n" + "="*60)
        print("TRADUCTION TERMINÉE")
        print("="*60)
        print(f"\n✅ {len(results)} fichiers créés dans: {self.output_dir}")
        print("\nRésumé par langue:")
        for lang_code, data in results.items():
            print(f"  {lang_code}: {data['keys_count']} clés")
        
        print("\n" + "="*60)
        print("ÉTAPES SUIVANTES")
        print("="*60)
        print(f"""
1. ✅ Vérifiez les fichiers dans {self.output_dir}/
2. ✅ Testez quelques traductions aléatoires
3. ⏭️  Remplacez messages/ par messages_translated/
4. ⏭️  Lancez le refactoring du code TSX
""")
    
    def _count_keys(self, d: dict) -> int:
        """Compter le nombre total de clés"""
        count = 0
        for value in d.values():
            if isinstance(value, dict):
                count += self._count_keys(value)
            else:
                count += 1
        return count

if __name__ == "__main__":
    translator = AutoTranslator()
    translator.run()
