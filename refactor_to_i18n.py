#!/usr/bin/env python3
"""
Script de refactoring automatique : Hardcoded strings -> i18n
Convertit toutes les strings hardcodées en clés de traduction
"""

import os
import json
import re
from pathlib import Path
from typing import Dict, List, Tuple
import hashlib

class I18nRefactorer:
    def __init__(self, repo_path: str, extraction_file: str = "extraction_complete.json"):
        self.repo_path = Path(repo_path)
        self.extraction_file = self.repo_path / extraction_file
        self.extraction_data = {}
        self.string_to_key_map = {}
        self.key_counter = {}
        
    def load_extraction_data(self):
        """Charger les données d'extraction"""
        print("📂 Chargement de extraction_complete.json...")
        
        with open(self.extraction_file, 'r', encoding='utf-8') as f:
            self.extraction_data = json.load(f)
        
        print(f"✓ {self.extraction_data['stats']['total_hardcoded_strings']} strings à refactoriser")
        print(f"✓ {len(self.extraction_data['hardcoded_strings'])} fichiers concernés")
    
    def generate_key_from_string(self, string: str, context: str = "") -> str:
        """Générer une clé i18n intelligente depuis une string"""
        
        # Nettoyer la string
        clean = string.lower()
        clean = re.sub(r'[^\w\s]', '', clean)  # Enlever ponctuation
        clean = re.sub(r'\s+', '_', clean)  # Espaces -> underscores
        clean = clean[:50]  # Max 50 chars
        
        # Ajouter un contexte basé sur le fichier
        if context:
            # Extraire le nom du composant/page
            if 'components' in context:
                parts = context.split('/')
                component_name = parts[-1].replace('.tsx', '').lower()
                prefix = f"components.{component_name}"
            elif '[locale]' in context:
                parts = context.split('/')
                page_name = parts[-2] if len(parts) > 2 else 'home'
                page_name = page_name.replace('acf-', '')
                prefix = f"pages.{page_name}"
            else:
                prefix = "common"
        else:
            prefix = "common"
        
        # Créer la clé de base
        base_key = f"{prefix}.{clean}"
        
        # Si la clé existe déjà, ajouter un suffixe
        if base_key in self.string_to_key_map.values():
            counter = self.key_counter.get(base_key, 1)
            self.key_counter[base_key] = counter + 1
            base_key = f"{base_key}_{counter}"
        
        return base_key
    
    def build_string_to_key_mapping(self):
        """Construire le mapping string -> clé i18n"""
        print("\n🗺️  Génération du mapping strings -> clés i18n...")
        
        hardcoded = self.extraction_data.get('hardcoded_strings', {})
        
        for filepath, strings in hardcoded.items():
            for string in strings:
                if string not in self.string_to_key_map:
                    key = self.generate_key_from_string(string, filepath)
                    self.string_to_key_map[string] = key
        
        print(f"✓ {len(self.string_to_key_map)} clés uniques générées")
        
        # Sauvegarder le mapping
        mapping_file = self.repo_path / "string_to_key_mapping.json"
        with open(mapping_file, 'w', encoding='utf-8') as f:
            json.dump(self.string_to_key_map, f, indent=2, ensure_ascii=False)
        
        print(f"✓ Mapping sauvegardé dans: {mapping_file}")
    
    def generate_updated_translation_files(self):
        """Générer les nouveaux fichiers de traduction avec toutes les clés"""
        print("\n📝 Génération des fichiers de traduction mis à jour...")
        
        existing_translations = self.extraction_data.get('existing_translations', {})
        
        # Créer un dossier pour les nouveaux fichiers
        output_dir = self.repo_path / "messages_refactored"
        output_dir.mkdir(exist_ok=True)
        
        # Pour chaque langue
        for lang_code in existing_translations.keys():
            print(f"  Génération de {lang_code}.json...")
            
            # Charger les traductions existantes
            existing = existing_translations[lang_code]
            
            # Créer la nouvelle structure
            new_translations = self._create_nested_dict()
            
            # Ajouter les traductions existantes
            self._merge_translations(new_translations, existing)
            
            # Ajouter les nouvelles clés (en anglais pour le moment)
            for string, key in self.string_to_key_map.items():
                self._set_nested_value(new_translations, key, string)
            
            # Sauvegarder
            output_file = output_dir / f"{lang_code}.json"
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(new_translations, f, indent=2, ensure_ascii=False)
            
            print(f"    ✓ {output_file}")
        
        print(f"\n✓ Fichiers générés dans: {output_dir}")
        print(f"⚠️  ATTENTION: Les nouvelles clés contiennent le texte anglais")
        print(f"⚠️  Vous devrez les traduire ensuite!")
    
    def _create_nested_dict(self) -> dict:
        """Créer un dict pour structure imbriquée"""
        return {}
    
    def _merge_translations(self, target: dict, source: dict):
        """Fusionner les traductions existantes"""
        for key, value in source.items():
            if isinstance(value, dict):
                if key not in target:
                    target[key] = {}
                self._merge_translations(target[key], value)
            else:
                target[key] = value
    
    def _set_nested_value(self, d: dict, key_path: str, value: str):
        """Définir une valeur dans un dict imbriqué via un chemin de clé"""
        keys = key_path.split('.')
        current = d
        
        for key in keys[:-1]:
            if key not in current:
                current[key] = {}
            current = current[key]
        
        # Ne pas écraser si la clé existe déjà
        if keys[-1] not in current:
            current[keys[-1]] = value
    
    def generate_refactoring_script(self):
        """Générer un script qui remplace les strings dans les fichiers TSX"""
        print("\n🔧 Génération du script de remplacement...")
        
        script_content = '''#!/usr/bin/env python3
"""
Script de remplacement automatique des strings hardcodées
ATTENTION: Crée des backups avant modification!
"""

import os
import json
import re
from pathlib import Path
import shutil

def load_mapping():
    with open("string_to_key_mapping.json", 'r', encoding='utf-8') as f:
        return json.load(f)

def backup_file(filepath):
    """Créer une backup"""
    backup_path = str(filepath) + ".backup"
    shutil.copy2(filepath, backup_path)
    return backup_path

def replace_strings_in_file(filepath, mapping):
    """Remplacer les strings dans un fichier"""
    print(f"Processing: {filepath}")
    
    # Backup
    backup_path = backup_file(filepath)
    
    # Lire le fichier
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    replacements = 0
    
    # Vérifier si useTranslations est déjà importé
    has_use_translations = 'useTranslations' in content
    
    # Pour chaque string à remplacer
    for string, key in mapping.items():
        # Patterns de remplacement
        patterns = [
            (f'>{re.escape(string)}<', f'>{{t("{key}")}}<'),  # JSX content
            (f'"{re.escape(string)}"', f'{{t("{key}")}}'),    # Attributs avec "
            (f"'{re.escape(string)}'", f'{{t("{key}")}}'),    # Attributs avec '
        ]
        
        for pattern, replacement in patterns:
            if re.search(pattern, content):
                content = re.sub(pattern, replacement, content)
                replacements += 1
    
    # Ajouter l'import useTranslations si nécessaire
    if replacements > 0 and not has_use_translations:
        # Trouver la ligne d'import React
        import_pattern = r"(import.*from ['\"]react['\"];?)"
        if re.search(import_pattern, content):
            content = re.sub(
                import_pattern,
                r"\\1\\nimport { useTranslations } from 'next-intl';",
                content
            )
        else:
            # Ajouter au début du fichier
            content = "import { useTranslations } from 'next-intl';\\n" + content
        
        # Ajouter const t = useTranslations() dans le composant
        # (simplifié - nécessite ajustement manuel)
        
    # Sauvegarder seulement si des changements
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ {replacements} remplacements effectués")
    else:
        print(f"  - Aucun changement")
        os.remove(backup_path)  # Supprimer le backup inutile

def main():
    print("="*60)
    print("REMPLACEMENT AUTOMATIQUE DES STRINGS")
    print("="*60)
    print()
    print("⚠️  ATTENTION: Ce script va modifier vos fichiers!")
    print("⚠️  Des backups (.backup) seront créés")
    print()
    
    response = input("Continuer? (oui/non): ")
    if response.lower() not in ['oui', 'yes', 'y', 'o']:
        print("Annulé.")
        return
    
    # Charger le mapping
    mapping = load_mapping()
    print(f"\\n📂 Mapping chargé: {len(mapping)} strings")
    
    # Charger extraction_complete pour savoir quels fichiers modifier
    with open("extraction_complete.json", 'r', encoding='utf-8') as f:
        extraction = json.load(f)
    
    hardcoded_files = extraction.get('hardcoded_strings', {})
    
    print(f"📝 {len(hardcoded_files)} fichiers à traiter\\n")
    
    # Traiter chaque fichier
    for filepath in hardcoded_files.keys():
        full_path = Path(filepath)
        if full_path.exists():
            replace_strings_in_file(full_path, mapping)
    
    print("\\n✅ Refactoring terminé!")
    print("⚠️  VÉRIFIEZ vos fichiers avant de commit!")
    print("💡 Pour restaurer: renommez les .backup en .tsx")

if __name__ == "__main__":
    main()
'''
        
        script_file = self.repo_path / "apply_refactoring.py"
        with open(script_file, 'w', encoding='utf-8') as f:
            f.write(script_content)
        
        print(f"✓ Script généré: {script_file}")
        print(f"⚠️  Ce script modifiera vos fichiers TSX!")
    
    def run(self):
        """Exécuter le refactoring complet"""
        print("="*60)
        print("REFACTORING i18n - PRÉPARATION")
        print("="*60)
        print()
        
        # 1. Charger les données
        self.load_extraction_data()
        
        # 2. Générer le mapping
        self.build_string_to_key_mapping()
        
        # 3. Générer les nouveaux fichiers de traduction
        self.generate_updated_translation_files()
        
        # 4. Générer le script de remplacement
        self.generate_refactoring_script()
        
        print("\n" + "="*60)
        print("ÉTAPES SUIVANTES")
        print("="*60)
        print("""
1. ✅ string_to_key_mapping.json créé
   → Mapping de toutes les strings vers leurs clés i18n

2. ✅ messages_refactored/ créé
   → Nouveaux fichiers JSON avec toutes les clés
   → ⚠️  Les nouvelles clés sont en anglais, à traduire!

3. ✅ apply_refactoring.py créé
   → Script pour remplacer les strings dans vos fichiers TSX
   → ⚠️  ATTENTION: Modifie vos fichiers! Backups créés automatiquement

POUR APPLIQUER LE REFACTORING:
   python apply_refactoring.py

APRÈS REFACTORING:
   1. Vérifier que votre code compile
   2. Ajouter const t = useTranslations() dans vos composants
   3. Traduire les nouvelles clés dans messages_refactored/
   4. Remplacer messages/ par messages_refactored/
""")

if __name__ == "__main__":
    import sys
    
    repo_path = sys.argv[1] if len(sys.argv) > 1 else "."
    
    refactorer = I18nRefactorer(repo_path)
    refactorer.run()
