#!/usr/bin/env python3
"""
Comprehensive blue → white replacement in App.jsx and index.css
Covers: bg-blue, border-blue, text-blue, shadow-blue, accent-blue, ring-blue
"""
import re

# ─── App.jsx ────────────────────────────────────────────────────────────────
APP = r"c:\Users\Personal\Desktop\projec\DIGITAL CLIMATE RESPONSES\src\App.jsx"

with open(APP, 'r', encoding='utf-8') as f:
    content = f.read()

# ------------------------------------------------------------------
# 1. Line-by-line replacements (preserving chart colors array)
# ------------------------------------------------------------------
lines = content.split('\n')
new_lines = []

for line in lines:
    # Skip chart data array — bg-blue-500 is a data value not a class
    if "'bg-blue-500'" in line and 'colors' in line:
        new_lines.append(line)
        continue

    orig = line

    # bg-blue-NNN and bg-blue-NNN/NN → white equivalents
    line = re.sub(r'bg-blue-(\d+)/(\d+)', lambda m: f"bg-white/{m.group(2)}", line)
    line = re.sub(r'bg-blue-\d+(?!\w)', 'bg-white/20', line)

    # border-blue (all variants: border-l-, border-t-, border-b-, border-r-, border-)
    line = re.sub(r'border-(?:l-|r-|t-|b-)?blue-\d+(?:/\d+)?', lambda m: re.sub(r'blue-\d+(?:/\d+)?', 'white/40', m.group(0)), line)

    # hover:border-blue → hover:border-white
    line = re.sub(r'hover:border-blue-\d+(?:/\d+)?', 'hover:border-white/60', line)

    # text-blue-NNN → text-white (for headings/labels/icons inside containers)
    line = re.sub(r'text-blue-\d+', 'text-white', line)

    # shadow-blue → shadow-white
    line = re.sub(r'shadow-blue-\d+(?:/\d+)?', 'shadow-white/10', line)

    # accent-blue → accent-white
    line = re.sub(r'accent-blue-\d+', 'accent-white', line)

    # ring-blue → ring-white
    line = re.sub(r'ring-blue-\d+(?:/\d+)?', 'ring-white/30', line)

    # from-blue / to-blue / via-blue gradient stops
    line = re.sub(r'from-blue-\d+(?:/\d+)?', 'from-white/20', line)
    line = re.sub(r'to-blue-\d+(?:/\d+)?', 'to-white/20', line)
    line = re.sub(r'via-blue-\d+(?:/\d+)?', 'via-white/10', line)

    if orig != line:
        print(f"  L{new_lines.__len__()+1}: changed")
    new_lines.append(line)

content = '\n'.join(new_lines)

with open(APP, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ App.jsx — all blue → white replacements done")

# ─── index.css ──────────────────────────────────────────────────────────────
CSS = r"c:\Users\Personal\Desktop\projec\DIGITAL CLIMATE RESPONSES\src\index.css"

with open(CSS, 'r', encoding='utf-8') as f:
    css = f.read()

# Replace CSS blue class selectors with white equivalents
css = css.replace('[class*="bg-blue-"]', '[class*="bg-white/"]')
css = css.replace('button[class*="bg-blue"]', 'button[class*="bg-white"]')

with open(CSS, 'w', encoding='utf-8') as f:
    f.write(css)

print("✅ index.css — blue selectors updated to white")
print("\n🎉 All blue containers are now white!")

