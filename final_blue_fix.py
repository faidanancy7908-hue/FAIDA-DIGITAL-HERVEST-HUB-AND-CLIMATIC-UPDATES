#!/usr/bin/env python3
"""Final comprehensive blue → white pass on all source files"""
import re

files = [
    r"c:\Users\Personal\Desktop\projec\DIGITAL CLIMATE RESPONSES\src\App.jsx",
    r"c:\Users\Personal\Desktop\projec\DIGITAL CLIMATE RESPONSES\src\AuthScreen.jsx",
    r"c:\Users\Personal\Desktop\projec\DIGITAL CLIMATE RESPONSES\src\index.css",
    r"c:\Users\Personal\Desktop\projec\DIGITAL CLIMATE RESPONSES\AeroFarm-Standalone.html",
]

def map_blue(m):
    prefix = m.group(1)   # e.g. "bg-", "border-", "text-", etc.
    shade  = m.group(2)   # e.g. "500"
    opac   = m.group(3)   # e.g. "/10" or ""
    if prefix in ('bg-', 'from-', 'to-', 'via-'):
        op = opac.lstrip('/') if opac else ''
        return f"{prefix}white/{op}" if op else f"{prefix}white/20"
    elif prefix in ('border-', 'border-l-', 'border-r-', 'border-t-', 'border-b-'):
        return f"{prefix}white/40"
    elif prefix == 'text-':
        return f"text-white"
    elif prefix == 'shadow-':
        return f"shadow-white/10"
    elif prefix == 'ring-':
        return f"ring-white/30"
    elif prefix == 'accent-':
        return f"accent-white"
    elif prefix == 'hover:bg-':
        return f"hover:bg-white/20"
    elif prefix == 'hover:border-':
        return f"hover:border-white/40"
    elif prefix == 'hover:text-':
        return f"hover:text-white"
    return m.group(0)  # fallback keep original

PATTERN = re.compile(
    r'(bg-|from-|to-|via-|border-(?:l-|r-|t-|b-)?|text-|shadow-|ring-|accent-|hover:bg-|hover:border-|hover:text-)'
    r'blue-(\d+)(/\d+)?'
)

for path in files:
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()

        changed_lines = 0
        new_lines = []
        for line in content.split('\n'):
            # Preserve chart data array in App.jsx
            if "'bg-blue-500'" in line and 'colors' in line:
                new_lines.append(line)
                continue
            new_line = PATTERN.sub(map_blue, line)
            if new_line != line:
                changed_lines += 1
            new_lines.append(new_line)

        new_content = '\n'.join(new_lines)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        fname = path.split('\\')[-1]
        print(f"✅ {fname} — {changed_lines} lines updated")
    except Exception as e:
        print(f"❌ Error on {path}: {e}")

print("\n🎉 All blue backgrounds → white complete!")
