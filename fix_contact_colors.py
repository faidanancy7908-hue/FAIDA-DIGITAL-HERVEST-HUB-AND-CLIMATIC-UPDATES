#!/usr/bin/env python3
"""Fix all contact/communication text to black ink."""

path = r"c:\Users\Personal\Desktop\projec\DIGITAL CLIMATE RESPONSES\src\App.jsx"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

fixes = [
    # ── SIDEBAR: USSD dial codes ──────────────────────────────────────────
    (
        '                     <span className="text-sm font-black font-mono text-white tracking-widest">*672*001#</span>',
        '                     <span className="text-sm font-black font-mono text-black tracking-widest">*672*001#</span>'
    ),
    (
        '                     <span className="text-sm font-black font-mono text-white tracking-widest">*818*3*5#</span>',
        '                     <span className="text-sm font-black font-mono text-black tracking-widest">*818*3*5#</span>'
    ),
    # ── SIDEBAR: WhatsApp button ──────────────────────────────────────────
    (
        '                      className="flex items-center justify-center gap-2 w-full bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 py-2 rounded-xl text-xs font-bold transition-all"',
        '                      className="flex items-center justify-center gap-2 w-full bg-emerald-50 hover:bg-emerald-100 text-black border border-emerald-300 py-2 rounded-xl text-xs font-bold transition-all"'
    ),
    # ── SIDEBAR: Call button ──────────────────────────────────────────────
    (
        '                      className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white border border-white/30 py-2 rounded-xl text-xs font-bold transition-all"',
        '                      className="flex items-center justify-center gap-2 w-full bg-slate-100 hover:bg-slate-200 text-black border border-slate-300 py-2 rounded-xl text-xs font-bold transition-all"'
    ),
    # ── CONTACT PAGE: phone number text ──────────────────────────────────
    (
        '                       <p className="text-sm">+256 763 927 908</p>',
        '                       <p className="text-sm font-bold text-black">+256 763 927 908</p>'
    ),
    # ── CONTACT PAGE: WhatsApp link ───────────────────────────────────────
    (
        'className="text-sm text-white hover:underline">Chat with an Expert</a>',
        'className="text-sm text-black font-semibold hover:underline">Chat with an Expert (+256 763 927 908)</a>'
    ),
    # ── CONTACT PAGE: Headquarters ───────────────────────────────────────
    (
        '                       <p className="text-sm">Kampala, Uganda - Innovation Hub</p>',
        '                       <p className="text-sm font-bold text-black">Kampala, Uganda — Innovation Hub</p>'
    ),
    # ── CONTACT PAGE: heading ────────────────────────────────────────────
    (
        '<h2 className="text-2xl font-bold flex items-center gap-3 text-white"><Phone className="text-white" /> Contact Us</h2>',
        '<h2 className="text-2xl font-bold flex items-center gap-3 text-slate-800"><Phone className="text-emerald-500" /> Contact Us</h2>'
    ),
    # ── CONTACT PAGE: glass-panel → white card ───────────────────────────
    (
        '            <section className="glass-panel p-8 space-y-6 relative overflow-hidden animate-fade-in">\n                <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-800"><Phone className="text-emerald-500" /> Contact Us</h2>',
        '            <section className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl rounded-2xl p-8 space-y-6 relative overflow-hidden animate-fade-in">\n                <h2 className="text-2xl font-bold flex items-center gap-3 text-slate-800"><Phone className="text-emerald-500" /> Contact Us</h2>'
    ),
    # ── SIDEBAR: "Contact & Mobile Entry" label ───────────────────────────
    (
        '<span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Contact & Mobile Entry</span>',
        '<span className="text-[10px] font-black uppercase tracking-widest text-black">Contact & Mobile Entry</span>'
    ),
    # ── HELPLINE border ───────────────────────────────────────────────────
    (
        '                  <div className="flex flex-col gap-2 pt-3 border-t border-slate-800 mt-2">',
        '                  <div className="flex flex-col gap-2 pt-3 border-t border-slate-200 mt-2">'
    ),
    # ── Farmer portal subtitle USSD mention ──────────────────────────────
    (
        '{activeRole === \'Farmer\' && "Optimize your yield with precision tools and direct NGO support. USSD: *672*001#"}',
        '{activeRole === \'Farmer\' && <span>Optimize your yield with precision tools and direct NGO support. USSD: <strong className="text-black font-mono">*672*001#</strong></span>}'
    ),
]

for old, new in fixes:
    if old in content:
        content = content.replace(old, new)
        print(f"  ✅ Fixed: {old[:60].strip()}...")
    else:
        print(f"  ⚠️  NOT FOUND: {old[:60].strip()}...")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("\nDone!")
