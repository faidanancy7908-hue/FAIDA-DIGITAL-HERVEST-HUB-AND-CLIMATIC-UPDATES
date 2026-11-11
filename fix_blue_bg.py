#!/usr/bin/env python3
"""Replace ALL blue background references with white/neutral in App.jsx"""

import re

APP = r"c:\Users\Personal\Desktop\projec\DIGITAL CLIMATE RESPONSES\src\App.jsx"

with open(APP, 'r', encoding='utf-8') as f:
    content = f.read()

original = content

# ── Specific targeted replacements ──────────────────────────────────────────

replacements = [
    # Network status panel bg
    (
        'glass-panel p-5 border-t-2 border-t-blue-500 bg-blue-500/5',
        'glass-panel p-5 border-t-2 border-t-white/30 bg-white/5'
    ),
    # Active region row in analytics
    (
        "bg-blue-900/20 border-l-2 border-blue-500",
        "bg-white/10 border-l-2 border-white/40"
    ),
    # Status badge bg-blue-500/20 text-blue-400
    (
        "'bg-blue-500/20 text-blue-400'}`}",
        "'bg-white/20 text-white'}`}"
    ),
    # District/region hover button bg-blue-900/40
    (
        'bg-slate-800 hover:bg-blue-900/40 hover:text-blue-300',
        'bg-slate-800 hover:bg-white/10 hover:text-white'
    ),
    # FANCY AI chat bubble user bg — keep emerald, change AI action button
    (
        'bg-blue-600/80 hover:bg-blue-500',
        'bg-white/20 hover:bg-white/30'
    ),
    # FANCY AI download/action button  
    (
        'className="mt-4 flex items-center justify-center gap-2 w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30',
        'className="mt-4 flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white border border-white/30'
    ),
    # FANCY AI send button
    (
        'className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl',
        'className="absolute right-2 p-2 bg-white/20 hover:bg-white/30 text-white rounded-xl border border-white/30'
    ),
    # border-t-blue-500 standalone
    (
        'border-t-blue-500',
        'border-t-white/30'
    ),
    # border-l-blue-500 in glass-panel sections
    (
        'border-l-blue-500',
        'border-l-white/40'
    ),
]

count = 0
for old, new in replacements:
    if old in content:
        content = content.replace(old, new)
        print(f"✅ {old[:65]}...")
        count += 1
    else:
        print(f"⚠️  NOT FOUND: {old[:65]}...")

# ── Broad regex pass: catch remaining bg-blue-NNN and bg-blue-NNN/NN ────────
# Replace bg-blue-{shade} backgrounds (not in chart color arrays)
def replace_bg_blue(match):
    full = match.group(0)
    # Keep chart colors array (line with bg-emerald-500', 'bg-blue-500')
    return full  # handled below via specific pass

# Replace remaining bg-blue- patterns with bg-white/ equivalent
def map_bg_blue(m):
    shade = int(m.group(1))
    opacity = m.group(2)  # e.g. /20 or empty
    if opacity:
        op = int(opacity.lstrip('/'))
        return f"bg-white/{op}"
    # Solid blue → soft white overlay
    if shade <= 400:
        return "bg-white/10"
    elif shade <= 600:
        return "bg-white/20"
    else:
        return "bg-white/30"

# Apply regex only outside the chart colors line
lines = content.split('\n')
new_lines = []
for line in lines:
    # Skip the chart colors array line — it uses bg-blue-500 as a data value
    if "'bg-blue-500'" in line and 'colors' in line:
        new_lines.append(line)
        continue
    # Replace remaining bg-blue- occurrences
    new_line = re.sub(r'bg-blue-(\d+)(?:/(\d+))?', lambda m: map_bg_blue(m), line)
    new_lines.append(new_line)

content = '\n'.join(new_lines)

with open(APP, 'w', encoding='utf-8') as f:
    f.write(content)

changed = sum(1 for a, b in zip(original.split('\n'), content.split('\n')) if a != b)
print(f"\n✅ All done — {count} specific + ~{changed} line-level bg-blue replacements applied")

