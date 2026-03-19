#!/usr/bin/env python3
"""
Refactoring FINAL - Script propre sans erreurs
Utilise les clés SIMPLES qui existent déjà dans fr.json
"""

import re
import shutil
from pathlib import Path
from datetime import datetime

class FinalRefactorer:
    def __init__(self, repo_path: str = "."):
        self.repo_path = Path(repo_path)
        self.target_file = self.repo_path / "src" / "components" / "home" / "CTA.tsx"
        self.backup_file = None
    
    def create_backup(self):
        """Créer backup"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.backup_file = self.target_file.parent / f"CTA.tsx.backup_{timestamp}"
        shutil.copy2(self.target_file, self.backup_file)
        print(f"✓ Backup: {self.backup_file.name}")
    
    def refactor_file(self):
        """Refactorer le fichier"""
        
        # Lire
        with open(self.target_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        
        # 1. Ajouter import si nécessaire
        if "useTranslations" not in content:
            # Trouver import React
            if "import React" in content or "import {" in content:
                content = re.sub(
                    r"(import.*from ['\"]react['\"])",
                    r"\1\nimport { useTranslations } from 'next-intl'",
                    content,
                    count=1
                )
            else:
                content = "import { useTranslations } from 'next-intl'\n" + content
            print("✓ Import ajouté")
        
        # 2. Ajouter hook si nécessaire
        if "useTranslations()" not in content:
            # Trouver le début du composant
            content = re.sub(
                r"(export\s+default\s+function\s+\w+[^{]*\{)",
                r"\1\n  const t = useTranslations()\n",
                content,
                count=1
            )
            print("✓ Hook ajouté")
        
        # 3. Remplacer les strings - MÉTHODE SIMPLE
        replacements = [
            (">Get Started With ACF<", ">{t('cta.secondary')}<"),
            # On peut en ajouter d'autres ici
        ]
        
        for old, new in replacements:
            if old in content:
                content = content.replace(old, new)
                print(f"✓ Remplacé: {old} → {new}")
        
        # Sauvegarder
        if content != original:
            with open(self.target_file, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    
    def run(self):
        """Exécuter"""
        print("="*60)
        print("REFACTORING FINAL - CTA.tsx")
        print("="*60)
        print()
        
        if not self.target_file.exists():
            print(f"❌ Fichier introuvable: {self.target_file}")
            return False
        
        print(f"Fichier: {self.target_file}\n")
        
        try:
            self.create_backup()
            
            if self.refactor_file():
                print()
                print("="*60)
                print("✅ SUCCÈS")
                print("="*60)
                print(f"""
Fichier modifié avec succès !
Backup: {self.backup_file.name}

TEST:
1. Le serveur va recharger automatiquement
2. Allez sur http://localhost:3000/fr
3. Le bouton devrait être en français

RESTAURER si problème:
  copy {self.backup_file.name} CTA.tsx
""")
                return True
            else:
                print("\nℹ️  Aucune modification nécessaire")
                return False
                
        except Exception as e:
            print(f"\n❌ ERREUR: {e}")
            if self.backup_file:
                print(f"Restaurer: copy {self.backup_file.name} CTA.tsx")
            return False

if __name__ == "__main__":
    print()
    response = input("Modifier CTA.tsx? (oui/non): ")
    
    if response.lower() in ['oui', 'yes', 'y', 'o']:
        refactorer = FinalRefactorer()
        refactorer.run()
    else:
        print("Annulé.")
