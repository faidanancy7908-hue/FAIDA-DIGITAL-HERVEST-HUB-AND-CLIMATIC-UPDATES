import sys

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Weather section
t1 = '''                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10 mb-8">
                  <div>'''
r1 = '''                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10 mb-8 cursor-pointer group" onClick={() => toggleSection('weather')}>
                  <div className="flex-1 flex justify-between items-center w-full">
                    <div>'''
content = content.replace(t1, r1)

t1_2 = '''                  <div className="flex items-stretch shrink-0 w-full md:w-auto rounded-xl overflow-hidden shadow-xl border border-amber-500/30">'''
r1_2 = '''                    <ChevronDown className={shrink-0 transition-transform } size={24} />
                  </div>
                  <div className="flex items-stretch shrink-0 w-full md:w-auto rounded-xl overflow-hidden shadow-xl border border-amber-500/30" onClick={e => e.stopPropagation()}>'''
content = content.replace(t1_2, r1_2)

t1_3 = '''                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">'''
r1_3 = '''                {expandedSections.weather && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">'''
content = content.replace(t1_3, r1_3)

# Find the end of weather section
t1_4 = '''              <section className="glass-panel p-5 lg:col-span-3 border-l-4 border-l-purple-500 relative overflow-hidden group">'''
r1_4 = '''                )}
              </section>
              <section className="glass-panel p-5 lg:col-span-3 border-l-4 border-l-purple-500 relative overflow-hidden group">'''
content = content.replace('''              </section>
              <section className="glass-panel p-5 lg:col-span-3 border-l-4 border-l-purple-500 relative overflow-hidden group">''', r1_4)

# 2. Precision Farming Interventions
t2 = '''              <section className="glass-panel p-5 lg:col-span-3 border-l-4 border-l-purple-500 relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors"></div>
                <div className="relative z-10 flex flex-col md:flex-row gap-8">
                  
                  {/* Drone & Satellite Feed */}'''
r2 = '''              <section className="glass-panel p-5 lg:col-span-3 border-l-4 border-l-purple-500 relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors"></div>
                <div className="flex justify-between items-center mb-6 cursor-pointer relative z-10" onClick={() => toggleSection('interventions')}>
                  <h2 className="text-xl font-semibold flex items-center gap-2">Precision Farming Interventions</h2>
                  <ChevronDown className={	ransition-transform } />
                </div>
                {expandedSections.interventions && (
                <div className="relative z-10 flex flex-col md:flex-row gap-8">
                  
                  {/* Drone & Satellite Feed */}'''
content = content.replace(t2, r2)

t2_2 = '''              <section className="glass-panel p-6 lg:col-span-1 flex flex-col justify-between relative overflow-hidden group">'''
content = content.replace('''              </section>

              {/* Action Items */}
              <section className="glass-panel p-6 lg:col-span-1 flex flex-col justify-between relative overflow-hidden group">''', 
'''                  )}
              </section>

              {/* Action Items */}
              <section className="glass-panel p-6 lg:col-span-1 flex flex-col justify-between relative overflow-hidden group">''')

# 3. Action Items
t3 = '''              <section className="glass-panel p-6 lg:col-span-1 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <CheckCircle2 className="text-emerald-400" /> Action Items
                </h2>
                
                <div className="space-y-4">'''
r3 = '''              <section className="glass-panel p-6 lg:col-span-1 flex flex-col relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
                <div className="flex justify-between items-center mb-6 cursor-pointer relative z-10" onClick={() => toggleSection('actions')}>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <CheckCircle2 className="text-emerald-400" /> Action Items
                  </h2>
                  <ChevronDown className={	ransition-transform } />
                </div>
                {expandedSections.actions && (
                <div className="space-y-4 flex-1">'''
content = content.replace(t3, r3)

content = content.replace('''                  </button>
                </div>
              </section>

              {/* Smart Planning Tool */}''', 
'''                  </button>
                </div>
                )}
              </section>

              {/* Smart Planning Tool */}''')

# 4. Smart Planning Tool
t4 = '''              <section id="planning-section" className="glass-panel p-6 lg:col-span-2 relative overflow-hidden">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Calculator className="text-emerald-400" /> Smart Planning Tool
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">'''
r4 = '''              <section id="planning-section" className="glass-panel p-6 lg:col-span-2 relative overflow-hidden">
                <div className="flex justify-between items-center mb-6 cursor-pointer" onClick={() => toggleSection('planning')}>
                  <h2 className="text-xl font-semibold flex items-center gap-2 mb-0">
                    <Calculator className="text-emerald-400" /> Smart Planning Tool
                  </h2>
                  <ChevronDown className={	ransition-transform } />
                </div>
                {expandedSections.planning && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">'''
