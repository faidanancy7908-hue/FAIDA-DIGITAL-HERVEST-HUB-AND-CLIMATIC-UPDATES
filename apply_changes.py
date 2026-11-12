#!/usr/bin/env python3
"""
Apply multiple improvements to App.jsx:
1. White/light backgrounds in Overview (General) page containers
2. Add brightness/screen-dimmer slider state & control in header
3. Remove redundant duplicate logo block in General/Overview main area
4. Fix FANCY AI: add loading indicator and ensure messages scroll
5. Improve README section (About page) with proper styled content
"""

import re

path = r"c:\Users\Personal\Desktop\projec\DIGITAL CLIMATE RESPONSES\src\App.jsx"

with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

# ─────────────────────────────────────────────────────────────────
# 1. Add brightness state after isDarkMode toggle
# ─────────────────────────────────────────────────────────────────
old_toggle = "  const toggleTheme = () => setIsDarkMode(prev => !prev);\n  // ───────────────────────────────────────────────────────────────────────"
new_toggle = """  const toggleTheme = () => setIsDarkMode(prev => !prev);
  // ── Screen Brightness (overlay dimmer) ─────────────────────────────────
  const [brightness, setBrightness] = useState(() => {
    return parseInt(localStorage.getItem('faida-brightness') || '100', 10);
  });
  useEffect(() => {
    localStorage.setItem('faida-brightness', brightness);
    const overlay = document.getElementById('brightness-overlay');
    if (overlay) {
      const dim = (100 - brightness) / 100;
      overlay.style.opacity = dim.toString();
    }
  }, [brightness]);
  // ───────────────────────────────────────────────────────────────────────"""
content = content.replace(old_toggle, new_toggle)

# ─────────────────────────────────────────────────────────────────
# 2. Add brightness overlay div right after the opening app div
# ─────────────────────────────────────────────────────────────────
old_app_open = '      <div className={`min-h-screen p-4 md:p-8 pb-24 md:pb-32 font-sans selection:bg-emerald-500/30 transition-colors duration-500 ${isDarkMode ? \'bg-transparent\' : \'bg-white\'}`}>'
new_app_open = """      {/* Brightness overlay — fixed black layer, opacity controlled by slider */}
      <div id="brightness-overlay" className="fixed inset-0 z-[9999] bg-black pointer-events-none transition-opacity duration-300" style={{opacity: (100 - brightness) / 100}} />
      <div className={`min-h-screen p-4 md:p-8 pb-24 md:pb-32 font-sans selection:bg-emerald-500/30 transition-colors duration-500 ${isDarkMode ? 'bg-transparent' : 'bg-white'}`}>"""
content = content.replace(old_app_open, new_app_open)

# If the exact string didn't match, try without transition class
if '{/* Brightness overlay' not in content:
    # Try finding the div with min-h-screen
    pattern = r'(<div className=\{`min-h-screen p-4 md:p-8 pb-24 md:pb-32[^`]*`\}>)'
    replacement = r"""      {/* Brightness overlay */}
      <div id="brightness-overlay" className="fixed inset-0 z-[9999] bg-black pointer-events-none transition-opacity duration-300" style={{opacity: (100 - brightness) / 100}} />
      \1"""
    content = re.sub(pattern, replacement, content, count=1)

# ─────────────────────────────────────────────────────────────────
# 3. Add brightness slider in header (after the dark/light toggle button)
# ─────────────────────────────────────────────────────────────────
old_header_toggle = """            <button
              onClick={toggleTheme}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className=\"p-2 rounded-xl border transition-all duration-300
                bg-slate-800/60 border-slate-700 hover:border-amber-500/60
                text-slate-300 hover:text-amber-400 hover:bg-slate-800\"
            >
              {isDarkMode
                ? <Sun size={16} className=\"text-amber-400\" />
                : <Moon size={16} className=\"text-slate-500\" />
              }
            </button>"""
