#!/usr/bin/env python3
"""
Script de DIAGNOSTIC uniquement - NE MODIFIE RIEN
Analyse les fichiers TSX pour voir s'ils utilisent i18n
"""

import re
from pathlib import Path
from typing import Dict, List, Tuple

class I18nDiagnostic:
    def __init__(self, repo_path: str = "."):
        self.repo_path = Path(repo_path)
        self.results = {
            "uses_i18n": [],
            "no_i18n": [],
            "mixed": [],
            "stats": {}
        }
    
    def analyze_tsx_file(self, filepath: Path) -> Dict:
        """Analyser un fichier TSX"""
        
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
        except:
            return None
        
        # Vérifications
        has_import = "useTranslations" in content or "next-intl" in content
        has_usage = re.search(r'const\s+\w+\s*=\s*useTranslations\(', content) is not None
        has_t_function = re.search(r'\{t\(["\']', content) is not None
        
        # Compter les strings potentiellement hardcodées
        # Chercher du texte entre > et < (JSX content)
        jsx_texts = re.findall(r'>([^<>{}]+)<', content)
        # Filtrer les strings significatives (plus de 10 chars, contient des lettres)
        hardcoded = [
            t.strip() for t in jsx_texts 
            if len(t.strip()) > 10 and re.search(r'[a-zA-Z]{5,}', t)
        ]
        
        return {
            "path": str(filepath.relative_to(self.repo_path)),
            "has_import": has_import,
            "has_usage": has_usage,
            "has_t_function": has_t_function,
            "hardcoded_count": len(hardcoded),
            "hardcoded_examples": hardcoded[:3]  # Max 3 exemples
        }
    
    def scan_all_tsx(self):
        """Scanner tous les fichiers TSX"""
        print("🔍 Scan des fichiers TSX...\n")
        
        tsx_files = list(self.repo_path.glob("**/*.tsx"))
        tsx_files = [f for f in tsx_files if '.next' not in str(f) and 'node_modules' not in str(f)]
        
        print(f"📝 {len(tsx_files)} fichiers TSX trouvés\n")
        
        for tsx_file in tsx_files:
            analysis = self.analyze_tsx_file(tsx_file)
            
            if not analysis:
                continue
            
            # Catégoriser
            if analysis["has_import"] and analysis["has_usage"] and analysis["has_t_function"]:
                self.results["uses_i18n"].append(analysis)
                status = "✅ Utilise i18n"
            elif not analysis["has_import"] and analysis["hardcoded_count"] > 0:
                self.results["no_i18n"].append(analysis)
                status = "❌ Pas d'i18n"
            else:
                self.results["mixed"].append(analysis)
                status = "⚠️  Mixte"
            
            print(f"{status:15} | {analysis['path']}")
            if analysis["hardcoded_count"] > 0:
                print(f"                  └─ {analysis['hardcoded_count']} strings hardcodées")
    
    def generate_report(self):
        """Générer un rapport détaillé"""
        total = len(self.results["uses_i18n"]) + len(self.results["no_i18n"]) + len(self.results["mixed"])
        
        self.results["stats"] = {
            "total_files": total,
            "uses_i18n": len(self.results["uses_i18n"]),
            "no_i18n": len(self.results["no_i18n"]),
            "mixed": len(self.results["mixed"]),
            "i18n_percentage": (len(self.results["uses_i18n"]) / total * 100) if total > 0 else 0
        }
    
    def print_summary(self):
        """Afficher le résumé"""
        stats = self.results["stats"]
        
        print("\n" + "="*60)
        print("RÉSUMÉ DU DIAGNOSTIC")
        print("="*60)
        print(f"\nTotal de fichiers analysés: {stats['total_files']}")
        print(f"\n✅ Utilisent i18n correctement: {stats['uses_i18n']}")
        print(f"❌ N'utilisent PAS i18n: {stats['no_i18n']}")
        print(f"⚠️  Statut mixte/incertain: {stats['mixed']}")
        print(f"\nCouverture i18n: {stats['i18n_percentage']:.1f}%")
        
        print("\n" + "="*60)
        print("FICHIERS À REFACTORISER")
        print("="*60)
        
        if self.results["no_i18n"]:
            print(f"\n{len(self.results['no_i18n'])} fichiers sans i18n :\n")
            for analysis in self.results["no_i18n"][:10]:  # Top 10
                print(f"  • {analysis['path']}")
                print(f"    → {analysis['hardcoded_count']} strings hardcodées")
                if analysis['hardcoded_examples']:
                    print(f"    Exemples: {analysis['hardcoded_examples'][0][:50]}...")
        else:
            print("\n🎉 Aucun fichier sans i18n trouvé!")
        
        print("\n" + "="*60)
        print("CONCLUSION")
        print("="*60)
        
        if stats['i18n_percentage'] >= 80:
            print("\n✅ BONNE NOUVELLE: Le site utilise déjà i18n!")
            print("   Le problème est probablement ailleurs (routing, middleware, etc.)")
        elif stats['no_i18n'] > 0:
            print(f"\n⚠️  {stats['no_i18n']} fichiers nécessitent un refactoring")
            print("   Mais on va procéder TRÈS prudemment, fichier par fichier.")
        else:
            print("\n🤔 Statut incertain - inspection manuelle recommandée")
    
    def run(self):
        """Exécuter le diagnostic"""
        print("="*60)
        print("DIAGNOSTIC i18n - LECTURE SEULE")
        print("="*60)
        print("\nCe script NE MODIFIE RIEN, il analyse seulement.\n")
        
        self.scan_all_tsx()
        self.generate_report()
        self.print_summary()
        
        print("\n" + "="*60)
        print("Diagnostic terminé - Aucun fichier n'a été modifié")
        print("="*60)

if __name__ == "__main__":
    diagnostic = I18nDiagnostic()
    diagnostic.run()
