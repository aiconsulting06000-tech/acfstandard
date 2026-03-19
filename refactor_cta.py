#!/usr/bin/env python3
"""
Refactoring ULTRA-PRUDENT - UN SEUL fichier test
Modifie uniquement CTA.tsx avec backup automatique
"""

import re
import shutil
from pathlib import Path
from datetime import datetime

class SafeRefactorer:
    def __init__(self, repo_path: str = "."):
        self.repo_path = Path(repo_path)
        self.target_file = self.repo_path / "src" / "components" / "home" / "CTA.tsx"
        self.backup_file = None
        self.mapping = {
            "Get Started With ACF": r"components.src\components\home\cta.get_started_with_acf"
        }
    
    def create_backup(self):
        """Créer une backup avec timestamp"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.backup_file = self.target_file.parent / f"CTA.tsx.backup_{timestamp}"
        
        shutil.copy2(self.target_file, self.backup_file)
        print(f"✓ Backup créé: {self.backup_file.name}")
    
    def read_file(self):
        """Lire le fichier"""
        with open(self.target_file, 'r', encoding='utf-8') as f:
            return f.read()
    
    def add_use_translations_import(self, content: str) -> str:
        """Ajouter l'import useTranslations si nécessaire"""
        
        if "useTranslations" in content:
            print("  ℹ️  Import useTranslations déjà présent")
            return content
        
        # Trouver les imports React
        import_pattern = r"(import.*from ['\"]react['\"])"
        
        if re.search(import_pattern, content):
            # Ajouter après l'import React
            content = re.sub(
                import_pattern,
                r"\1\nimport { useTranslations } from 'next-intl'",
                content,
                count=1
            )
            print("  ✓ Import useTranslations ajouté")
        else:
            # Ajouter au début
            content = "import { useTranslations } from 'next-intl'\n" + content
            print("  ✓ Import useTranslations ajouté au début")
        
        return content
    
    def add_use_translations_hook(self, content: str) -> str:
        """Ajouter const t = useTranslations() dans le composant"""
        
        if re.search(r'const\s+\w+\s*=\s*useTranslations\(', content):
            print("  ℹ️  Hook useTranslations déjà présent")
            return content
        
        # Trouver la fonction du composant
        # Pattern: export default function ComponentName
        component_pattern = r'(export\s+default\s+function\s+\w+[^{]*\{)'
        
        match = re.search(component_pattern, content)
        if match:
            # Insérer const t = useTranslations() après l'ouverture de la fonction
            insert_pos = match.end()
            content = (
                content[:insert_pos] +
                "\n  const t = useTranslations()\n" +
                content[insert_pos:]
            )
            print("  ✓ Hook useTranslations ajouté dans le composant")
        else:
            print("  ⚠️  Pattern de composant non trouvé - ajout manuel nécessaire")
        
        return content
    
    def replace_hardcoded_strings(self, content: str) -> tuple[str, int]:
        """Remplacer les strings hardcodées"""
        
        replacements = 0
        
        for original, key in self.mapping.items():
            # Pattern pour le texte JSX : >Text<
            jsx_pattern = f'>{re.escape(original)}<'
            if re.search(jsx_pattern, content):
                # Utiliser concaténation au lieu de f-string pour éviter les problèmes de backslash
                replacement = '>{t("' + key + '")}<'
                content = re.sub(jsx_pattern, replacement, content)
                replacements += 1
                print(f"  ✓ Remplacé: '{original}' → t('{key}')")
        
        return content, replacements
    
    def refactor(self):
        """Effectuer le refactoring"""
        print("="*60)
        print("REFACTORING ULTRA-PRUDENT - CTA.tsx")
        print("="*60)
        print()
        
        # Vérifier que le fichier existe
        if not self.target_file.exists():
            print(f"❌ Fichier introuvable: {self.target_file}")
            return False
        
        print(f"📝 Fichier cible: {self.target_file}")
        print()
        
        # 1. Backup
        print("1️⃣ Création du backup...")
        self.create_backup()
        print()
        
        # 2. Lire
        print("2️⃣ Lecture du fichier...")
        content = self.read_file()
        original_content = content
        print(f"  ✓ {len(content)} caractères lus")
        print()
        
        # 3. Ajouter import
        print("3️⃣ Ajout de l'import useTranslations...")
        content = self.add_use_translations_import(content)
        print()
        
        # 4. Ajouter hook
        print("4️⃣ Ajout du hook useTranslations...")
        content = self.add_use_translations_hook(content)
        print()
        
        # 5. Remplacer strings
        print("5️⃣ Remplacement des strings hardcodées...")
        content, replacements = self.replace_hardcoded_strings(content)
        print(f"  Total: {replacements} remplacements")
        print()
        
        # 6. Sauvegarder
        if content != original_content:
            print("6️⃣ Sauvegarde des modifications...")
            with open(self.target_file, 'w', encoding='utf-8') as f:
                f.write(content)
            print("  ✓ Fichier sauvegardé")
            print()
            
            print("="*60)
            print("✅ REFACTORING TERMINÉ")
            print("="*60)
            print(f"""
Fichier modifié: {self.target_file}
Backup créé: {self.backup_file.name}
Remplacements: {replacements}

POUR TESTER:
1. Le serveur devrait recharger automatiquement
2. Allez sur http://localhost:3000/fr
3. Vérifiez le bouton CTA (devrait être en français)

POUR RESTAURER si problème:
  copy {self.backup_file.name} CTA.tsx
""")
            return True
        else:
            print("ℹ️  Aucune modification nécessaire")
            return False
    
    def run(self):
        """Point d'entrée"""
        try:
            success = self.refactor()
            return success
        except Exception as e:
            print(f"\n❌ ERREUR: {e}")
            print(f"\nPour restaurer: copy {self.backup_file.name if self.backup_file else 'CTA.tsx.backup_*'} CTA.tsx")
            return False

if __name__ == "__main__":
    print()
    print("⚠️  Ce script va modifier CTA.tsx (avec backup automatique)")
    print()
    
    response = input("Continuer? (oui/non): ")
    
    if response.lower() not in ['oui', 'yes', 'y', 'o']:
        print("Annulé.")
    else:
        refactorer = SafeRefactorer()
        refactorer.run()