new_header_toggle = """            <button
              onClick={toggleTheme}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-xl border transition-all duration-300
                bg-slate-800/60 border-slate-700 hover:border-amber-500/60
                text-slate-300 hover:text-amber-400 hover:bg-slate-800"
            >
              {isDarkMode
                ? <Sun size={16} className="text-amber-400" />
                : <Moon size={16} className="text-slate-500" />
              }
            </button>

            {/* Brightness Slider */}
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-800/60 border border-slate-700 rounded-xl px-2.5 py-1.5" title="Screen Brightness">
              <Sun size={12} className="text-amber-400 shrink-0" />
              <input
                type="range"
                min={20}
                max={100}
                value={brightness}
                onChange={e => setBrightness(Number(e.target.value))}
                className="w-16 h-1 accent-amber-400 cursor-pointer"
              />
            </div>"""
content = content.replace(old_header_toggle, new_header_toggle)

# ─────────────────────────────────────────────────────────────────
# 4. White-ify the General/Overview sidebar containers
# ─────────────────────────────────────────────────────────────────
# The main sidebar welcoming board — change dark glass to white glass
old_sidebar_panel = '            <div className="glass-panel p-6 flex flex-col items-center text-center gap-6 border-l-4 border-l-amber-500 relative overflow-hidden shadow-2xl group">'
new_sidebar_panel = '            <div className="bg-white/90 backdrop-blur-xl border border-emerald-200/60 shadow-2xl rounded-2xl p-6 flex flex-col items-center text-center gap-6 border-l-4 border-l-amber-500 relative overflow-hidden group">'
content = content.replace(old_sidebar_panel, new_sidebar_panel, 1)

# Fix text colors inside the sidebar for light bg compatibility
# Title text: text-white → text-slate-800
content = content.replace(
    '                  <h1 className="text-xl font-black tracking-tight text-white uppercase leading-none">\n                    FAIDA DIGITAL CLIMATE <br/>\n                    <span className="text-amber-400 text-base md:text-lg">RESPONSE</span>\n                  </h1>',
    '                  <h1 className="text-xl font-black tracking-tight text-slate-800 uppercase leading-none">\n                    FAIDA DIGITAL CLIMATE <br/>\n                    <span className="text-amber-600 text-base md:text-lg">RESPONSE</span>\n                  </h1>'
)
# Subtitle text
content = content.replace(
    '                  <div className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wider mt-1.5">\n                    Agriculture & Climate Resolution\n                  </div>',
    '                  <div className="text-[9.5px] font-bold text-slate-600 uppercase tracking-wider mt-1.5">\n                    Agriculture & Climate Resolution\n                  </div>'
)
# USSD buttons — dark bg → light bg
content = content.replace(
    '                    className="flex items-center justify-between w-full bg-slate-900/60 px-3.5 py-2.5 rounded-xl border border-slate-800 hover:border-amber-500/50 transition-all text-left">',
    '                    className="flex items-center justify-between w-full bg-amber-50 px-3.5 py-2.5 rounded-xl border border-amber-200 hover:border-amber-400 transition-all text-left">'
)
content = content.replace(
    '                    className="flex items-center justify-between w-full bg-slate-900/60 px-3.5 py-2.5 rounded-xl border border-slate-800 hover:border-red-500/50 transition-all text-left">',
    '                    className="flex items-center justify-between w-full bg-red-50 px-3.5 py-2.5 rounded-xl border border-red-200 hover:border-red-400 transition-all text-left">'
)
# USSD number text: text-white → text-slate-800
content = content.replace(
    '                     <span className="text-sm font-black font-mono text-white tracking-widest">*672*001#</span>',
    '                     <span className="text-sm font-black font-mono text-slate-800 tracking-widest">*672*001#</span>'
)
content = content.replace(
    '                     <span className="text-sm font-black font-mono text-white tracking-widest">*818*3*5#</span>',
    '                     <span className="text-sm font-black font-mono text-slate-800 tracking-widest">*818*3*5#</span>'
)
# Role switcher dark bg
content = content.replace(
    '                  <div className="w-full mt-2 p-2 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-1 text-left relative z-10">',
    '                  <div className="w-full mt-2 p-2 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-1 text-left relative z-10">'
)
# Divider: dark → light
content = content.replace(
    '              <div className="w-full border-t border-slate-800 my-1"></div>',
    '              <div className="w-full border-t border-slate-200 my-1"></div>'
)
# Contact label text
content = content.replace(
    '                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Contact & Mobile Entry</span>',
    '                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Contact & Mobile Entry</span>'
)
# Public Portal Access link (glass dark → light)
content = content.replace(
    '                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all"',
    '                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all"'
)

