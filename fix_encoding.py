#!/usr/bin/env python3
"""
Script de correction d'encodage UTF-8
Corrige les problèmes d'encodage dans tous les fichiers JSON traduits
"""

import json
from pathlib import Path
import codecs

def fix_encoding(text):
    """Corriger les problèmes d'encodage courants"""
    
    # Mapping des caractères mal encodés
    fixes = {
        # Caractères accentués français
        '├®': 'é',
        '├á': 'à',
        '├¿': 'è',
        '├¬': 'ê',
        '├╣': 'ù',
        '├»': 'û',
        '├´': 'ô',
        '├«': 'ë',
        '├ó': 'ï',
        '├º': 'ú',
        'Ô£ò': '✓',
        'ÔÇö': '—',
        'ÔÇô': '–',
        'ÔÇ£': '"',
        'ÔÇ¥': '"',
        "ÔÇÖ": "'",
        'â"€': '—',
        'â€"': '—',
        'â€œ': '"',
        'â€': '"',
        "â€™": "'",
        
        # Caractères allemands
        '├ñ': 'ä',
        '├Â': 'ö',
        '├╝': 'ü',
        '├ƒ': 'ß',
        
        # Caractères espagnols
        '├▒': 'ñ',
        '┬í': 'í',
        '┬¡': '¡',
        '┬┐': '¿',
        
        # Symboles
        '┬«': '®',
        '┬⌐': '™',
        '&amp;': '&',
    }
    
    result = text
    for wrong, correct in fixes.items():
        result = result.replace(wrong, correct)
    
    return result

def fix_json_file(filepath):
    """Corriger un fichier JSON"""
    print(f"  Traitement: {filepath.name}...", end=" ")
    
    try:
        # Lire le fichier avec différents encodages
        content = None
        for encoding in ['utf-8', 'latin-1', 'cp1252', 'iso-8859-1']:
            try:
                with open(filepath, 'r', encoding=encoding) as f:
                    content = f.read()
                break
            except:
                continue
        
        if not content:
            print("❌ Impossible de lire")
            return False
        
        # Parser le JSON
        data = json.loads(content)
        
        # Corriger récursivement
        fixed_data = fix_dict_encoding(data)
        
        # Sauvegarder avec UTF-8 BOM pour Windows
        with open(filepath, 'w', encoding='utf-8-sig') as f:
            json.dump(fixed_data, f, indent=2, ensure_ascii=False)
        
        print("✓")
        return True
        
    except Exception as e:
        print(f"❌ Erreur: {e}")
        return False

def fix_dict_encoding(obj):
    """Corriger l'encodage récursivement dans un dict/list"""
    if isinstance(obj, dict):
        return {k: fix_dict_encoding(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [fix_dict_encoding(item) for item in obj]
    elif isinstance(obj, str):
        return fix_encoding(obj)
    else:
        return obj

def main():
    print("="*60)
    print("CORRECTION D'ENCODAGE UTF-8")
    print("="*60)
    print()
    
    repo_path = Path(".")
    messages_dir = repo_path / "messages_translated"
    
    if not messages_dir.exists():
        print(f"❌ Dossier {messages_dir} introuvable")
        return
    
    json_files = list(messages_dir.glob("*.json"))
    
    print(f"📂 Dossier: {messages_dir}")
    print(f"📝 {len(json_files)} fichiers JSON trouvés")
    print()
    
    input("Appuyez sur ENTRÉE pour corriger tous les fichiers...")
    print()
    
    success_count = 0
    for json_file in json_files:
        if fix_json_file(json_file):
            success_count += 1
    
    print()
    print("="*60)
    print("RÉSULTAT")
    print("="*60)
    print(f"✓ {success_count}/{len(json_files)} fichiers corrigés")
    print()
    
    if success_count == len(json_files):
        print("✅ Tous les fichiers ont été corrigés avec succès!")
        print()
        print("VÉRIFICATION:")
        print("  type messages_translated\\fr.json | more")
        print()
        print("ÉTAPE SUIVANTE:")
        print("  rename messages messages_OLD")
        print("  rename messages_translated messages")
    else:
        print("⚠️ Certains fichiers n'ont pas pu être corrigés")

if __name__ == "__main__":
    main()
