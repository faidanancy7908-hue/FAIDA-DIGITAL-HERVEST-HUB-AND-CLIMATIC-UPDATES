#!/usr/bin/env python3
path = r"c:\Users\Personal\Desktop\projec\DIGITAL CLIMATE RESPONSES\src\App.jsx"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# USSD codes - black
content = content.replace(
    'text-sm font-black font-mono text-white tracking-widest">*672*001#</span>',
    'text-sm font-black font-mono text-black tracking-widest">*672*001#</span>'
)
content = content.replace(
    'text-sm font-black font-mono text-white tracking-widest">*818*3*5#</span>',
    'text-sm font-black font-mono text-black tracking-widest">*818*3*5#</span>'
)

# Contact page phone number - black
content = content.replace(
    '<p className="text-sm">+256 763 927 908</p>',
    '<p className="text-sm font-bold text-black">+256 763 927 908</p>'
)

# Headquarters address - black
content = content.replace(
    '<p className="text-sm">Kampala, Uganda - Innovation Hub</p>',
    '<p className="text-sm font-bold text-black">Kampala, Uganda \u2014 Innovation Hub</p>'
)

# Also make NGO phone numbers in the applications list black
content = content.replace(
    '<span className="text-white font-semibold font-mono">',
    '<span className="text-black font-semibold font-mono">'
)

# Farmer portal USSD subtitle - already a span, make USSD text black
# (Already handled in previous script as JSX span)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("All contact colors fixed to black!")