content = content.replace(t4, r4)

content = content.replace('''                  </div>
                </div>
              </section>

              {/* Best Practices Guidelines */}''', 
'''                  </div>
                </div>
                )}
              </section>

              {/* Best Practices Guidelines */}''')

# 5. Best Practices Guidelines
t5 = '''              <section id="guidelines-section" className="glass-panel p-5 space-y-4 border-l-4 border-l-emerald-500 col-span-full">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-3">
                    <BookOpen className="text-emerald-400" /> Climate-Smart Guidelines
                  </h2>
                  <button className="text-emerald-400 text-sm hover:text-emerald-300 font-bold transition-colors">
                    View All
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">'''
r5 = '''              <section id="guidelines-section" className="glass-panel p-5 border-l-4 border-l-emerald-500 col-span-full">
                <div className="flex items-center justify-between cursor-pointer mb-4" onClick={() => toggleSection('guidelines')}>
                  <h2 className="text-xl font-bold flex items-center gap-3">
                    <BookOpen className="text-emerald-400" /> Climate-Smart Guidelines
                  </h2>
                  <div className="flex items-center gap-4">
                    <button className="text-emerald-400 text-sm hover:text-emerald-300 font-bold transition-colors" onClick={e => e.stopPropagation()}>
                      View All
                    </button>
                    <ChevronDown className={	ransition-transform } />
                  </div>
                </div>
                {expandedSections.guidelines && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">'''
content = content.replace(t5, r5)

content = content.replace('''                  </div>
                </div>
              </section>

              {/* Resource Center / Apply Section */}''', 
'''                  </div>
                </div>
                )}
              </section>

              {/* Resource Center / Apply Section */}''')

# 6. Resource Center
t6 = '''              <section id="resource-center" className="glass-panel p-5 space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
                <div className="flex items-center justify-between relative z-10">
                  <h2 className="text-xl font-bold flex items-center gap-3 text-white">
                    <Heart className="text-amber-400" /> Support & Resource Grants
                  </h2>
                  <span className="text-[10px] font-black tracking-widest uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    Application Open
                  </span>
                </div>
                <p className="text-sm text-slate-300 max-w-3xl relative z-10">'''
r6 = '''              <section id="resource-center" className="glass-panel p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
                <div className="flex items-center justify-between relative z-10 cursor-pointer mb-4" onClick={() => toggleSection('resource')}>
                  <h2 className="text-xl font-bold flex items-center gap-3 text-white mb-0">
                    <Heart className="text-amber-400" /> Support & Resource Grants
                  </h2>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black tracking-widest uppercase text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                      Application Open
                    </span>
                    <ChevronDown className={	ransition-transform } />
                  </div>
                </div>
                {expandedSections.resource && (
                <div className="space-y-4">
                <p className="text-sm text-slate-300 max-w-3xl relative z-10">'''
content = content.replace(t6, r6)

content = content.replace('''                  </button>
                </div>
              </section>

              {/* Active Tools Section */}''', 
'''                  </button>
                </div>
                </div>
                )}
              </section>

              {/* Active Tools Section */}''')

# 7. Applications
t7 = '''              <section id="applications-list-farmer" className="glass-panel p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-3">
                    <Activity className="text-emerald-400" /> My Applications & Feedback
                  </h2>
                </div>
                
                <div className="flex flex-col gap-4">'''
r7 = '''              <section id="applications-list-farmer" className="glass-panel p-5">
                <div className="flex items-center justify-between cursor-pointer mb-4" onClick={() => toggleSection('applications')}>
                  <h2 className="text-xl font-bold flex items-center gap-3 mb-0">
                    <Activity className="text-emerald-400" /> My Applications & Feedback
                  </h2>
                  <ChevronDown className={	ransition-transform } />
                </div>
                {expandedSections.applications && (
                <div className="flex flex-col gap-4">'''
content = content.replace(t7, r7)

content = content.replace('''                    </div>
                  )}
                </div>
              </section>
            </div>
          )}

          {(activeRole === 'NGO' || activeRole === 'Ministry') && (''', 
'''                    </div>
                  )}
                </div>
                )}
              </section>
            </div>
          )}

          {(activeRole === 'NGO' || activeRole === 'Ministry') && (''')

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Replaced all sections.")
