#!/usr/bin/env python3
"""Inject a Farmer Page Quick Navigation dropdown into App.jsx"""

APP = r"c:\Users\Personal\Desktop\projec\DIGITAL CLIMATE RESPONSES\src\App.jsx"

NAV_BLOCK = '''              {/* ════════════════════════════════════════════
                  FARMER PAGE — QUICK NAVIGATION MENU
              ════════════════════════════════════════════ */}
              <div className="glass-panel p-4 border-l-4 border-l-emerald-500">
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer list-none select-none py-1">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📋</span>
                      <div>
                        <h2 className="text-base font-black uppercase tracking-widest text-emerald-400">Page Navigation</h2>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Click to jump to any section</p>
                      </div>
                    </div>
                    <ChevronDown className="text-emerald-400 w-5 h-5 transition-transform duration-300 group-open:rotate-180 shrink-0" />
                  </summary>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-4 border-t border-slate-700/40">
                    {[
                      { id: 'weather-section',         icon: '🌤️', label: 'Weather & IoT Sensors',       desc: 'Live climate & soil alerts' },
                      { id: 'planning-section',         icon: '📅', label: 'Crop Planning Calendar',      desc: 'Planting & seasonal schedules' },
                      { id: 'guidelines-section',       icon: '📖', label: 'Farmer Guidelines & IPM',     desc: 'Best practices & pest management' },
                      { id: 'resource-center',          icon: '📦', label: 'Resource Center',             desc: 'Tools, seeds & input requests' },
                      { id: 'tools-section',            icon: '🛠️', label: 'Smart Farming Tools',         desc: 'Calculators & spray planners' },
                      { id: 'market-section',           icon: '📈', label: 'Market Prices',               desc: 'Live commodity prices & trends' },
                      { id: 'magoba-ai-section',        icon: '🤖', label: 'FANCY AI Assistant',          desc: 'Disease, pest & weather help' },
                      { id: 'applications-list-farmer', icon: '📝', label: 'My Applications',             desc: 'Track support requests' },
                      { id: 'disease-section',          icon: '🌿', label: 'Crop Disease Guide',          desc: 'Identify & treat crop diseases' },
                    ].map(({ id, icon, label, desc }) => (
                      <button
                        key={id}
                        onClick={() => {
                          const el = document.getElementById(id);
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 hover:bg-emerald-500/10 border border-slate-700/40 hover:border-emerald-500/40 transition-all text-left group/nav w-full"
                      >
                        <span className="text-lg shrink-0">{icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-200 group-hover/nav:text-emerald-400 transition-colors leading-tight truncate">{label}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-tight truncate">{desc}</p>
                        </div>
                        <ArrowRight className="text-slate-600 group-hover/nav:text-emerald-400 w-3 h-3 shrink-0 transition-colors" />
                      </button>
                    ))}
                  </div>
                </details>
              </div>

'''

with open(APP, 'r', encoding='utf-8') as f:
    content = f.read()

TARGET = "              {/* FANCY AI Assistant Section */}\n              <section id=\"magoba-ai-section\""

if TARGET in content:
    content = content.replace(TARGET, NAV_BLOCK + "              {/* FANCY AI Assistant Section */}\n              <section id=\"magoba-ai-section\"", 1)
    print("✅ Farmer Quick Navigation injected!")
else:
    print("❌ Target anchor not found")
    # Debug
    if 'magoba-ai-section' in content:
        print("   magoba-ai-section found")

with open(APP, 'w', encoding='utf-8') as f:
    f.write(content)
