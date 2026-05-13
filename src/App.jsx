import React, { useState, useEffect } from 'react';
import { 
  CloudRain, 
  Wind, 
  TrendingUp, 
  TrendingDown, 
  RefreshCcw, 
  AlertTriangle,
  Leaf,
  Calculator,
  Activity,
  Users,
  User,
  ShoppingCart,
  Building2,
  Heart,
  Sparkles,
  Download,
  BarChart3,
  ShieldCheck,
  Layout,
  Phone,
  MessageCircle,
  Wrench,
  ChevronRight,
  Code
} from 'lucide-react';


const INITIAL_MARKET_DATA = [
  { id: 'maize', name: 'Maize', price: 240.50, history: [238, 239, 241, 240.5] },
  { id: 'soybeans', name: 'Soybeans', price: 512.20, history: [510, 508, 515, 512.2] },
  { id: 'wheat', name: 'Wheat', price: 315.75, history: [320, 318, 316, 315.75] },
  { id: 'cocoa', name: 'Cocoa', price: 2850.00, history: [2800, 2820, 2840, 2850] },
  { id: 'millet', name: 'Millet', price: 185.30, history: [180, 182, 184, 185.3] },
  { id: 'groundnuts', name: 'Groundnuts', price: 420.00, history: [415, 418, 422, 420] },
  { id: 'sorghum', name: 'Sorghum', price: 195.50, history: [192, 194, 196, 195.5] },
  { id: 'tobacco', name: 'Tobacco', price: 3250.00, history: [3200, 3220, 3240, 3250] },
  { id: 'livestock', name: 'Livestock', price: 1540.00, history: [1550, 1530, 1545, 1540] }
];

const WEATHER_CONDITIONS = [
  { condition: 'Clear', temp: 28, humidity: 45, alert: 'Optimal Spraying Conditions' },
  { condition: 'Stormy', temp: 22, humidity: 85, alert: 'High Wind: Delay Spraying' },
  { condition: 'Cloudy', temp: 25, humidity: 60, alert: 'Monitor Soil Moisture' }
];