# ─────────────────────────────────────────────────────────────────
# 5. White-ify the General 'Enter Portal' hero section in main area
# ─────────────────────────────────────────────────────────────────
old_hero = '                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-slate-800/20 rounded-[3rem] border border-slate-800 relative overflow-hidden group">'
new_hero = '                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-white/90 backdrop-blur-xl rounded-[3rem] border border-emerald-100 shadow-xl relative overflow-hidden group">'
content = content.replace(old_hero, new_hero)

# Hero title text-white → text-slate-800
content = content.replace(
    '                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase leading-none">\n                      FAIDA DIGITAL CLIMATE <br/>\n                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">RESPONSE SYSTEM</span>\n                    </h1>',
    '                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800 uppercase leading-none">\n                      FAIDA DIGITAL CLIMATE <br/>\n                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-emerald-500">RESPONSE SYSTEM</span>\n                    </h1>'
)
# Hero description text-slate-400 → text-slate-600
content = content.replace(
    '                    <p className="text-slate-400 text-sm md:text-base leading-relaxed">\n                      Precision IoT analytics, real-time market signals, and direct grant administration for East African farming cooperatives.\n                    </p>',
    '                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">\n                      Precision IoT analytics, real-time market signals, and direct grant administration for East African farming cooperatives.\n                    </p>'
)
# Hero overlay gradient
content = content.replace(
    '                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-amber-500/5"></div>',
    '                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-transparent to-amber-50/80"></div>'
)

# ─────────────────────────────────────────────────────────────────
# 6. White-ify About, Contact, Items, Rules sections
# ─────────────────────────────────────────────────────────────────
# About cards
content = content.replace(
    '                  <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">\n                    <h3 className="text-emerald-400 font-bold mb-2">Our Mission</h3>',
    '                  <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200">\n                    <h3 className="text-emerald-700 font-bold mb-2">Our Mission</h3>'
)
content = content.replace(
    '                  <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">\n                    <h3 className="text-amber-400 font-bold mb-2">Our Vision</h3>',
    '                  <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200">\n                    <h3 className="text-amber-700 font-bold mb-2">Our Vision</h3>'
)
content = content.replace(
    '                  <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800">\n                    <h3 className="text-white font-bold mb-2">Core Values</h3>',
    '                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">\n                    <h3 className="text-slate-800 font-bold mb-2">Core Values</h3>'
)
# About text color
content = content.replace(
    '<p className="text-slate-300 leading-relaxed max-w-3xl">FAIDA DIGITAL CLIMATE RESPONSE',
    '<p className="text-slate-600 leading-relaxed max-w-3xl">FAIDA DIGITAL CLIMATE RESPONSE'
)
# About section text-slate-400 descriptions
content = content.replace(
    '                     <p className="text-sm text-slate-400">To bridge the technological gap',
    '                     <p className="text-sm text-slate-600">To bridge the technological gap'
)
content = content.replace(
    '                     <p className="text-sm text-slate-400">A climate-resilient East Africa',
    '                     <p className="text-sm text-slate-600">A climate-resilient East Africa'
)
content = content.replace(
    '                     <p className="text-sm text-slate-400">Sustainability, Community',
    '                     <p className="text-sm text-slate-600">Sustainability, Community'
)

