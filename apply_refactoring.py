#!/usr/bin/env python3
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
        import_pattern = r"(import.*from ['"]react['"];?)"
        if re.search(import_pattern, content):
            content = re.sub(
                import_pattern,
                r"\1\nimport { useTranslations } from 'next-intl';",
                content
            )
        else:
            # Ajouter au début du fichier
            content = "import { useTranslations } from 'next-intl';\n" + content
        
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
    print(f"\n📂 Mapping chargé: {len(mapping)} strings")
    
    # Charger extraction_complete pour savoir quels fichiers modifier
    with open("extraction_complete.json", 'r', encoding='utf-8') as f:
        extraction = json.load(f)
    
    hardcoded_files = extraction.get('hardcoded_strings', {})
    
    print(f"📝 {len(hardcoded_files)} fichiers à traiter\n")
    
    # Traiter chaque fichier
    for filepath in hardcoded_files.keys():
        full_path = Path(filepath)
        if full_path.exists():
            replace_strings_in_file(full_path, mapping)
    
    print("\n✅ Refactoring terminé!")
    print("⚠️  VÉRIFIEZ vos fichiers avant de commit!")
    print("💡 Pour restaurer: renommez les .backup en .tsx")

if __name__ == "__main__":
    main()
