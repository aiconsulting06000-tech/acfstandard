#!/usr/bin/env python3
"""
Script de nettoyage intelligent du mapping
Filtre pour garder UNIQUEMENT les vraies strings traduisibles
"""

import json
import re
from pathlib import Path
from typing import Dict, Set

class MappingCleaner:
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
    
    def is_translatable(self, string: str) -> tuple[bool, str]:
        """
        Déterminer si une string est vraiment traduisible
        Retourne (bool, raison_rejet)
        """
        
        # Règle 1 : Trop court
        if len(string) < 3:
            return False, "Trop court"
        
        # Règle 2 : Imports/modules
        if re.match(r'^[a-z\-]+/[a-z\-]+$', string):  # ex: next/navigation
            return False, "Import/module"
        
        # Règle 3 : CSS - Couleurs
        if re.match(r'^#[0-9a-fA-F]{3,6}$', string):  # ex: #fff, #c9a84c
            return False, "Couleur CSS"
        
        # Règle 4 : CSS - rgba/rgb
        if re.match(r'^rgba?\(', string):
            return False, "Couleur RGBA"
        
        # Règle 5 : CSS - Gradient
        if 'linear-gradient' in string or 'radial-gradient' in string:
            return False, "Gradient CSS"
        
        # Règle 6 : CSS - Tailles/dimensions
        if re.match(r'^\d+(?:px|em|rem|vh|vw|%|fr|auto)$', string):
            return False, "Taille CSS"
        
        # Règle 7 : CSS - clamp/calc/var
        if re.match(r'^(clamp|calc|var)\(', string):
            return False, "Fonction CSS"
        
        # Règle 8 : CSS - repeat
        if re.match(r'^repeat\(', string):
            return False, "Repeat CSS"
        
        # Règle 9 : CSS - Border/shadow
        if re.match(r'^\d+px solid', string):
            return False, "Border CSS"
        
        # Règle 10 : Routes/URLs
        if string.startswith('/') and not ' ' in string:
            return False, "Route/URL"
        
        if string.startswith('http://') or string.startswith('https://'):
            return False, "URL"
        
        # Règle 11 : Variables template
        if string.startswith('${') or '${' in string:
            return False, "Template variable"
        
        # Règle 12 : Clés i18n existantes (contiennent des points sans espaces)
        if '.' in string and not ' ' in string and len(string.split('.')) >= 2:
            return False, "Clé i18n existante"
        
        # Règle 13 : Noms de fichiers
        if re.match(r'^[\w\-]+\.(tsx?|jsx?|json|css|svg|png|jpg)$', string):
            return False, "Nom de fichier"
        
        # Règle 14 : Classes CSS (kebab-case sans espaces)
        if re.match(r'^[a-z]+(-[a-z]+)+$', string) and len(string) < 30:
            return False, "Classe CSS"
        
        # Règle 15 : Props React communes
        react_props = [
            'className', 'onClick', 'onChange', 'onSubmit', 'href', 
            'src', 'alt', 'style', 'dangerouslySetInnerHTML',
            'children', 'key', 'ref', 'id'
        ]
        if string in react_props:
            return False, "Prop React"
        
        # Règle 16 : Seulement des nombres/symboles
        if not re.search(r'[a-zA-Z]{2,}', string):
            return False, "Pas de mots"
        
        # Règle 17 : Police de caractères
        if 'sans-serif' in string or 'serif' in string or 'monospace' in string:
            return False, "Font CSS"
        
        # Règle 18 : Valeurs CSS pures
        if string in ['auto', 'none', 'block', 'inline', 'flex', 'grid', 'absolute', 'relative', 'fixed']:
            return False, "Valeur CSS"
        
        # Règle 19 : Caractères spéciaux bizarres (encodage)
        if 'ÔÇö' in string or 'Ô' in string or '├' in string:
            # Ces caractères viennent souvent d'encodage incorrect
            # On pourrait les nettoyer, mais prudent de les rejeter
            return False, "Encodage suspect"
        
        # Règle 20 : Doit contenir au moins un mot de 3+ lettres
        words = re.findall(r'\b[a-zA-Z]{3,}\b', string)
        if len(words) == 0:
            return False, "Aucun mot significatif"
        
        # Si on arrive ici, c'est probablement traduisible
        return True, ""
    
    def clean_mapping_data(self):
        """Nettoyer le mapping"""
        print("\n🧹 Nettoyage du mapping...")
        
        for string, key in self.original_mapping.items():
            is_valid, reason = self.is_translatable(string)
            
            if is_valid:
                self.clean_mapping[string] = key
            else:
                self.rejected[string] = reason
        
        print(f"✓ {len(self.clean_mapping)} strings VALIDES gardées")
        print(f"✗ {len(self.rejected)} strings REJETÉES")
    
    def save_clean_mapping(self):
        """Sauvegarder le mapping nettoyé"""
        clean_file = self.repo_path / "string_to_key_mapping_CLEAN.json"
        
        with open(clean_file, 'w', encoding='utf-8') as f:
            json.dump(self.clean_mapping, f, indent=2, ensure_ascii=False)
        
        print(f"\n✓ Mapping propre sauvegardé: {clean_file}")
    
    def save_rejection_report(self):
        """Sauvegarder un rapport des rejets"""
        report_file = self.repo_path / "rejected_strings_report.json"
        
        # Grouper par raison
        by_reason = {}
        for string, reason in self.rejected.items():
            if reason not in by_reason:
                by_reason[reason] = []
            by_reason[reason].append(string)
        
        report = {
            "total_rejected": len(self.rejected),
            "by_reason": {
                reason: {
                    "count": len(strings),
                    "examples": strings[:10]  # Max 10 exemples par raison
                }
                for reason, strings in by_reason.items()
            }
        }
        
        with open(report_file, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        
        print(f"✓ Rapport de rejet sauvegardé: {report_file}")
    
    def print_summary(self):
        """Afficher un résumé"""
        print("\n" + "="*60)
        print("RÉSUMÉ DU NETTOYAGE")
        print("="*60)
        print(f"Entrées originales: {len(self.original_mapping)}")
        print(f"Strings VALIDES: {len(self.clean_mapping)}")
        print(f"Strings REJETÉES: {len(self.rejected)}")
        print(f"Taux de conservation: {len(self.clean_mapping)/len(self.original_mapping)*100:.1f}%")
        print("="*60)
        
        # Top raisons de rejet
        by_reason = {}
        for string, reason in self.rejected.items():
            by_reason[reason] = by_reason.get(reason, 0) + 1
        
        print("\nTop raisons de rejet:")
        sorted_reasons = sorted(by_reason.items(), key=lambda x: x[1], reverse=True)
        for reason, count in sorted_reasons[:10]:
            print(f"  - {reason}: {count}")
        
        # Exemples de strings gardées
        print("\nExemples de strings GARDÉES (10 premières):")
        for i, string in enumerate(list(self.clean_mapping.keys())[:10], 1):
            print(f"  {i}. {string[:80]}{'...' if len(string) > 80 else ''}")
    
    def show_sample_validation(self):
        """Afficher des échantillons pour validation manuelle"""
        print("\n" + "="*60)
        print("VALIDATION MANUELLE RECOMMANDÉE")
        print("="*60)
        print("\nVoici 20 strings GARDÉES aléatoires.")
        print("Vérifiez qu'elles sont bien traduisibles:\n")
        
        import random
        sample = random.sample(list(self.clean_mapping.keys()), 
                             min(20, len(self.clean_mapping)))
        
        for i, string in enumerate(sample, 1):
            print(f"{i:2}. {string}")
        
        print("\n" + "="*60)
    
    def run(self):
        """Exécuter le nettoyage"""
        print("="*60)
        print("NETTOYAGE INTELLIGENT DU MAPPING")
        print("="*60)
        
        self.load_mapping()
        self.clean_mapping_data()
        self.save_clean_mapping()
        self.save_rejection_report()
        self.print_summary()
        self.show_sample_validation()
        
        print("\n" + "="*60)
        print("ÉTAPES SUIVANTES")
        print("="*60)
        print("""
1. ✅ Vérifiez string_to_key_mapping_CLEAN.json
   → Ouvrez-le et parcourez quelques entrées
   → Vérifiez que ce sont bien des phrases/textes

2. ✅ Consultez rejected_strings_report.json
   → Vérifiez que les rejets sont justifiés
   → Si des bonnes strings ont été rejetées, on ajustera

3. ⏭️  Ensuite on pourra:
   - Régénérer les fichiers de traduction propres
   - Créer un script de remplacement prudent
   - Ou refactoriser manuellement fichier par fichier
""")

if __name__ == "__main__":
    cleaner = MappingCleaner()
    cleaner.run()