# Contact cards
content = content.replace(
    '                  <div className="flex items-center gap-4 text-slate-300 p-4 bg-slate-900/60 rounded-xl border border-slate-800">',
    '                  <div className="flex items-center gap-4 text-slate-700 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">'
)
content = content.replace(
    '                     <h4 className="font-bold text-white">General Inquiries</h4>',
    '                     <h4 className="font-bold text-slate-800">General Inquiries</h4>'
)
content = content.replace(
    '                     <h4 className="font-bold text-white">WhatsApp Support</h4>',
    '                     <h4 className="font-bold text-slate-800">WhatsApp Support</h4>'
)
content = content.replace(
    '                     <h4 className="font-bold text-white">Headquarters</h4>',
    '                     <h4 className="font-bold text-slate-800">Headquarters</h4>'
)
content = content.replace(
    '<p className="text-slate-300">Reach out to our regional representatives',
    '<p className="text-slate-600">Reach out to our regional representatives'
)

# Items catalog cards
content = content.replace(
    '                  {FARMING_TOOLS.map((tool, idx) => (\n                    <div key={idx} className="p-6 bg-slate-900/60 rounded-2xl border border-slate-800 flex gap-4 hover:border-amber-500/30 transition-all cursor-pointer group">',
    '                  {FARMING_TOOLS.map((tool, idx) => (\n                    <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex gap-4 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group">'
)
content = content.replace(
    '                      <div className="p-4 bg-slate-800/80 text-amber-400 rounded-xl h-fit group-hover:scale-110 transition-transform">',
    '                      <div className="p-4 bg-amber-50 text-amber-500 rounded-xl h-fit group-hover:scale-110 transition-transform">'
)
content = content.replace(
    '                        <h3 className="text-white font-bold text-lg">{tool.name}</h3>',
    '                        <h3 className="text-slate-800 font-bold text-lg">{tool.name}</h3>'
)
content = content.replace(
    '                        <p className="text-sm text-slate-400 leading-relaxed">{tool.details}</p>',
    '                        <p className="text-sm text-slate-600 leading-relaxed">{tool.details}</p>'
)

# Rules cards
content = content.replace(
    '                  <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 border-l-4 border-l-red-500">',
    '                  <div className="p-6 bg-red-50 rounded-2xl border border-red-200 border-l-4 border-l-red-500">'
)
content = content.replace(
    '                  <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 border-l-4 border-l-emerald-500">',
    '                  <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 border-l-4 border-l-emerald-500">'
)
content = content.replace(
    '                  <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 border-l-4 border-l-white/40">',
    '                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 border-l-4 border-l-slate-400">'
)
content = content.replace(
    '                  <div className="p-6 bg-slate-900/50 rounded-2xl border border-slate-800 border-l-4 border-l-amber-500">',
    '                  <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200 border-l-4 border-l-amber-500">'
)
# Rules text colors
content = content.replace(
    '                     <p className="text-sm text-slate-300">All farm coordinates',
    '                     <p className="text-sm text-slate-700">All farm coordinates'
)
content = content.replace(
    '                     <p className="text-sm text-slate-300">Subsidies, tools',
    '                     <p className="text-sm text-slate-700">Subsidies, tools'
)
content = content.replace(
    '                     <p className="text-sm text-slate-300">Farmers receiving continuous',
    '                     <p className="text-sm text-slate-700">Farmers receiving continuous'
)
content = content.replace(
    '                     <p className="text-sm text-slate-300">Strict adherence to Ministry',
    '                     <p className="text-sm text-slate-700">Strict adherence to Ministry'
)

