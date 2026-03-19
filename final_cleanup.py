#!/usr/bin/env python3
"""
Script de nettoyage final : retire les strings borderline
"""

import json
from pathlib import Path

def remove_borderline_strings():
    """Retirer les strings borderline du mapping ULTRACLEAN"""
    
    repo_path = Path(".")
    ultraclean_file = repo_path / "string_to_key_mapping_ULTRACLEAN.json"
    
    print("📂 Chargement du mapping ULTRACLEAN...")
    with open(ultraclean_file, 'r', encoding='utf-8') as f:
        mapping = json.load(f)
    
    original_count = len(mapping)
    print(f"✓ {original_count} strings chargées")
    
    # Liste des strings à retirer (borderline/techniques)
    strings_to_remove = [
        "Space Grotesk, sans-serif",  # Police CSS
        "Upload your video to enable playback",  # Message technique générique
        "Reset to Defaults",  # Trop court/générique
        "Submit Application →",  # Flèche unicode peut poser problème
        "Apply for Certification →",
        "Calculate My Score — Free →",
        "Calculate My Score →",
        "Calculer mon Score ACF® →",
        "Assess your governance →",
        "Discover ACF Control →",
        "Explore Partners →",
        "Find Practitioners →",
        "Get ACF TRUST™ Label →",
        "Get Certified →",
        "Get Your Score →",
        "Measure your Score →",
        "Join the Ecosystem →",
        "Partner Program →",
        "Read the Framework ↓",
        "Request Executive Program →",
        "Start the Diagnostic — Free →",
        "View All Articles →",
        "Apply to become Partner",  # Redondant avec version →
    ]
    
    # Retirer les strings
    removed = []
    for string in strings_to_remove:
        if string in mapping:
            del mapping[string]
            removed.append(string)
    
    # Nettoyer aussi les entités HTML &amp; en & (optionnel)
    # On peut les garder, elles seront converties automatiquement
    
    final_count = len(mapping)
    removed_count = len(removed)
    
    print(f"\n🧹 Nettoyage borderline...")
    print(f"✗ {removed_count} strings retirées:")
    for s in removed:
        print(f"   - {s}")
    
    print(f"\n✓ {final_count} strings FINALES ({original_count - final_count} retirées)")
    
    # Sauvegarder le mapping final
    final_file = repo_path / "string_to_key_mapping_FINAL.json"
    with open(final_file, 'w', encoding='utf-8') as f:
        json.dump(mapping, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Mapping FINAL sauvegardé: {final_file}")
    print(f"📊 Total: {final_count} phrases pures prêtes pour traduction")
    
    return final_count

if __name__ == "__main__":
    print("="*60)
    print("NETTOYAGE FINAL - Retrait des strings borderline")
    print("="*60)
    print()
    
    final_count = remove_borderline_strings()
    
    print("\n" + "="*60)
    print("TERMINÉ")
    print("="*60)
    print(f"""
✅ {final_count} phrases FINALES prêtes
✅ Fichier: string_to_key_mapping_FINAL.json

PROCHAINE ÉTAPE:
  → Générer les traductions pour 33 langues
""")
