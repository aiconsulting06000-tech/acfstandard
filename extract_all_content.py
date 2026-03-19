#!/usr/bin/env python3
"""
Script d'extraction complète de contenu à traduire
Scanne : fichiers JSON i18n, strings hardcodées dans TSX, HTML
"""

import os
import json
import re
from pathlib import Path
from typing import Dict, List, Set

class ContentExtractor:
    def __init__(self, repo_path: str):
        self.repo_path = Path(repo_path)
        self.results = {
            "existing_translations": {},
            "hardcoded_strings": {},
            "html_content": {},
            "stats": {}
        }
        
    def extract_json_translations(self):
        """Extraire les traductions JSON existantes"""
        messages_dir = self.repo_path / "messages"
        if not messages_dir.exists():
            return
            
        for json_file in messages_dir.glob("*.json"):
            lang = json_file.stem
            try:
                with open(json_file, 'r', encoding='utf-8') as f:
                    content = json.load(f)
                    self.results["existing_translations"][lang] = content
                    print(f"✓ Chargé {lang}.json ({len(json.dumps(content))} chars)")
            except Exception as e:
                print(f"✗ Erreur lecture {json_file}: {e}")
    
    def extract_tsx_hardcoded_strings(self):
        """Extraire les strings hardcodées dans les fichiers TSX"""
        
        # Patterns pour détecter les strings
        patterns = [
            # JSX text content: <tag>Text here</tag>
            r'>([^<>{}\n]+?)</',
            # String literals: "text" ou 'text'
            r'["\']([^"\']+)["\']',
            # Template literals: `text`
            r'`([^`]+)`',
            # Placeholder attributes
            r'placeholder=["\'`]([^"\'`]+)["\'`]',
            # Alt attributes
            r'alt=["\'`]([^"\'`]+)["\'`]',
            # Title attributes
            r'title=["\'`]([^"\'`]+)["\'`]',
            # aria-label
            r'aria-label=["\'`]([^"\'`]+)["\'`]',
        ]
        
        # Extensions à scanner
        tsx_files = list(self.repo_path.glob("**/*.tsx")) + \
                   list(self.repo_path.glob("**/*.ts"))
        
        # Filtrer node_modules et .next
        tsx_files = [f for f in tsx_files if 'node_modules' not in str(f) and '.next' not in str(f)]
        
        for tsx_file in tsx_files:
            relative_path = str(tsx_file.relative_to(self.repo_path))
            
            try:
                with open(tsx_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                strings_found = set()
                
                for pattern in patterns:
                    matches = re.findall(pattern, content, re.MULTILINE)
                    for match in matches:
                        # Nettoyer et filtrer
                        cleaned = match.strip()
                        if self._is_translatable_string(cleaned):
                            strings_found.add(cleaned)
                
                if strings_found:
                    self.results["hardcoded_strings"][relative_path] = sorted(list(strings_found))
                    print(f"✓ {relative_path}: {len(strings_found)} strings trouvées")
                    
            except Exception as e:
                print(f"✗ Erreur lecture {tsx_file}: {e}")
    
    def _is_translatable_string(self, s: str) -> bool:
        """Filtrer les strings non-traduisibles"""
        if len(s) < 2:
            return False
        
        # Ignorer les strings techniques
        ignore_patterns = [
            r'^[a-z_]+$',  # Variables (lowercase_underscore)
            r'^\d+$',  # Nombres purs
            r'^[A-Z_]+$',  # Constantes (UPPERCASE)
            r'^\w+\(\)$',  # Fonctions
            r'^[\w\-\.]+\.(tsx?|jsx?|css|json)$',  # Fichiers
            r'^https?://',  # URLs
            r'^/[a-z\-/]*$',  # Paths
            r'^\{.*\}$',  # JSX expressions
            r'^className$|^onClick$|^onChange$',  # Props React
            r'^\w+:\w+',  # CSS-like
        ]
        
        for pattern in ignore_patterns:
            if re.match(pattern, s):
                return False
        
        # Garder seulement si contient des mots (lettres)
        if not re.search(r'[a-zA-Z]{3,}', s):
            return False
            
        return True
    
    def extract_html_content(self):
        """Extraire le contenu des fichiers HTML"""
        html_files = list(self.repo_path.glob("*.html"))
        
        for html_file in html_files:
            relative_path = str(html_file.relative_to(self.repo_path))
            
            try:
                with open(html_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                # Extraire le texte visible (simplifié)
                # Retire les balises mais garde le contenu
                text_content = re.sub(r'<script[^>]*>.*?</script>', '', content, flags=re.DOTALL)
                text_content = re.sub(r'<style[^>]*>.*?</style>', '', text_content, flags=re.DOTALL)
                
                # Extraire les textes entre balises
                texts = re.findall(r'>([^<>{}\n]+?)<', text_content)
                texts = [t.strip() for t in texts if t.strip() and len(t.strip()) > 2]
                
                if texts:
                    self.results["html_content"][relative_path] = texts
                    print(f"✓ {relative_path}: {len(texts)} textes trouvés")
                    
            except Exception as e:
                print(f"✗ Erreur lecture {html_file}: {e}")
    
    def generate_stats(self):
        """Générer les statistiques"""
        stats = {
            "existing_languages": len(self.results["existing_translations"]),
            "tsx_files_with_hardcoded": len(self.results["hardcoded_strings"]),
            "total_hardcoded_strings": sum(len(v) for v in self.results["hardcoded_strings"].values()),
            "html_files": len(self.results["html_content"]),
            "total_html_texts": sum(len(v) for v in self.results["html_content"].values())
        }
        
        self.results["stats"] = stats
        return stats
    
    def save_results(self, output_file: str = "extraction_complete.json"):
        """Sauvegarder tous les résultats"""
        output_path = self.repo_path / output_file
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(self.results, f, indent=2, ensure_ascii=False)
        
        print(f"\n✓ Résultats sauvegardés dans: {output_path}")
        return output_path
    
    def print_summary(self):
        """Afficher un résumé"""
        stats = self.results["stats"]
        
        print("\n" + "="*60)
        print("RÉSUMÉ DE L'EXTRACTION")
        print("="*60)
        print(f"Langues déjà traduites: {stats['existing_languages']}")
        print(f"Fichiers TSX avec strings hardcodées: {stats['tsx_files_with_hardcoded']}")
        print(f"Total strings hardcodées: {stats['total_hardcoded_strings']}")
        print(f"Fichiers HTML: {stats['html_files']}")
        print(f"Total textes HTML: {stats['total_html_texts']}")
        print("="*60)
        
        # Top 5 fichiers avec le plus de strings
        if self.results["hardcoded_strings"]:
            print("\nTop 5 fichiers avec le plus de strings hardcodées:")
            sorted_files = sorted(
                self.results["hardcoded_strings"].items(),
                key=lambda x: len(x[1]),
                reverse=True
            )[:5]
            for file, strings in sorted_files:
                print(f"  - {file}: {len(strings)} strings")
    
    def run(self):
        """Exécuter l'extraction complète"""
        print("Démarrage de l'extraction...\n")
        
        print("1. Extraction des traductions JSON existantes...")
        self.extract_json_translations()
        
        print("\n2. Extraction des strings hardcodées dans TSX...")
        self.extract_tsx_hardcoded_strings()
        
        print("\n3. Extraction du contenu HTML...")
        self.extract_html_content()
        
        print("\n4. Génération des statistiques...")
        self.generate_stats()
        
        print("\n5. Sauvegarde des résultats...")
        output_path = self.save_results()
        
        self.print_summary()
        
        return output_path


if __name__ == "__main__":
    import sys
    
    # Chemin du repo (passé en argument ou utilise le répertoire courant)
    repo_path = sys.argv[1] if len(sys.argv) > 1 else "."
    
    extractor = ContentExtractor(repo_path)
    output_file = extractor.run()
    
    print(f"\n✅ Extraction terminée!")
    print(f"📄 Fichier de résultats: {output_file}")