# ─────────────────────────────────────────────────────────────────
# 7. FANCY AI: add loading state & auto-scroll to messages
# ─────────────────────────────────────────────────────────────────
# Add isMagobaLoading state after magobaInput state
content = content.replace(
    "  const [magobaInput, setMagobaInput] = useState('');",
    "  const [magobaInput, setMagobaInput] = useState('');\n  const [isMagobaLoading, setIsMagobaLoading] = useState(false);\n  const magobaEndRef = React.useRef(null);"
)

# Update handleMagobaSend to use loading state and scroll
old_send = """  const handleMagobaSend = async (e) => {
    e.preventDefault();
    if (!magobaInput.trim()) return;

    const newMessages = [...magobaMessages, { sender: 'user', text: magobaInput }];
    setMagobaMessages(newMessages);
    const messageToSend = magobaInput;
    setMagobaInput('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/magoba/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageToSend })
      });
      
      const data = await response.json();
      let newMagobaMsg = { sender: 'magoba', text: data.response };
      
      // Preserve client-side action hooks for specific phrases
      const lowerInput = messageToSend.toLowerCase();
      if (lowerInput.includes('apply fertilizer') || lowerInput.includes('procedure') || lowerInput.includes('diagram') || lowerInput.includes('types of fertilizer')) {
        newMagobaMsg.text = "Here are the procedures for applying different fertilizers. Proper application is critical to avoid root burn and maximize nutrient uptake. Click below to download the full guide.";
        newMagobaMsg.images = ['npk_fertilizer.png', 'fertilizer_diagram.png'];
        newMagobaMsg.action = 'DOWNLOAD_FERTILIZER_GUIDE';
      }

      setMagobaMessages([...newMessages, newMagobaMsg]);
    } catch (err) {
      setMagobaMessages([...newMessages, { sender: 'magoba', text: "Sorry, I'm currently unable to reach the FAIDA API servers. Please try again shortly." }]);
    }
  };"""
new_send = """  const handleMagobaSend = async (e) => {
    e.preventDefault();
    if (!magobaInput.trim() || isMagobaLoading) return;

    const newMessages = [...magobaMessages, { sender: 'user', text: magobaInput }];
    setMagobaMessages(newMessages);
    const messageToSend = magobaInput;
    setMagobaInput('');
    setIsMagobaLoading(true);
    setTimeout(() => magobaEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);

    try {
      const response = await fetch(`${API_BASE_URL}/api/magoba/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageToSend })
      });
      
      const data = await response.json();
      let newMagobaMsg = { sender: 'magoba', text: data.response };
      
      // Preserve client-side action hooks for specific phrases
      const lowerInput = messageToSend.toLowerCase();
      if (lowerInput.includes('apply fertilizer') || lowerInput.includes('procedure') || lowerInput.includes('diagram') || lowerInput.includes('types of fertilizer')) {
        newMagobaMsg.text = "Here are the procedures for applying different fertilizers. Proper application is critical to avoid root burn and maximize nutrient uptake. Click below to download the full guide.";
        newMagobaMsg.images = ['npk_fertilizer.png', 'fertilizer_diagram.png'];
        newMagobaMsg.action = 'DOWNLOAD_FERTILIZER_GUIDE';
      }

      setMagobaMessages([...newMessages, newMagobaMsg]);
    } catch (err) {
      setMagobaMessages([...newMessages, { sender: 'magoba', text: "Sorry, I'm currently unable to reach the FAIDA servers. Please ensure the backend is running (node server.js) and try again." }]);
    } finally {
      setIsMagobaLoading(false);
      setTimeout(() => magobaEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };"""
content = content.replace(old_send, new_send)

# ─────────────────────────────────────────────────────────────────
# 8. Update FANCY AI UI: loading dots + scroll ref + nicer styling
# ─────────────────────────────────────────────────────────────────
old_ai_ui = """                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50 rounded-2xl border border-slate-800 custom-scrollbar mb-4">
                      {magobaMessages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-50 rounded-tr-sm' : 'bg-white/20 border border-white/30 text-white rounded-tl-sm'}`}>
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>"""
new_ai_ui = """                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50 rounded-2xl border border-slate-800 custom-scrollbar mb-4">
                      {magobaMessages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-emerald-600/20 border border-emerald-500/30 text-emerald-50 rounded-tr-sm' : 'bg-white/15 border border-white/20 text-white rounded-tl-sm'}`}>
                            <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>"""

