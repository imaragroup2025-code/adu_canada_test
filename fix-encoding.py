#!/usr/bin/env python3
"""
Fix encoding issues in HTML files
Converts mangled UTF-8 characters back to proper symbols
"""

import os
import glob

# Encoding replacements
REPLACEMENTS = {
    'â€"': '—',  # em dash
    'â€"': '–',  # en dash
    "â€™": "'",  # apostrophe
    'â€œ': '"',  # left double quote
    'â€': '"',  # right double quote
    'Â©': '©',   # copyright
    'â€¢': '•',  # bullet
    'Ã©': 'é',   # e accent
    'Ã¨': 'è',   # e grave
    'Ã ': 'à',   # a grave
}

def fix_file(filepath):
    """Fix encoding issues in a single file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Apply all replacements
        original = content
        for bad, good in REPLACEMENTS.items():
            content = content.replace(bad, good)
        
        # Only write if changes were made
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ Fixed: {filepath}")
            return True
        else:
            print(f"○ No changes needed: {filepath}")
            return False
    except Exception as e:
        print(f"✗ Error fixing {filepath}: {e}")
        return False

def main():
    """Fix all HTML files in current directory"""
    html_files = glob.glob('*.html')
    
    if not html_files:
        print("No HTML files found in current directory")
        return
    
    print(f"Found {len(html_files)} HTML file(s)")
    print("Fixing encoding issues...\n")
    
    fixed_count = 0
    for filepath in html_files:
        if fix_file(filepath):
            fixed_count += 1
    
    print(f"\n✓ Complete! Fixed {fixed_count} file(s)")

if __name__ == '__main__':
    main()
