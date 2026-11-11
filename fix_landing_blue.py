#!/usr/bin/env python3
"""Replace blue color references with white in the landing page section of App.jsx"""

APP = r"c:\Users\Personal\Desktop\projec\DIGITAL CLIMATE RESPONSES\src\App.jsx"

with open(APP, 'r', encoding='utf-8') as f:
    content = f.read()

# Landing page specific blue → white replacements
replacements = [
    # CloudRain icon in logo (top-right badge on sidebar logo)
    (
        'bg-blue-500/20 p-1.5 rounded-full backdrop-blur-md border border-blue-500/30 shadow-[0_0_5px_rgba(59,130,246,0.4)]',
        'bg-white/20 p-1.5 rounded-full backdrop-blur-md border border-white/30 shadow-[0_0_5px_rgba(255,255,255,0.4)]'
    ),
    (
        'className="text-blue-400 w-5 h-5 animate-bounce"',
        'className="text-white w-5 h-5 animate-bounce"'
    ),
    # Public Portal Access link (QR section)
    (
        'className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest hover:bg-blue-500/20 transition-all"',
        'className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all"'
    ),
    # Call button (phone link)
    (
        'className="flex items-center justify-center gap-2 w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 py-2 rounded-xl text-xs font-bold transition-all"',
        'className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white border border-white/30 py-2 rounded-xl text-xs font-bold transition-all"'
    ),
    # Contact nav button hover
    (
        'hover:text-blue-400 hover:bg-blue-500/10 rounded-full transition-all">Contact</button>',
        'hover:text-white hover:bg-white/10 rounded-full transition-all">Contact</button>'
    ),
    # Main landing hero — CloudRain bottom-right badge
    (
        'bg-blue-500/20 p-2.5 rounded-full backdrop-blur-md border border-blue-500/30"',
        'bg-white/20 p-2.5 rounded-full backdrop-blur-md border border-white/30"'
    ),
    (
        'className="text-blue-400 w-6 h-6 animate-bounce"',
        'className="text-white w-6 h-6 animate-bounce"'
    ),
    # Portal header small CloudRain icon
    (
        'className="text-blue-400 w-4 h-4 animate-pulse"',
        'className="text-white w-4 h-4 animate-pulse"'
    ),
    # NGO "Manage Applications" button
    (
        'className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20"',
        'className="flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-white/10 border border-white/30"'
    ),
]

count = 0
for old, new in replacements:
    if old in content:
        content = content.replace(old, new)
        print(f"✅ Replaced: {old[:70]}...")
        count += 1
    else:
        print(f"⚠️  Not found: {old[:70]}...")

with open(APP, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n✅ Done — {count} replacements made in App.jsx")