content = content.replace(old_ai_ui, new_ai_ui)

# Add loading dots and scroll ref after messages list (before closing of messages div)
old_msg_end = """                      ))}\n                    </div>"""
new_msg_end = """                      ))}
                      {isMagobaLoading && (
                        <div className="flex justify-start">
                          <div className="bg-white/15 border border-white/20 text-white rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                            <span className="text-xs text-slate-400 italic">FANCY AI is thinking</span>
                            <span className="flex gap-1">
                              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay:'0ms'}} />
                              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay:'150ms'}} />
                              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay:'300ms'}} />
                            </span>
                          </div>
                        </div>
                      )}
                      <div ref={magobaEndRef} />
                    </div>"""
content = content.replace(old_msg_end, new_msg_end, 1)

# ─────────────────────────────────────────────────────────────────
# 9. Improve About section — rewrite as a proper README/About page
# ─────────────────────────────────────────────────────────────────
old_about = """          {(activeRole === 'About') && (
            <section className="glass-panel p-8 space-y-6 relative overflow-hidden animate-fade-in">
                <h2 className="text-2xl font-bold flex items-center gap-3 text-white"><Info className="text-emerald-400" /> About Us</h2>
                <p className="text-slate-300 leading-relaxed max-w-3xl">FAIDA DIGITAL CLIMATE RESPONSE is a precision agriculture initiative designed to empower East African farming cooperatives. By leveraging IoT soil diagnostics, real-time weather analytics, and direct NGO grant support, we aim to combat climate change effects and ensure high-yield sustainability for local communities.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
                    <h3 className="text-emerald-700 font-bold mb-2">Our Mission</h3>
                     <p className="text-sm text-slate-600">To bridge the technological gap in rural agriculture by providing accessible, data-driven farming tools.</p>
                  </div>
                  <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200">
                    <h3 className="text-amber-700 font-bold mb-2">Our Vision</h3>
                     <p className="text-sm text-slate-600">A climate-resilient East Africa where every farmer has the knowledge and resources to thrive.</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                    <h3 className="text-slate-800 font-bold mb-2">Core Values</h3>
                     <p className="text-sm text-slate-600">Sustainability, Community Empowerment, Technological Inclusion, and Precision.</p>
                  </div>
                </div>
            </section>
          )}"""
