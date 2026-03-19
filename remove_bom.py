#!/usr/bin/env python3
"""
Script pour retirer le BOM (Byte Order Mark) de tous les fichiers JSON
"""

import json
from pathlib import Path

def remove_bom_from_file(filepath):
    """Retirer le BOM d'un fichier JSON"""
    print(f"  {filepath.name}...", end=" ")
    
    try:
        # Lire avec utf-8-sig (qui enlève le BOM automatiquement)
        with open(filepath, 'r', encoding='utf-8-sig') as f:
            data = json.load(f)
        
        # Réécrire avec utf-8 pur (sans BOM)
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print("✓")
        return True
        
    except Exception as e:
        print(f"❌ {e}")
        return False

def main():
    print("="*60)
    print("RETRAIT DU BOM DES FICHIERS JSON")
    print("="*60)
    print()
    
    repo_path = Path(".")
    messages_dir = repo_path / "messages"
    
    if not messages_dir.exists():
        print(f"❌ Dossier {messages_dir} introuvable")
        return
    
    json_files = list(messages_dir.glob("*.json"))
    
    print(f"📂 Dossier: {messages_dir}")
    print(f"📝 {len(json_files)} fichiers JSON trouvés")
    print()
    
    success_count = 0
    for json_file in json_files:
        if remove_bom_from_file(json_file):
            success_count += 1
    
    print()
    print("="*60)
    print("TERMINÉ")
    print("="*60)
    print(f"✓ {success_count}/{len(json_files)} fichiers corrigés")
    print()
    
    if success_count == len(json_files):
        print("✅ Tous les BOM retirés avec succès!")
        print()
        print("RELANCEZ:")
        print("  npm run dev")
    else:
        print("⚠️ Certains fichiers n'ont pas pu être corrigés")

if __name__ == "__main__":
    main()
