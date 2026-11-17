#!/usr/bin/env python3
"""
Remove ALL blue-tinted backgrounds from the Farmer page sections.
Replace:
  - bg-slate-900 / bg-slate-800 (dark containers) → bg-white or bg-slate-50
  - glass-panel (dark glass) on farmer sections → white card equivalent
  - bg-gradient-to-br from-slate-900 to-slate-800 → white gradient
  - border-slate-800 → border-slate-200
  - bg-slate-900/50 / bg-slate-900/60 / bg-slate-900/80 → bg-white or bg-slate-50
  - bg-slate-800/40 / bg-slate-800/80 → bg-slate-100
  Only within the Farmer page area (lines 1290–2720 approx)
"""
import re

path = r"c:\Users\Personal\Desktop\projec\DIGITAL CLIMATE RESPONSES\src\App.jsx"
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find farmer page boundaries
farmer_start = None
farmer_end = None
for i, line in enumerate(lines):
    if "activeRole === 'Farmer') &&" in line and farmer_start is None:
        farmer_start = i
    # Farmer section ends when we hit Seller/NGO/Ministry/Resource section
    if farmer_start and i > farmer_start + 50:
        if ("activeRole === 'Resource')" in line or 
            "activeRole === 'Seller')" in line or
            "activeRole === 'Ministry'" in line and "activeRole === 'NGO'" in line):
            farmer_end = i
            break

if not farmer_end:
    # fallback: use line numbers from known structure
    farmer_start = 1289   # {(activeRole === 'Farmer') &&
    farmer_end = 2720     # end of farmer section

print(f"Farmer section: lines {farmer_start}–{farmer_end}")

def fix_line(line):
    orig = line

    # Dark gradient backgrounds → white gradient
    line = line.replace(
        'bg-gradient-to-br from-slate-900 to-slate-800',
        'bg-gradient-to-br from-white to-slate-50'
    )

    # IoT/Weather section specific dark bg
    line = line.replace(
        'border-l-4 border-l-amber-500 bg-gradient-to-br from-slate-900 to-slate-800',
        'border-l-4 border-l-amber-500 bg-white'
    )

    # Semi-transparent dark containers → white/light
    line = line.replace('bg-slate-900/80', 'bg-white/90')
    line = line.replace('bg-slate-900/60', 'bg-white/80')
    line = line.replace('bg-slate-900/50', 'bg-slate-50')
    line = line.replace('bg-slate-900/40', 'bg-slate-50')
    line = line.replace('bg-slate-800/80', 'bg-slate-100')
    line = line.replace('bg-slate-800/60', 'bg-slate-100')
    line = line.replace('bg-slate-800/50', 'bg-slate-100')
    line = line.replace('bg-slate-800/40', 'bg-slate-100')

    # Solid dark containers → white/light (but only inside containers, not buttons/nav)
    # Only replace when it's a panel/card background, not a button
    if 'rounded' in line and ('p-4' in line or 'p-5' in line or 'p-6' in line or 'p-8' in line):
        line = line.replace(' bg-slate-900 ', ' bg-white ')
        line = line.replace(' bg-slate-800 ', ' bg-slate-100 ')

    # Dark borders → light borders on containers
    if 'rounded' in line:
        line = line.replace('border border-slate-800', 'border border-slate-200')
        line = line.replace('border-slate-800 ', 'border-slate-200 ')
        line = line.replace('border border-slate-700', 'border border-slate-200')
        line = line.replace('border-slate-700/50', 'border-slate-200')
        line = line.replace('border-slate-700/40', 'border-slate-200')

    # border-dashed dark → light
    line = line.replace('border-dashed border-slate-700', 'border-dashed border-slate-300')

    # Input field dark backgrounds → light
    if 'input' in line.lower() or 'select' in line.lower() or 'textarea' in line.lower() or 'type=' in line:
        line = line.replace('bg-slate-900/60', 'bg-white')
        line = line.replace('bg-slate-900/80', 'bg-white')
        line = line.replace('border-slate-700/50', 'border-slate-300')
        line = line.replace('border-slate-700', 'border-slate-300')
        line = line.replace('text-slate-400 placeholder:text-slate-600', 'text-slate-800 placeholder:text-slate-400')

    # Text colors: very dark text on newly light panels
    if 'bg-white' in line or 'bg-slate-50' in line or 'bg-slate-100' in line:
        line = line.replace('text-slate-300', 'text-slate-700')
        line = line.replace('text-slate-400', 'text-slate-600')

    return line

# Apply fixes only within farmer section
new_lines = []
for i, line in enumerate(lines):
    if farmer_start <= i <= farmer_end:
        new_lines.append(fix_line(line))
    else:
        new_lines.append(line)

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("✅ Blue/dark backgrounds removed from Farmer page!")
print(f"   Modified lines {farmer_start}–{farmer_end}")