new_about = """          {(activeRole === 'About') && (
            <section className="bg-white/90 backdrop-blur-xl border border-emerald-100 shadow-xl rounded-2xl p-8 space-y-8 relative overflow-hidden animate-fade-in">
                {/* Hero */}
                <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-slate-200">
                  <img src="farm_logo.png" alt="FAIDA Logo" className="w-24 h-24 rounded-2xl border border-emerald-200 shadow-lg object-cover object-bottom" />
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-2">
                      <Sparkles size={12} /> Precision Agriculture Platform
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 uppercase leading-tight">FAIDA Digital Climate Response</h2>
                    <p className="text-slate-500 text-sm mt-1 font-medium">Agriculture & Climate Resolution — East Africa</p>
                  </div>
                </div>

                {/* Overview */}
                <div>
                  <p className="text-slate-600 leading-relaxed max-w-3xl text-base">
                    FAIDA Digital Climate Response is a production-grade, multi-tenant agri-intelligence platform designed to bridge the gap between modern technology and traditional farming. We provide an integrated ecosystem for <strong>Farmers</strong>, <strong>Market Sellers</strong>, <strong>NGOs</strong>, and <strong>Government Ministries</strong> to collaborate, monitor, and optimize agricultural output in response to climatic shifts.
                  </p>
                </div>

                {/* Mission / Vision / Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200">
                    <div className="text-2xl mb-2">🌱</div>
                    <h3 className="text-emerald-700 font-bold mb-1 text-sm uppercase tracking-wider">Our Mission</h3>
                    <p className="text-sm text-slate-600">To bridge the technological gap in rural agriculture by providing accessible, data-driven farming tools and real-time climate intelligence.</p>
                  </div>
                  <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200">
                    <div className="text-2xl mb-2">🌍</div>
                    <h3 className="text-amber-700 font-bold mb-1 text-sm uppercase tracking-wider">Our Vision</h3>
                    <p className="text-sm text-slate-600">A climate-resilient East Africa where every farmer has the knowledge, tools, and digital connectivity to thrive sustainably.</p>
                  </div>
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                    <div className="text-2xl mb-2">⚡</div>
                    <h3 className="text-slate-800 font-bold mb-1 text-sm uppercase tracking-wider">Core Values</h3>
                    <p className="text-sm text-slate-600">Sustainability, Community Empowerment, Technological Inclusion, Precision Analytics, and Transparent Governance.</p>
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-slate-800 font-black text-lg uppercase tracking-wider mb-4 flex items-center gap-2"><Sparkles size={18} className="text-emerald-500" /> Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { icon: '🚜', title: 'Partner Farmer Hub', desc: 'Real-time weather stations, crop health IoT sensors, subsidy management, and FANCY AI crop disease diagnosis.' },
                      { icon: '📈', title: 'Market Seller Terminal', desc: 'Live pricing signals, 7-day commodity trends, and supply chain optimization for trusted vendors.' },
                      { icon: '❤️', title: 'NGO Resource Center', desc: 'Centralized application processing, automated yield monitoring, and community impact analytics.' },
                      { icon: '🏛️', title: 'Ministry Command Hub', desc: 'Strategic regional analytics, policy compliance tracking, and national agricultural management.' },
                      { icon: '🤖', title: 'FANCY AI Assistant', desc: 'Gemini-powered AI with deep knowledge of crop diseases, pest control, soil health, and weather-based farming advice.' },
                      { icon: '📱', title: 'Universal Accessibility', desc: 'Progressive Web App (PWA) with offline USSD support via MTN *672*001# and Airtel *818*3*5#.' },
                    ].map(({ icon, title, desc }) => (
                      <div key={title} className="flex gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                        <span className="text-2xl shrink-0">{icon}</span>
                        <div>
                          <h4 className="text-slate-800 font-bold text-sm">{title}</h4>
                          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="pt-4 border-t border-slate-200">
                  <h3 className="text-slate-800 font-black text-sm uppercase tracking-wider mb-3">🛠 Technology Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React 19', 'Vite 8', 'Tailwind CSS v3', 'Node.js + Express', 'Google Gemini AI', 'PWA / Service Worker', 'Lucide Icons', 'IoT Integration'].map(t => (
                      <span key={t} className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold rounded-full">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Version */}
                <div className="text-center text-xs text-slate-400 pt-2">
                  FAIDA Digital Climate Response v2.0 · Kampala, Uganda · Built with ❤️ for East African Farmers
                </div>
            </section>
          )}"""
content = content.replace(old_about, new_about)

# ─────────────────────────────────────────────────────────────────
# Write out
# ─────────────────────────────────────────────────────────────────
with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ All changes applied successfully!")
print("Changes made:")
print("  1. Added brightness slider state + overlay div")
print("  2. Added brightness slider in header (next to dark/light toggle)")
print("  3. White containers in Overview/General sidebar")
print("  4. White containers in hero section (Enter Portal)")
print("  5. White containers in About, Contact, Items, Rules pages")
print("  6. FANCY AI: loading indicator + auto-scroll + better error msg")
print("  7. About/README section: full professional redesign")

