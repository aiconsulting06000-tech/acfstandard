#!/usr/bin/env python3
"""
Script de nettoyage ULTRA-STRICT
Garde UNIQUEMENT les vraies phrases traduisibles
ZÉRO compromis
"""

import json
import re
from pathlib import Path

class UltraStrictCleaner:
    def __init__(self, repo_path: str = "."):
        self.repo_path = Path(repo_path)
        self.mapping_file = self.repo_path / "string_to_key_mapping.json"
        self.original_mapping = {}
        self.clean_mapping = {}
        self.rejected = {}
        
    def load_mapping(self):
        """Charger le mapping original"""
        print("📂 Chargement du mapping original...")
        with open(self.mapping_file, 'r', encoding='utf-8') as f:
            self.original_mapping = json.load(f)
        print(f"✓ {len(self.original_mapping)} entrées chargées")
    
    def is_real_translatable_text(self, string: str) -> tuple[bool, str]:
        """
        ULTRA-STRICT : Garde UNIQUEMENT du vrai texte
        """
        
        # RÈGLE 0 : Longueur minimale stricte
        if len(string) < 15:
            return False, "Trop court (<15 chars)"
        
        # RÈGLE 1 : Doit contenir des espaces (plusieurs mots)
        if ' ' not in string:
            return False, "Un seul mot"
        
        # RÈGLE 2 : Au moins 3 mots
        words = string.split()
        if len(words) < 3:
            return False, "Moins de 3 mots"
        
        # RÈGLE 3 : Commence par une lettre majuscule
        if not string[0].isupper():
            return False, "Ne commence pas par majuscule"
        
        # RÈGLE 4 : Pas de camelCase (acfCertification, logoText)
        if re.search(r'[a-z][A-Z]', string):
            return False, "CamelCase détecté"
        
        # RÈGLE 5 : Pas de parenthèses (fonctions CSS/JS)
        if '(' in string or ')' in string:
            return False, "Contient parenthèses"
        
        # RÈGLE 6 : Pas de caractères d'encodage bizarre
        if any(char in string for char in ['ÔÇö', 'Ô', '├', '┬', 'â']):
            return False, "Encodage suspect"
        
        # RÈGLE 7 : Pas de slash (chemins/URLs)
        if '/' in string or '\\' in string:
            return False, "Contient slash"
        
        # RÈGLE 8 : Pas de deux-points sans espace après (code/CSS)
        if re.search(r':\S', string):
            return False, "Format code/CSS"
        
        # RÈGLE 9 : Pas de accolades/crochets (code)
        if any(char in string for char in ['{', '}', '[', ']']):
            return False, "Contient accolades/crochets"
        
        # RÈGLE 10 : Pas de guillemets à l'intérieur
        if '"' in string or "'" in string or '`' in string:
            return False, "Contient guillemets"
        
        # RÈGLE 11 : Pas de symboles mathématiques/CSS
        if any(char in string for char in ['=', '+', '*', '%', '#', '$', '@']):
            return False, "Symboles techniques"
        
        # RÈGLE 12 : Pas de chiffres au début
        if string[0].isdigit():
            return False, "Commence par chiffre"
        
        # RÈGLE 13 : Pas plus de 50% de chiffres
        digit_count = sum(1 for c in string if c.isdigit())
        if digit_count / len(string) > 0.5:
            return False, "Trop de chiffres"
        
        # RÈGLE 14 : Au moins 50% de lettres
        letter_count = sum(1 for c in string if c.isalpha())
        if letter_count / len(string) < 0.5:
            return False, "Pas assez de lettres"
        
        # RÈGLE 15 : Chaque mot doit avoir au moins 2 lettres
        for word in words:
            clean_word = re.sub(r'[^\w]', '', word)
            if len(clean_word) > 0 and len(clean_word) < 2:
                return False, "Mots trop courts"
        
        # RÈGLE 16 : Pas de underscore (variables)
        if '_' in string:
            return False, "Contient underscore"
        
        # RÈGLE 17 : Pas de point sans espace après (domaines/code)
        if re.search(r'\.\S', string):
            # Exception : fin de phrase
            if not string.endswith('.'):
                return False, "Point sans espace (code)"
        
        # RÈGLE 18 : Mots communs du vocabulaire anglais
        common_words = [
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
            'of', 'with', 'by', 'from', 'about', 'as', 'into', 'through', 'after',
            'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
            'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might',
            'can', 'our', 'your', 'their', 'we', 'you', 'they', 'this', 'that', 'these',
            'those', 'what', 'which', 'who', 'when', 'where', 'why', 'how'
        ]
        words_lower = [w.lower() for w in words]
        has_common = any(w in common_words for w in words_lower)
        
        if not has_common:
            # Pas de mots communs, c'est peut-être du jargon technique
            # Mais on vérifie si ça ressemble à une phrase normale
            if not any(word[0].isupper() for word in words[1:]):
                # Aucune autre majuscule dans la phrase, suspect
                return False, "Pas de mots anglais communs"
        
        # RÈGLE 19 : Pas de séquences de ponctuation multiple
        if re.search(r'[.,;:!?]{2,}', string):
            return False, "Ponctuation multiple"
        
        # RÈGLE 20 : Longueur maximale raisonnable
        if len(string) > 300:
            return False, "Trop long (>300 chars)"
        
        # Si on arrive ici, c'est du VRAI texte
        return True, ""
    
    def clean_mapping_ultra_strict(self):
        """Nettoyage ultra-strict"""
        print("\n🔥 Nettoyage ULTRA-STRICT...")
        
        for string, key in self.original_mapping.items():
            is_valid, reason = self.is_real_translatable_text(string)
            
            if is_valid:
                self.clean_mapping[string] = key
            else:
                self.rejected[string] = reason
        
        print(f"✓ {len(self.clean_mapping)} strings VALIDES (texte pur)")
        print(f"✗ {len(self.rejected)} strings REJETÉES (code/CSS/variables)")
        
        reduction_rate = (1 - len(self.clean_mapping)/len(self.original_mapping)) * 100
        print(f"📊 Réduction: {reduction_rate:.1f}%")
    
    def save_clean_mapping(self):
        """Sauvegarder le mapping ultra-propre"""
        clean_file = self.repo_path / "string_to_key_mapping_ULTRACLEAN.json"
        
        with open(clean_file, 'w', encoding='utf-8') as f:
            json.dump(self.clean_mapping, f, indent=2, ensure_ascii=False)
        
        print(f"\n✓ Mapping ultra-propre: {clean_file}")
        return clean_file
    
    def show_all_kept_strings(self):
        """Afficher TOUTES les strings gardées pour validation"""
        print("\n" + "="*60)
        print(f"TOUTES LES {len(self.clean_mapping)} STRINGS GARDÉES")
        print("="*60)
        print("\nVérifiez que ce sont bien des phrases traduisibles:\n")
        
        for i, string in enumerate(sorted(self.clean_mapping.keys()), 1):
            print(f"{i:3}. {string}")
        
        print("\n" + "="*60)
    
    def save_rejection_report(self):
        """Rapport détaillé des rejets"""
        report_file = self.repo_path / "rejected_strings_ULTRASTRICT.json"
        
        by_reason = {}
        for string, reason in self.rejected.items():
            if reason not in by_reason:
                by_reason[reason] = []
            by_reason[reason].append(string)
        
        report = {
            "total_rejected": len(self.rejected),
            "total_kept": len(self.clean_mapping),
            "rejection_rate": f"{len(self.rejected)/len(self.original_mapping)*100:.1f}%",
            "by_reason": {
                reason: {
                    "count": len(strings),
                    "examples": strings[:20]
                }
                for reason, strings in sorted(by_reason.items(), 
                                             key=lambda x: len(x[1]), 
                                             reverse=True)
            }
        }
        
        with open(report_file, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        print(f"✓ Rapport ultra-strict: {report_file}")
    
    def run(self):
        """Exécution"""
        print("="*60)
        print("NETTOYAGE ULTRA-STRICT - VERSION FINALE")
        print("="*60)
        print("\nGarde UNIQUEMENT :")
        print("  ✓ Phrases avec 3+ mots")
        print("  ✓ Commence par majuscule")
        print("  ✓ 15+ caractères")
        print("  ✓ Pas de code/CSS/variables")
        print("  ✓ Texte naturel uniquement\n")
        
        self.load_mapping()
        self.clean_mapping_ultra_strict()
        clean_file = self.save_clean_mapping()
        self.save_rejection_report()
        self.show_all_kept_strings()
        
        print("\n" + "="*60)
        print("RÉSULTAT FINAL")
        print("="*60)
        print(f"""
✅ {len(self.clean_mapping)} phrases PURES gardées
✅ {len(self.rejected)} entrées techniques rejetées

Fichiers créés:
  1. {clean_file.name}
  2. rejected_strings_ULTRASTRICT.json

ÉTAPE SUIVANTE:
  1. Vérifiez la liste ci-dessus
  2. Si tout est OK → On génère les traductions
  3. Si manque des phrases → On ajuste les règles
""")

if __name__ == "__main__":
    cleaner = UltraStrictCleaner()
    cleaner.run()