export default function App() {
  const [marketData, setMarketData] = useState(INITIAL_MARKET_DATA);
  const [isUpdating, setIsUpdating] = useState(false);
  const [weather, setWeather] = useState(WEATHER_CONDITIONS[0]);
  
  const [cropType, setCropType] = useState('maize');
  const [landSize, setLandSize] = useState('');
  const [forecast, setForecast] = useState(null);
  const [activeRole, setActiveRole] = useState('General');
  const [greeting, setGreeting] = useState('Welcome');
  const [selectedTool, setSelectedTool] = useState(null);
  const [userRole, setUserRole] = useState('Admin'); // Demo Role: Admin, NGO, Farmer, Seller, Ministry
  
  const [applications, setApplications] = useState([
    { id: 'app1', name: 'John Doe', crop: 'Maize', status: 'Approved', yield: '4.2t/ha' },
    { id: 'app2', name: 'Jane Smith', crop: 'Cocoa', status: 'Pending', yield: '0.8t/ha' }
  ]);

  const handleApply = (name, crop) => {
    const newApp = {
      id: `app${Date.now()}`,
      name: name || 'Current Farmer',
      crop: crop || cropType,
      status: 'Pending',
      yield: 'Tracking...'
    };
    setApplications([...applications, newApp]);
    alert('Application submitted successfully to NGO Resource Center!');
  };

  const handleDownload = (filename, content = "FAIDA Digital Harvest Hub - Official Data Export") => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${filename.replace(/\s+/g, '_').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    alert(`Downloading: ${filename}...`);
  };


  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    const interval = setInterval(() => {
      setIsUpdating(true);
      setMarketData(current => current.map(item => {
        const fluctuation = (Math.random() * 3 - 1.5) / 100;
        const newPrice = item.price * (1 + fluctuation);
        const newHistory = [...item.history.slice(-5), newPrice];
        return { ...item, price: newPrice, history: newHistory };
      }));
      if (Math.random() > 0.7) {
        setWeather(WEATHER_CONDITIONS[Math.floor(Math.random() * WEATHER_CONDITIONS.length)]);
      }
      setTimeout(() => setIsUpdating(false), 800);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!landSize || isNaN(landSize)) return;
    const crop = marketData.find(c => c.id === cropType);
    const yieldFactors = {
      cocoa: 0.5,
      livestock: 2,
      tobacco: 2.5,
      millet: 2.2,
      sorghum: 2.4,
      groundnuts: 2.0
    };
    const yieldPerHectare = yieldFactors[cropType] || 4; 
    const estimatedYield = parseFloat(landSize) * yieldPerHectare;
    const projectedRevenue = estimatedYield * crop.price;
    const estimatedCosts = projectedRevenue * 0.4; 
    setForecast({ revenue: projectedRevenue, costs: estimatedCosts, profit: projectedRevenue - estimatedCosts });
  };

  const renderSparkline = (history) => {
    const min = Math.min(...history);
    const max = Math.max(...history);
    const range = max - min || 1;
    return (
      <div className="flex items-end h-8 space-x-1">
        {history.slice(-6).map((val, i) => {
          const heightPercent = ((val - min) / range) * 100;
          return (
            <div 
              key={i} 
              className={`w-2 rounded-t-sm transition-all duration-500 ${val >= (history[i-1] || val) ? 'bg-emerald-500' : 'bg-red-400'}`}
              style={{ height: `${Math.max(20, heightPercent)}%` }}
            ></div>
          );
        })}
      </div>
    );
  };

  const roles = [
    { id: 'General', name: 'Overview', icon: Layout },
    { id: 'Farmer', name: 'Farmer Portal', icon: User },
    { id: 'Seller', name: 'Market Seller', icon: ShoppingCart },
    { id: 'Ministry', name: 'Ministry/Policy', icon: Building2 },
    { id: 'NGO', name: 'NGO/Initiative', icon: Heart }
  ];

  const FARMING_TOOLS = [
    { 
      name: 'Smart Irrigation Kit', 
      desc: 'Solar-powered drip system', 
      icon: CloudRain,
      details: 'Automated water distribution based on soil moisture levels. Includes a 50W solar panel, 200L tank capacity, and connectivity for up to 500 plants. Saves 60% water compared to manual methods.'
    },
    { 
      name: 'Soil Sensor Pro', 
      desc: 'NPK and moisture tracking', 
      icon: Activity,
      details: 'High-precision probe for measuring Nitrogen, Phosphorus, and Potassium levels. Bluetooth enabled with real-time logging. Battery lasts for 6 months on a single charge. Weatherproof IP67 rating.'
    },
    { 
      name: 'Power Tiller', 
      desc: 'Efficient land preparation', 
      icon: RefreshCcw,
      details: '7HP diesel engine with adjustable tilling width (300mm to 1050mm). Ideal for small to medium farms. Includes attachments for weeding and ridging. Low fuel consumption of 0.8L/hr.'
    },
    { 
      name: 'Pest Drone', 
      desc: 'Precision spraying technology', 
      icon: Wind,
      details: '10L payload capacity with obstacle avoidance radar. Covers 1 hectare in 10 minutes. Autonomous flight paths and precision mapping software included. Reduces chemical exposure for farmers.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 p-4 md:p-8 font-sans selection:bg-emerald-500/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar: Stakeholders & Visuals */}
          <aside className="w-full lg:w-80 space-y-6 lg:sticky lg:top-8">
            <div className="glass-panel p-6 space-y-6 border-l-4 border-l-emerald-500">
              <div className="space-y-2">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Users size={20} className="text-emerald-400" /> Stakeholders
                </h2>
                <p className="text-xs text-slate-400">Select your portal to access specialized tools</p>
              </div>

              {/* Demo Role Switcher (For testing RBAC) */}
              <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 block">Switch User Role (Demo)</label>
                <select 
                  value={userRole} 
                  onChange={(e) => {
                    setUserRole(e.target.value);
                    setActiveRole('General');
                  }}
                  className="w-full bg-slate-800 border-none rounded-lg px-3 py-1.5 text-xs font-bold text-emerald-400 focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="Admin">System Administrator</option>
                  <option value="NGO">NGO Representative</option>
                  <option value="Farmer">Partner Farmer</option>
                  <option value="Seller">Market Seller</option>
                  <option value="Ministry">Ministry Official</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                {roles
                  .filter(role => {
                    if (userRole === 'Admin') return true;
                    if (userRole === 'NGO') return role.id === 'General' || role.id === 'NGO' || role.id === 'Farmer';
                    if (userRole === 'Farmer') return role.id === 'General' || role.id === 'Farmer';
                    return role.id === 'General' || role.id === userRole;
                  })
                  .map(role => (
                  <button 
                    key={role.id}
                    onClick={() => setActiveRole(role.id)}
                    className={`flex items-center justify-between group/btn px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeRole === role.id ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'}`}
                  >
                    <div className="flex items-center gap-3">
                      <role.icon size={18} />
                      {role.name}
                    </div>
                    <ChevronRight size={14} className={`transition-transform ${activeRole === role.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`} />
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-4 pt-4 border-t border-slate-700/50">
                <div className="rounded-xl overflow-hidden border border-slate-700/50 shadow-xl relative group/img aspect-video">
                  <img src="/farmer_garden_yield.png" alt="Farmer" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700 opacity-60" />
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-700/50 shadow-xl relative group/img aspect-video">
                  <img src="/bountiful_harvest.png" alt="Harvest" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700 opacity-60" />
                </div>
              </div>
            </div>

            {/* Mobile Onboarding & USSD */}
            <div className="glass-panel p-6 space-y-4 border-l-4 border-l-amber-500">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Mobile Access</h3>
                <p className="text-xs text-slate-400">Offline & Quick Entry</p>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex flex-col items-center gap-4 text-center">
                <div className="w-40 h-40 rounded-3xl overflow-hidden border-8 border-white shadow-2xl bg-white p-2 transform hover:scale-105 transition-transform duration-500">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent("https://faidanancy7908-hue.github.io/digital-farmers-farmers-hervest-hub-and-climatic-updated/")}&bgcolor=ffffff&color=0f172a&margin=10`} 
                    alt="Web Portal QR Code" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <div className="space-y-4 w-full">
                  <div className="space-y-3 w-full">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                      <Layout size={12} /> Public Portal Access
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between bg-slate-800 px-3 py-2 rounded-lg border border-slate-700">
                        <span className="text-[9px] font-black uppercase text-amber-500">MTN Line</span>
                        <span className="text-sm font-black font-mono text-white tracking-widest">*672*001#</span>
                      </div>
                      <div className="flex items-center justify-between bg-slate-800 px-3 py-2 rounded-lg border border-slate-700">
                        <span className="text-[9px] font-black uppercase text-red-500">Airtel Line</span>
                        <span className="text-sm font-black font-mono text-white tracking-widest">*818*3*5#</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                    Scan the QR code to grant immediate access to this intelligence hub on any smartphone.
                  </p>
                </div>
              </div>
            </div>

            {/* NGO Quick Contacts (Always visible in sidebar for NGOs or Farmers) */}
            {(activeRole === 'NGO' || activeRole === 'Farmer') && (
              <div className="glass-panel p-6 space-y-4 border-l-4 border-l-purple-500">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-purple-400 uppercase tracking-wider">Direct Assistance</h3>
                  <p className="text-xs text-slate-400">NGO Support Helpline</p>
                </div>
                <div className="space-y-2">
                  <a 
                    href="https://wa.me/256763927908" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  >
                    <MessageCircle size={18} /> WhatsApp Support
                  </a>
                  <a 
                    href="tel:0763927908" 
                    className="flex items-center justify-center gap-2 w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  >
                    <Phone size={18} /> Direct Call: 0763927908
                  </a>
                </div>
              </div>
            )}
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 space-y-12 w-full">
            
            {/* Portal Header */}
            {activeRole !== 'General' && (
              <header className="glass-panel p-8 relative overflow-hidden animate-fade-in">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                      <Sparkles size={14} /> {activeRole} Portal
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0 shadow-lg bg-white/5 flex items-center justify-center">
                        <img src="/faida_basket_logo.png" alt="FAIDA Logo" className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} />
                      </div>

                      <h1 className="text-4xl font-bold">
                        {activeRole === 'Farmer' && "Partner Farmer Hub"}
                        {activeRole === 'Seller' && "Market Seller Terminal"}
                        {activeRole === 'Ministry' && "Ministry Command Hub"}
                        {activeRole === 'NGO' && "Initiative Resource Center"}
                      </h1>
                    </div>
                    <p className="text-slate-400 text-sm max-w-xl">
                      {activeRole === 'Farmer' && "Optimize your yield with precision tools and direct NGO support. USSD: *672*001#"}
                      {activeRole === 'Seller' && "Real-time market signals and supply chain optimization for trusted vendors."}
                      {activeRole === 'Ministry' && "Strategic policy implementation and national agricultural analytics."}
                      {activeRole === 'NGO' && "Empowering local communities through technology and knowledge sharing."}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    {activeRole === 'Farmer' && (
                      <button 
                        onClick={() => handleApply('Partner Farmer', cropType)}
                        className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-600/20"
                      >
                        <Heart size={18} /> Apply for Support
                      </button>
                    )}
                    {activeRole === 'NGO' && (
                      <button 
                        onClick={() => document.getElementById('applications-list')?.scrollIntoView({ behavior: 'smooth' })}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20"
                      >
                        <Users size={18} /> Manage Applications
                      </button>
                    )}
                    <button 
                      onClick={() => setActiveRole('General')}
                      className="shrink-0 flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-bold transition-all border border-slate-700"
                    >
                      <Layout size={18} /> Return to Hub
                    </button>
                  </div>
                </div>
              </header>
            )}

            {/* Dynamic Content Rendering */}
            <div className="space-y-12 transition-all duration-500">
              
              {activeRole === 'General' && (
                <div className="space-y-12 animate-fade-in">
                  {/* Top Branding Container (Enhanced) */}
                  <div className="glass-panel p-10 relative overflow-hidden border-l-4 border-l-emerald-500 shadow-2xl">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px]"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                      <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 shrink-0 transform hover:rotate-3 transition-transform duration-500 bg-white/5 flex items-center justify-center">
                        <img src="/faida_basket_logo.png" alt="FAIDA Basket Logo" className="w-full h-full object-cover scale-110" onError={(e) => e.target.style.display='none'} />
                      </div>

                      <div className="space-y-4 text-center md:text-left flex-1">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                          <Sparkles size={14} /> {greeting}, System {userRole}
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white uppercase leading-none">
                          FAIDA Digital <span className="text-emerald-400">Harvest Hub</span>
                        </h1>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-slate-400 text-xs font-medium tracking-wider">
                          <div className="flex items-center gap-2">
                            <Activity size={14} className="text-emerald-500" />
                            Live Intelligence Stream
                          </div>
                          <div className="flex items-center gap-2">
                            <Users size={14} className="text-blue-500" />
                            Multi-Tenant Architecture
                          </div>
                          <div className="flex items-center gap-2">
                            <ShieldCheck size={14} className="text-purple-500" />
                            Secure RBAC Verified
                          </div>
                        </div>
                      </div>
                      <div className="hidden xl:flex flex-col items-end text-right space-y-1">
                        <div className="text-2xl font-black font-mono text-white tracking-tight">
                          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ecosystem Health Row (Professional Stats) */}
                  <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="glass-panel p-6 border-t-2 border-t-emerald-500 bg-emerald-500/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Network Status</span>
                        <Activity size={16} className="text-emerald-400" />
                      </div>
                      <div className="text-3xl font-bold">98.4%</div>
                      <div className="text-xs text-slate-400 mt-1">Ecosystem connectivity optimal</div>
                    </div>
                    <div className="glass-panel p-6 border-t-2 border-t-blue-500 bg-blue-500/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Total Productivity</span>
                        <TrendingUp size={16} className="text-blue-400" />
                      </div>
                      <div className="text-3xl font-bold">12,450 T</div>
                      <div className="text-xs text-slate-400 mt-1">+12% vs previous quarter</div>
                    </div>
                    <div className="glass-panel p-6 border-t-2 border-t-purple-500 bg-purple-500/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-purple-400">Market Volatility</span>
                        <Wind size={16} className="text-purple-400" />
                      </div>
                      <div className="text-3xl font-bold text-amber-400">Medium</div>
                      <div className="text-xs text-slate-400 mt-1">Price stability index active</div>
                    </div>
                  </section>

                  {/* Portal Selection Hub */}
                  <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {roles
                      .filter(role => {
                        if (role.id === 'General') return false;
                        if (userRole === 'Admin') return true;
                        if (userRole === 'NGO') return role.id === 'NGO' || role.id === 'Farmer';
                        if (userRole === 'Farmer') return role.id === 'Farmer';
                        return role.id === userRole;
                      })
                      .map(role => (
                      <button 
                        key={role.id}
                        onClick={() => setActiveRole(role.id)}
                        className="group relative p-8 rounded-[2.5rem] text-left border border-slate-800 bg-slate-800/40 hover:bg-slate-800/80 hover:border-emerald-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex flex-col justify-between h-64"
                      >
                        <div className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform`}>
                          <role.icon size={32} />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-white">{role.name}</h3>
                          <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest pt-2">
                            Enter Portal <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </button>
                    ))}
                  </section>

                  {/* Market Overview for General View */}
                  <section className="glass-panel p-8 space-y-8">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold flex items-center gap-3">
                        <Activity className="text-emerald-400" /> Ecosystem Pulse
                      </h2>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">Live Sync</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {marketData.slice(0, 4).map(item => (
                        <div key={item.id} className="p-6 bg-slate-900/50 rounded-[2rem] border border-slate-800 flex flex-col gap-2">
                          <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{item.name}</span>
                          <div className="text-2xl font-bold font-mono">${item.price.toFixed(2)}</div>
                          <div className={`text-xs font-bold ${item.price >= item.history[item.history.length-2] ? 'text-emerald-400' : 'text-red-400'}`}>
                            {item.price >= item.history[item.history.length-2] ? '+' : '-'}{Math.abs((item.price - item.history[item.history.length-2])/item.history[item.history.length-2]*100).toFixed(1)}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              )}
          
          {(activeRole === 'Farmer') && (
            <div id="weather-section" className="grid grid-cols-1 lg:grid-cols-3 gap-6 scroll-mt-8">
              <section className="glass-panel p-6 lg:col-span-1 flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <CloudRain className="text-emerald-400" /> Weather Station
                </h2>
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <div className="text-5xl font-light">{weather.temp}°C</div>
                    <div className="text-slate-400 mt-1">{weather.condition}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-medium text-blue-300 flex items-center justify-end gap-1">
                      <Wind size={20} /> {weather.humidity}%
                    </div>
                  </div>
                </div>
                <div className={`p-4 rounded-lg border ${weather.condition === 'Stormy' ? 'bg-amber-500/10 border-amber-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Farmer Action Alert</div>
                  <div className={`font-medium ${weather.condition === 'Stormy' ? 'text-amber-400' : 'text-emerald-400'}`}>{weather.alert}</div>
                </div>
              </section>
              
              <section id="planning-section" className="glass-panel p-6 lg:col-span-2 relative overflow-hidden">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Calculator className="text-emerald-400" /> Smart Planning Tool
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <form onSubmit={handleCalculate} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Crop Type</label>
                      <select value={cropType} onChange={(e) => setCropType(e.target.value)} className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200">
                        {marketData.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1">Size (Hectares)</label>
                      <input type="number" value={landSize} onChange={(e) => setLandSize(e.target.value)} className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-slate-200" required />
                    </div>
                    <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 rounded-lg transition-colors">Forecast Profit</button>
                  </form>
                  <div className="flex flex-col justify-center">
                    {forecast ? (
                      <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500"></div>
                        <div className="text-sm text-slate-400">Net Profit</div>
                        <div className="text-3xl font-bold text-emerald-400 font-mono">${forecast.profit.toLocaleString()}</div>
                      </div>
                    ) : <div className="text-slate-500 text-sm text-center border border-dashed border-slate-700 p-8 rounded-xl">Enter parameters for forecast.</div>}
                  </div>
                </div>
              </section>

              {/* Farmer Guidelines (Moved here as requested) */}
              <section id="guidelines-section" className="glass-panel p-8 space-y-8 border-l-4 border-l-emerald-500 col-span-full">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Leaf size={28} className="text-emerald-400" /> Farmer Guidelines for High Yield
                  </h2>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full font-black uppercase tracking-widest border border-emerald-500/20">Expert Intelligence</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { title: 'Soil Vitality Management', desc: 'Perform soil tests every 6 months. Maintain PH levels between 6.0 and 7.5 for optimal nutrient absorption.', icon: Activity },
                    { title: 'Strategic Crop Rotation', desc: 'Implement a 3-year rotation cycle (Legumes → Grains → Roots) to naturally replenish soil Nitrogen.', icon: RefreshCcw },
                    { title: 'Precision Water Timing', desc: 'Irrigate during early morning (5 AM - 8 AM) to reduce fungal growth and minimize water loss to evaporation.', icon: CloudRain },
                    { title: 'Integrated Pest Control', desc: 'Monitor for early signs of Fall Armyworm. Use organic biological controls before resorting to chemical sprays.', icon: ShieldCheck }
                  ].map((g, i) => (
                    <div key={i} className="flex gap-6 p-6 bg-slate-950/40 rounded-[2rem] border border-slate-800/50 hover:border-emerald-500/30 transition-all group">
                      <div className="shrink-0 w-14 h-14 bg-emerald-500/5 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                        <g.icon size={28} />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-bold text-slate-100">{g.title}</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">{g.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Resource & Application Center */}
              <section id="resource-center" className="glass-panel p-8 space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
                <div className="flex items-center justify-between relative z-10">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Download size={28} className="text-emerald-400" /> Resource & Application Center
                  </h2>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-3 py-1 rounded-full font-bold uppercase border border-slate-700">Official Forms</span>
                </div>
                
                <div className="flex overflow-x-auto gap-6 pb-6 pt-2 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-10">
                  {[
                    { title: 'Farm Activity Record', type: 'XLSX / PDF', desc: 'Official template for logging daily inputs and harvest data.' },
                    { title: 'Grant Application Form', type: 'PDF', desc: 'Required documentation for regional agricultural subsidies.' },
                    { title: 'Access Code Request', type: 'DOCX', desc: 'Request for premium satellite weather intelligence access.' }
                  ].map((doc, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => handleDownload(doc.title, `FORM: ${doc.title}\nTYPE: ${doc.type}\nUSER: Digital Climate Response Partner`)}
                      className="min-w-[280px] md:min-w-[320px] shrink-0 snap-start p-6 bg-slate-900/60 rounded-[2rem] border border-slate-800 hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                          <Download size={24} />
                        </div>
                        <h3 className="font-bold text-white mb-1">{doc.title}</h3>
                        <span className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">{doc.type}</span>
                        <p className="text-xs text-slate-500 mt-3 leading-relaxed">{doc.desc}</p>
                      </div>
                      <div className="mt-6 flex items-center gap-2 text-white text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        Download Now <ChevronRight size={12} className="text-emerald-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              {/* Action: Apply for NGO Support */}
              <section className="glass-panel p-8 bg-emerald-600/10 border-emerald-500/20">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                      <Heart className="text-emerald-400" /> Professional NGO Support
                    </h2>
                    <p className="text-slate-400 text-sm">Apply for direct yield monitoring and equipment subsidies from our NGO partners.</p>
                  </div>
                  <button 
                    onClick={() => handleApply('Local Farmer', cropType)}
                    className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-emerald-600/30 active:scale-95"
                  >
                    Submit Support Application
                  </button>
                </div>
              </section>

              {/* Farming Tools (Moved from NGO to Farmer Portal) */}
              <section id="tools-section" className="glass-panel p-8 space-y-8 scroll-mt-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px]"></div>
                <div className="flex items-center justify-between relative z-10">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Wrench size={28} className="text-emerald-400" /> Equipment & Farming Tools
                  </h2>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full font-black uppercase tracking-widest border border-emerald-500/20">Request Access</span>
                </div>
                <div className="flex overflow-x-auto gap-6 pb-6 pt-2 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative z-10">
                  {FARMING_TOOLS.map((tool, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setSelectedTool(tool)}
                      className="min-w-[260px] md:min-w-[280px] shrink-0 snap-start p-6 rounded-[2rem] border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 hover:-translate-y-1 transition-all duration-300 text-left group relative overflow-hidden flex flex-col justify-between"
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Sparkles size={16} className="text-emerald-400" />
                      </div>
                      <div>
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-110 transition-transform">
                          <tool.icon size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-100">{tool.name}</h3>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">{tool.desc}</p>
                      </div>
                      <div className="mt-6 w-full py-2.5 rounded-xl border border-slate-800 hover:border-emerald-500/50 text-[10px] font-bold text-slate-500 group-hover:text-emerald-400 transition-all uppercase flex items-center justify-center gap-2">
                        View Details <ChevronRight size={12} />
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          )}

          {(activeRole === 'Seller') && (
            <section id="market-section" className="glass-panel p-6 relative overflow-hidden scroll-mt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Activity className="text-emerald-400" /> Market Ticker
                </h2>
                <button className="text-xs px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 text-slate-300 flex items-center gap-2">
                  <Download size={14} /> Export CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-700/50 text-sm">
                      <th className="pb-3">Product</th>
                      <th className="pb-3 text-right">Price</th>
                      <th className="pb-3 text-right">Trend</th>
                      <th className="pb-3 text-right">History</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {marketData.map(item => (
                      <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-4 font-medium">{item.name}</td>
                        <td className="py-4 text-right font-mono">${item.price.toFixed(2)}</td>
                        <td className="py-4 text-right">
                          <span className={`px-2 py-1 rounded text-xs ${item.price >= item.history[item.history.length-2] ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'}`}>
                            {item.price >= item.history[item.history.length-2] ? '+' : '-'}{Math.abs((item.price - item.history[item.history.length-2])/item.history[item.history.length-2]*100).toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-4 flex justify-end">{renderSparkline(item.history)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {(activeRole === 'Ministry' || activeRole === 'Farmer') && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 scroll-mt-8">
              <div className="glass-panel p-6 border-l-4 border-l-blue-500">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="text-blue-400" /> Regional Analytics
                </h2>
                <div className="space-y-4">
                  {[
                    { region: 'Northern District', yield: '88%', status: 'Stable' },
                    { region: 'Central Plains', yield: '94%', status: 'Optimal' },
                    { region: 'Southern Highlands', yield: '72%', status: 'Monitor' }
                  ].map((r, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                      <span className="text-sm font-medium">{r.region}</span>
                      <span className={`text-xs px-2 py-1 rounded ${r.status === 'Optimal' ? 'bg-emerald-500/20 text-emerald-400' : r.status === 'Monitor' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>{r.yield} - {r.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-panel p-6 border-l-4 border-l-purple-500">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <ShieldCheck className="text-purple-400" /> Policy Hub
                </h2>
                <div className="space-y-3">
                  <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                    <div className="text-[10px] font-bold text-emerald-400 uppercase mb-1 tracking-widest flex items-center gap-2">
                      <TrendingUp size={12} /> Tax Exemption
                    </div>
                    <p className="text-sm text-slate-300">0% VAT on essential farming inputs including high-yield seeds and organic fertilizers.</p>
                  </div>
                  <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                    <div className="text-[10px] font-bold text-blue-400 uppercase mb-1 tracking-widest flex items-center gap-2">
                      <RefreshCcw size={12} /> Export Rebate
                    </div>
                    <p className="text-sm text-slate-300">15% Tax rebate active for all cooperative-led produce exports to regional markets.</p>
                  </div>
                  <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                    <div className="text-[10px] font-bold text-purple-400 uppercase mb-1 tracking-widest flex items-center gap-2">
                      <ShieldCheck size={12} /> Climate Credit
                    </div>
                    <p className="text-sm text-slate-300">Reduced corporate tax rates for farms demonstrating 20%+ reduction in carbon footprint.</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {(activeRole === 'NGO') && (
            <div className="space-y-8">
              {/* NGO Application Monitoring List */}
              <section id="applications-list" className="glass-panel p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Users className="text-emerald-400" /> Application Management Area
                  </h2>
                  <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-400 rounded-xl text-xs font-bold border border-amber-500/20">
                    <Activity size={14} /> {applications.filter(a => a.status === 'Pending').length} Action Required
                  </div>
                </div>
                
                <div className="flex overflow-x-auto gap-6 pb-6 pt-2 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {applications.map(app => (
                    <div key={app.id} className="min-w-[300px] md:min-w-[340px] shrink-0 snap-start p-6 bg-slate-900/50 rounded-3xl border border-slate-800 hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                        <ShieldCheck size={40} className={app.status === 'Approved' ? 'text-emerald-400' : 'text-amber-400'} />
                      </div>
                      
                      <div className="relative z-10 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-bold text-white">{app.name}</h3>
                            <p className="text-xs text-slate-400">Crop Focus: {app.crop}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                            app.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                        
                        <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Yield Tracking</p>
                          <p className="font-mono font-bold text-emerald-400">{app.yield}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex gap-3 relative z-10">
                        {app.status === 'Pending' && (
                          <button onClick={() => {
                            setApplications(applications.map(a => a.id === app.id ? {...a, status: 'Approved', yield: '1.2t/ha (Est)'} : a));
                          }} className="flex-1 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 font-bold py-2 rounded-xl text-xs transition-all uppercase tracking-wider">
                            Approve
                          </button>
                        )}
                        <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2 rounded-xl text-xs transition-all border border-slate-700 uppercase tracking-wider">
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>





              <section id="ecosystem-section" className="glass-panel p-6 space-y-6 scroll-mt-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Users className="text-emerald-400" /> Ecosystem Insights
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: 'Farmers', desc: 'Direct beneficiaries.', icon: User, insight: 'Maize prices trending up.' },
                    { name: 'Sellers', desc: 'Market connectors.', icon: ShoppingCart, insight: 'Restock cocoa inventory.' },
                    { name: 'Ministry', desc: 'Policy makers.', icon: Building2, insight: 'New irrigation subsidies.' },
                    { name: 'NFI Org (NGO)', desc: 'Knowledge sharing.', icon: Heart, insight: 'Training starts tomorrow.' }
                  ].map((s, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/40 hover:bg-slate-800/60 transition-all cursor-default text-left">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-3 text-emerald-400">
                        <s.icon size={20} />
                      </div>
                      <h3 className="font-semibold text-slate-100">{s.name}</h3>
                      <p className="text-[11px] text-emerald-400 font-medium mt-1 uppercase tracking-wider">{s.insight}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 pt-4 border-t border-slate-800">
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold bg-slate-800 hover:bg-slate-700 rounded-xl transition-all">
                    <Download size={16} /> Download Report
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold bg-emerald-600 hover:bg-emerald-500 rounded-xl transition-all">
                    <Code size={16} /> Generate API Key
                  </button>
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  </div>

  {/* Tool Detail Modal */}
  {selectedTool && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel max-w-lg w-full p-8 space-y-6 relative border-t-4 border-t-emerald-500 shadow-2xl">
        <button onClick={() => setSelectedTool(null)} className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-full transition-all">
          <Layout size={20} />
        </button>
        <div className="flex items-center gap-4">
          <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-400">
            <selectedTool.icon size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{selectedTool.name}</h2>
            <p className="text-emerald-400 font-medium text-sm">{selectedTool.desc}</p>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Technical Specifications</h3>
          <p className="text-slate-300 leading-relaxed bg-slate-900/50 p-6 rounded-2xl border border-slate-800/50 text-sm">{selectedTool.details}</p>
        </div>
        <div className="flex gap-4 pt-4">
          <button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl transition-all uppercase text-[10px] tracking-widest">Request Lease</button>
          <button onClick={() => setSelectedTool(null)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 rounded-2xl transition-all uppercase text-[10px] tracking-widest border border-slate-700">Close</button>
        </div>
      </div>
    </div>
  )}
</div>
  );
}
