import React, { useState, useEffect } from 'react';
import { 
  CloudRain, 
  Sun,
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
  X,
  Phone,
  MessageCircle,
  Wrench,
  ChevronRight,
  Code,
  Camera,
  UploadCloud,
  CheckCircle2,
  MapPin,
  Cloud,
  Droplets,
  Thermometer,
  Menu,
  Info,
  Package
} from 'lucide-react';


// 7-day price history: index 0 = Mon (1 week ago), index 6 = today's opening price
// weekAgoPrice is the Mon price kept as a permanent reference for % change display
const INITIAL_MARKET_DATA = [
  { id: 'maize',      name: 'Maize',      price: 240.50,   weekAgoPrice: 231.00,  history: [231.00, 233.50, 236.00, 238.20, 239.80, 241.10, 240.50] },
  { id: 'soybeans',  name: 'Soybeans',   price: 512.20,   weekAgoPrice: 498.00,  history: [498.00, 501.50, 505.00, 507.80, 510.40, 513.60, 512.20] },
  { id: 'wheat',     name: 'Wheat',      price: 315.75,   weekAgoPrice: 323.00,  history: [323.00, 321.50, 319.80, 318.20, 317.00, 315.90, 315.75] },
  { id: 'cocoa',     name: 'Cocoa',      price: 2850.00,  weekAgoPrice: 2790.00, history: [2790.00, 2805.00, 2815.00, 2825.00, 2835.00, 2845.00, 2850.00] },
  { id: 'millet',    name: 'Millet',     price: 185.30,   weekAgoPrice: 178.00,  history: [178.00, 179.80, 181.50, 182.90, 184.20, 185.00, 185.30] },
  { id: 'groundnuts',name: 'Groundnuts', price: 420.00,   weekAgoPrice: 412.00,  history: [412.00, 413.80, 415.50, 417.20, 418.60, 419.50, 420.00] },
  { id: 'sorghum',   name: 'Sorghum',    price: 195.50,   weekAgoPrice: 190.00,  history: [190.00, 191.20, 192.50, 193.80, 194.60, 195.20, 195.50] },
  { id: 'tobacco',   name: 'Tobacco',    price: 3250.00,  weekAgoPrice: 3195.00, history: [3195.00, 3205.00, 3215.00, 3225.00, 3235.00, 3244.00, 3250.00] },
  { id: 'livestock', name: 'Livestock',  price: 1540.00,  weekAgoPrice: 1558.00, history: [1558.00, 1554.00, 1550.00, 1547.00, 1544.00, 1541.00, 1540.00] }
];

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'];

const REGIONAL_DATA = [
  { region: 'Northern', yield: '88%', status: 'Stable', query: 'Northern Region, Uganda', districts: ['Gulu', 'Lira', 'Kitgum', 'Pader'] },
  { region: 'Central', yield: '94%', status: 'Optimal', query: 'Central Region, Uganda', districts: ['Wakiso', 'Mukono', 'Masaka', 'Luwero'] },
  { region: 'Southern', yield: '72%', status: 'Monitor', query: 'South Western Region, Uganda', districts: ['Mbarara', 'Kabale', 'Ntungamo', 'Rukungiri'] },
  { region: 'Westnile', yield: '65%', status: 'Critical', query: 'West Nile, Uganda', districts: ['Arua', 'Nebbi', 'Koboko', 'Zombo'] },
  { region: 'Western', yield: '90%', status: 'Optimal', query: 'Western Region, Uganda', districts: ['Hoima', 'Kasese', 'Fort Portal', 'Masindi'] },
];

const WEATHER_CONDITIONS = [
  { condition: 'Clear', temp: 28, humidity: 45, alert: 'Optimal Spraying Conditions' },
  { condition: 'Stormy', temp: 22, humidity: 85, alert: 'High Wind: Delay Spraying' },
  { condition: 'Cloudy', temp: 25, humidity: 60, alert: 'Monitor Soil Moisture' }
];

const PORTAL_URL = 'https://faidanancy7908-hue.github.io/FAIDA-DIGITAL-HERVEST-HUB-AND-CLIMATIC-UPDATES/';

const AUDIO_LANGUAGES = [
  { id: 'en-US', name: 'English' },
  { id: 'sw-KE', name: 'Kiswahili' },
  { id: 'lg-UG', name: 'Luganda' }
];

const TRANSLATIONS = {
  'en-US': {
    intro: "FAIDA IoT Audio Diagnostic Report initiated.",
    ph: "Current soil pH is {ph}.",
    phLow: "Alert: Soil pH is below normal. The soil is too acidic. We recommend applying agricultural lime immediately.",
    cloudCoverage: "Cloud cover is at {cloudCoverage} percent.",
    moisture: "Soil moisture is at {moisture} percent.",
    moistureAlert: "Alert: Soil moisture is low. Please irrigate your field.",
    ambient: "Immediate climate temperature is {temp} degrees Celsius with {humidity} percent humidity.",
    nutrientsAlert: "Alert: The soil is lacking vital nutrients, specifically: {nutrients}. Please apply N P K fertilizer.",
    temp: "Current soil temperature is {temp} degrees Celsius.",
    drought: "Critical Weather Alert: There is no significant rainfall expected. Please deploy irrigation and mulch fields immediately.",
    goodRain: "Weather focus for the next week shows favorable rainfall.",
    outro: "End of diagnostic report. Please take immediate action."
  },
  'sw-KE': {
    intro: "Ripoti ya uchunguzi wa sauti ya FAIDA IoT imeanzishwa.",
    ph: "Kiwango cha pH cha udongo ni {ph}.",
    phLow: "Tahadhari: Kiwango cha pH kiko chini. Udongo una asidi nyingi. Tunapendekeza kuweka chokaa ya kilimo mara moja.",
    cloudCoverage: "Kiwango cha mawingu ni asilimia {cloudCoverage}.",
    moisture: "Unyevu wa udongo ni asilimia {moisture}.",
    moistureAlert: "Tahadhari: Unyevu wa udongo uko chini. Tafadhali mwagilia shamba lako.",
    ambient: "Hali ya hewa hapa ni nyuzi {temp} Selsiasi na unyevu wa asilimia {humidity}.",
    nutrientsAlert: "Tahadhari: Udongo unakosa virutubisho muhimu, hasa: {nutrients}. Tafadhali weka mbolea ya N P K.",
    temp: "Joto la udongo kwa sasa ni nyuzi {temp} Selsiasi.",
    drought: "Tahadhari ya Hali ya Hewa: Hakuna mvua ya kutosha inayotarajiwa. Tafadhali tumia umwagiliaji na uweke matandazo mara moja.",
    goodRain: "Hali ya hewa kwa wiki ijayo inaonyesha mvua nzuri.",
    outro: "Mwisho wa ripoti. Tafadhali chukua hatua mara moja."
  },
  'lg-UG': {
    intro: "Alipoota ya FAIDA IoT etandise.",
    ph: "P-H y'ettaka eri {ph}.",
    phLow: "Okulabula: P-H y'ettaka eri wansi nnyo. Kozesa ekigimusa eky'eddasi amangu ddala.",
    cloudCoverage: "Ebire biri ku bitundu {cloudCoverage} ku kikumi.",
    moisture: "Obunnyogovu bw'ettaka buli ku bitundu {moisture} ku kikumi.",
    moistureAlert: "Okulabula: Ettaka liry'ekalu nnyo. Ffukirira ettaka amangu.",
    ambient: "Ebbugumu ly'omwoyo liri diguli {temp} era n'obunnyogovu buli {humidity} ku kikumi.",
    nutrientsAlert: "Okulabula: Ettaka libulamu ebiriisa ebyetaagisa: {nutrients}. Teekamu ebigimusa bya N P K.",
    temp: "Ebbugumu ly'ettaka liri diguli {temp}.",
    drought: "Okulabula ku budde: Tewali nkuba ya maanyi esuubirwa. Ffukirira era obikke ettaka amangu ddala.",
    goodRain: "Obudde bwa wiiki ejja bulaga enkuba ennungi.",
    outro: "Alipoota ekomye wano. Tukusaba okoleko amangu."
  }
};

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
  
  const [iotData, setIotData] = useState({
    ph: 5.2,
    nitrogen: 'Low',
    phosphorus: 'Optimal',
    potassium: 'Low',
    temp: 29.5,
    moisture: 35,
    cloudCoverage: 65,
    ambientTemp: 28.2,
    ambientHumidity: 62
  });

  const [selectedSensorForSimulation, setSelectedSensorForSimulation] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [weeklyForecast] = useState([
    { day: 'Mon', condition: 'Sunny', temp: 32, rainProb: 0 },
    { day: 'Tue', condition: 'Sunny', temp: 33, rainProb: 0 },
    { day: 'Wed', condition: 'Clear', temp: 31, rainProb: 5 },
    { day: 'Thu', condition: 'Sunny', temp: 34, rainProb: 0 },
    { day: 'Fri', condition: 'Sunny', temp: 35, rainProb: 0 },
    { day: 'Sat', condition: 'Clear', temp: 33, rainProb: 0 },
    { day: 'Sun', condition: 'Sunny', temp: 32, rainProb: 0 },
  ]);

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioLanguage, setAudioLanguage] = useState('en-US');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageAnalysis, setImageAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeRegion, setActiveRegion] = useState(REGIONAL_DATA[0].region);
  const [activeMapQuery, setActiveMapQuery] = useState(REGIONAL_DATA[0].query);

  // Farming Tools Request Form state
  const [selectedToolItems, setSelectedToolItems] = useState([]);
  const [toolReqName, setToolReqName] = useState('');
  const [toolReqDistrict, setToolReqDistrict] = useState('');
  const [toolReqParish, setToolReqParish] = useState('');
  const [toolReqCrop, setToolReqCrop] = useState('');
  const [toolReqRecipient, setToolReqRecipient] = useState('NGO');
  const [equipmentRequests, setEquipmentRequests] = useState([
    { id: 'eq1', name: 'James Okello', district: 'Gulu', parish: 'Bardege', crop: 'Cassava', tools: ['Tractor Services', 'Improved Seeds'], recipient: 'Ministry', status: 'Pending' }
  ]);
  const [toolRequestSubmitted, setToolRequestSubmitted] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      setIsAnalyzing(true);
      setImageAnalysis(null);
      
      // Simulate AI IoT Analysis delay
      setTimeout(() => {
        setIsAnalyzing(false);
        setImageAnalysis({
          issue: "Mild Nitrogen Deficiency Detected",
          confidence: "94%",
          solution: "Apply 50kg of Urea per hectare within the next 48 hours. Ensure application is done during evening hours to prevent evaporation.",
          status: "warning"
        });
      }, 3000);
    }
  };

  const [applications, setApplications] = useState([
    { id: 'app1', name: 'John Kisekka', crop: 'Maize', region: 'Central', phone: '+256772000111', status: 'Approved', yield: '4.2t/ha', recipient: 'NGO' },
    { id: 'app2', name: 'Achan Florence', crop: 'Sorghum', region: 'Northern', phone: '+256784222333', status: 'Pending', yield: '1.8t/ha (Est)', recipient: 'Ministry' }
  ]);

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [lastSubmittedApp, setLastSubmittedApp] = useState(null);

  // Farmers Details
  const [formSurname, setFormSurname] = useState('');
  const [formOtherNames, setFormOtherNames] = useState('');
  const [formAge, setFormAge] = useState('');
  const [formRecipient, setFormRecipient] = useState('NGO');
  const [formPhone, setFormPhone] = useState('');
  const [formNationality, setFormNationality] = useState('Ugandan');
  const [formRegion, setFormRegion] = useState('Northern');
  const [formDistrict, setFormDistrict] = useState('');
  const [formSubcounty, setFormSubcounty] = useState('');
  const [formParish, setFormParish] = useState('');

  // Crops Details
  const [formCrop, setFormCrop] = useState('maize');
  const [formCropName, setFormCropName] = useState('Maize');
  const [formHectares, setFormHectares] = useState('');
  const [formMonthOfPlanting, setFormMonthOfPlanting] = useState('March');
  const [formCropSpecies, setFormCropSpecies] = useState('');

  // Detailed Download Content Generators (No Blank Spaces, Fully Formatted Notes)
  const generateFarmActivityContent = () => {
    return `========================================================================
FAIDA DIGITAL CLIMATE RESPONSE - DAILY FARM ACTIVITY RECORD LOG
========================================================================
Date Generated: ${new Date().toLocaleString()}
Ecosystem Focus: Precision Climate Diagnostics & Subsidized Agriculture
------------------------------------------------------------------------

[DAILY ACTIVITY TRACKING PROTOCOL]
Use this template to record daily activities for audit review by NGO and Ministry.

DATE       | CROP TYPE | ACTIVITIES UNDERTAKEN | IRRIGATION (L) | FERTILIZER USED
-----------+-----------+-----------------------+----------------+----------------
           |           |                       |                |                
-----------+-----------+-----------------------+----------------+----------------
           |           |                       |                |                
-----------+-----------+-----------------------+----------------+----------------
           |           |                       |                |                

[DIAGNOSTIC BENCHMARKS]
- Optimal Soil Moisture: 60% - 75%
- Normal Soil pH Range:  6.0 - 7.2 (Acidic soil requires agricultural lime)
- Critical Temp Limit:   32°C (Apply mulching if soil temp rises above 28°C)

------------------------------------------------------------------------
End of Document. Please print or save for submission to your NGO Field Officer.
========================================================================`;
  };

  const generateGrantFormContent = () => {
    return `========================================================================
FAIDA DIGITAL CLIMATE RESPONSE - SUBSIDY GRANT APPLICATION FORM
========================================================================
Document ID: FAIDA-SUB-2026-NFI
Verification Status: Official Climate Action Initiative
------------------------------------------------------------------------

INSTRUCTIONS:
Please fill out the details below and submit to your local NGO Initiative 
Resource Center for direct funding, equipment lease, or input subsidy support.

1. APPLICANT INFORMATION
   - Full Name: __________________________________________________
   - Mobile Number (USSD Linked): ________________________________
   - National ID Number: _________________________________________
   - Cooperative Affiliation: _____________________________________

2. AGRICULTURAL HOLDINGS
   - Farm Location (District/Region): ____________________________
   - Total Farm Size (Hectares): _______ Hectares
   - Primary Crops Grown: _________________________________________

3: REQUESTED ASSISTANCE (Check all that apply)
   [ ] Smart Irrigation Kit (Solar-powered drip system)
   [ ] Organic N P K Fertilizer (100kg batch)
   [ ] Soil Sensor Pro Diagnostic Kit
   [ ] Pest Spraying Drone Access
   [ ] Financial Yield Grant Support
   [ ] Soil pH Sensor Probe
   [ ] Cloud Coverage Sensor Hub
   [ ] Soil Moisture Probe
   [ ] Micro-Climate Sensor Stationrt

------------------------------------------------------------------------
Signature of Applicant: _____________________    Date: ____/____/2026
========================================================================`;
  };

  const generateAccessCodeContent = () => {
    return `========================================================================
FAIDA DIGITAL CLIMATE RESPONSE - USSD ACCESS CODE AUTHORIZATION REQUEST
========================================================================
Protocol Reference: USSD-GATEWAY-AUTH-UG
Associated Carriers: MTN (*672*001#) | Airtel (*818*3*5#)
------------------------------------------------------------------------

By requesting this USSD access code, you authorize the linking of your local
telecommunications profile to the FAIDA Global Spatial Intelligence maps. 

APPLICANT MOBILE REGISTER:
- Mobile Network Operator: [ ] MTN Uganda  [ ] Airtel Uganda
- Registered Mobile Number: +256 ____________________
- District of Operation: ____________________

REGULATORY NOTICE:
- Access codes are encrypted and mapped directly to your primary SIM card.
- Offline submissions automatically sync with regional NGO databases.
- The service is entirely toll-free for all verified cooperative members.

Please sign and submit this to your local NGO or Ministry representative.
========================================================================`;
  };

  const generateEcosystemReportContent = () => {
    let report = `========================================================================
FAIDA DIGITAL CLIMATE RESPONSE - SYSTEM ECOSYSTEM HEALTH STATUS REPORT
========================================================================
Timestamp: ${new Date().toLocaleString()}
System Uptime: 99.99%
Current Edge Node Concurrency: 50,000,000+ Concurrent Capacity Active
------------------------------------------------------------------------

1. LIVE SYSTEM WEATHER REPORT
   - Core Station Temp: ${weather.temp}°C
   - Atmospheric Condition: ${weather.condition}
   - Humidity Level: ${weather.humidity}%
   - Action Alert Level: ${weather.alert}

2. MARKET TICKER DATA SUMMARY
------------------------------------------------------------------------
PRODUCT     | LIVE PRICE ($) | VOLATILITY SHIFT
------------+----------------+------------------------------------------\n`;

    marketData.forEach(item => {
      const weeklyPct = ((item.price - item.weekAgoPrice) / item.weekAgoPrice * 100);
      const shift = weeklyPct >= 0 ? '+' : '';
      report += `${item.name.padEnd(11)} | $${item.price.toFixed(2).padEnd(13)} | 7d ago $${item.weekAgoPrice.toFixed(2).padEnd(10)} | ${shift}${weeklyPct.toFixed(2)}% (weekly)\n`;
    });

    report += `------------------------------------------------------------------------
MARKET SUMMARY: Prices reflect live intra-day values. Weekly reference anchored to Monday open.
3. ACTIVE NGO BENEFICIARY APPLICATIONS LOG
------------------------------------------------------------------------\n`;

    applications.forEach((app, idx) => {
      report += `${idx + 1}. [${app.status.toUpperCase()}] Beneficiary: ${app.name} | Crop: ${app.crop} | Region: ${app.region || 'N/A'} | Phone: ${app.phone || 'N/A'} | Yield: ${app.yield}\n`;
    });

    report += `------------------------------------------------------------------------
End of Ecosystem Audit Report. Distributed globally via Edge CDN Networks.
========================================================================`;
    return report;
  };

  const generateMarketCsv = () => {
    let csv = "Product ID,Product Name,Today's Price ($),1-Week Ago Price ($),Weekly Change ($),Weekly Change (%)\n";
    marketData.forEach(item => {
      const weeklyChange = (item.price - item.weekAgoPrice).toFixed(2);
      const weeklyPct = ((item.price - item.weekAgoPrice) / item.weekAgoPrice * 100).toFixed(2);
      csv += `"${item.id}","${item.name}",${item.price.toFixed(2)},${item.weekAgoPrice.toFixed(2)},${weeklyChange >= 0 ? '+' : ''}${weeklyChange},${weeklyPct >= 0 ? '+' : ''}${weeklyPct}%\n`;
    });
    return csv;
  };

  const handleApply = (name, crop) => {
    if (name) {
      const parts = name.split(' ');
      if (parts.length > 1) {
        setFormSurname(parts[0]);
        setFormOtherNames(parts.slice(1).join(' '));
      } else {
        setFormSurname(name);
        setFormOtherNames('');
      }
    } else {
      setFormSurname('');
      setFormOtherNames('');
    }
    setFormCrop(crop || 'maize');
    const cropObj = marketData.find(m => m.id === crop);
    setFormCropName(cropObj ? cropObj.name : 'Maize');
    setShowApplyModal(true);
  };

  const generateCompletedApplicationContent = (app) => {
    if (!app) return "";
    return `========================================================================
FAIDA DIGITAL CLIMATE RESPONSE - DETAILED BENEFICIARY APPLICATION FORM
========================================================================
Submission Code: FAIDA-SUB-${app.id.slice(-6).toUpperCase()}
Initiative: East Africa Precision Agricultural Sub-Grants
Status: PENDING REVIEW (NGO FIELD STAKEHOLDER ROUTING)
------------------------------------------------------------------------

Dear Cooperative Partner,
Your digital climate response application has been logged into the global edge
registry with 50M+ concurrent user edge support. Please find your completed 
dossier below. Save or print this note to present to your regional field officer.

1. FARMERS PERSONAL DETAILS:
   - Surname                   : ${app.surname || 'N/A'}
   - Other Names               : ${app.otherNames || 'N/A'}
   - Age of Applicant          : ${app.age || 'N/A'} years old
   - Nationality               : ${app.nationality || 'Ugandan'}
   - Telephone Number          : ${app.phone || 'N/A'}
   
2. AGRICULTURAL GEOGRAPHY:
   - Regional Office Hub       : ${app.region === 'Westnile' ? 'Westnile' : `${app.region} Region`}
   - District of Operation     : ${app.district || 'N/A'}
   - Subcounty                 : ${app.subcounty || 'N/A'}
   - Parish                    : ${app.parish || 'N/A'}

3. CROP SPECIFICATIONS & LAND HOLDINGS:
   - Primary Crop Focus        : ${app.cropName || app.crop || 'Maize'}
   - Land Size (Hectares)      : ${app.hectares || '0'} Hectares
   - Target Month of Planting  : ${app.monthOfPlanting || 'N/A'}
   - Crop Species / Cultivar   : ${app.cropSpecies || 'Local Breed'}

4. INTEGRATED IOT SOIL ANALYSIS:
   - Soil pH Sensor Reading    : ${iotData.ph} (${iotData.ph < 6.0 ? 'Acidic - Below Normal' : iotData.ph > 7.5 ? 'Alkaline - Above Normal' : 'Optimal'})
   - Cloud Reading Sensor      : ${iotData.cloudCoverage}% (${iotData.cloudCoverage > 70 ? 'Overcast - Rain Probable' : iotData.cloudCoverage < 20 ? 'Clear Sky' : 'Partly Cloudy'})
   - Soil Moisture Sensor      : ${iotData.moisture}% (${iotData.moisture < 50 ? 'Dry - Low Moisture' : iotData.moisture > 80 ? 'Soggy - High Moisture' : 'Optimal'})
   - Immediate Climate Sensor  : ${iotData.ambientTemp}°C / ${iotData.ambientHumidity}% RH (${iotData.ambientTemp > 32 ? 'Hot' : iotData.ambientTemp < 18 ? 'Cold' : 'Optimal'})
   - Dynamic Yield Monitoring  : Active (Targeting optimal yield escalation)

5. CARRIER OFFLINE GATEWAY USSD LINKAGE:
   - MTN Uganda network        : Dial *672*001# (Toll-Free)
   - Airtel Uganda network     : Dial *818*3*5# (Toll-Free)
   - Support WhatsApp Line     : +256 763 927 908

6. REGULATORY GUIDELINES & NOTE FOR FIELD AUDITING:
   - Soil Vitality: Test every 6 months. Maintain pH between 6.0 and 7.5.
   - Strategic Rotation: Legumes -> Grains -> Roots to naturally replenish soil Nitrogen.
   - Precision Water: Irrigation recommended daily between 5 AM and 8 AM.
   - Yield Boost: Organic N P K fertilizer input subsidy requested.

------------------------------------------------------------------------
OFFICIAL STAMP:
FAIDA DIGITAL CLIMATE RESPONSE HUB - KAMPALA HEADQUARTERS
Authorized Signature: Faida Nancy (General Director)
========================================================================`;
  };

  const submitApplication = (e) => {
    e.preventDefault();
    if (!formSurname || !formPhone || !formDistrict || !formSubcounty || !formParish) {
      alert("Please fill out all required location and contact fields.");
      return;
    }
    const newApp = {
      id: `app${Date.now()}`,
      surname: formSurname,
      otherNames: formOtherNames,
      age: formAge,
      phone: formPhone,
      nationality: formNationality,
      region: formRegion,
      district: formDistrict,
      subcounty: formSubcounty,
      parish: formParish,
      crop: formCrop.charAt(0).toUpperCase() + formCrop.slice(1),
      cropName: formCropName,
      hectares: formHectares,
      monthOfPlanting: formMonthOfPlanting,
      cropSpecies: formCropSpecies,
      name: `${formSurname} ${formOtherNames}`.trim(),
      status: 'Pending',
      yield: 'Tracking...',
      recipient: formRecipient
    };
    setApplications([newApp, ...applications]);
    setShowApplyModal(false);
    setLastSubmittedApp(newApp);
    setFormSurname('');
    setFormOtherNames('');
    setFormAge('');
    setFormPhone('');
    setFormDistrict('');
    setFormSubcounty('');
    setFormParish('');
    setFormHectares('');
    setFormCropSpecies('');
  };

  const handleDownload = (filename, content = "FAIDA Digital Climate Response - Official Data Export", extension = "txt") => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: extension === 'csv' ? 'text/csv' : 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${filename.replace(/\s+/g, '_').toLowerCase()}.${extension}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const playIoTAudioReport = () => {
    if (!('speechSynthesis' in window)) {
      alert("TTS Speech Synthesis is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();
    setIsPlayingAudio(true);

    const translations = TRANSLATIONS[audioLanguage] || TRANSLATIONS['en-US'];

    let introText = translations.intro;
    
    // Soil pH
    let phText = translations.ph.replace('{ph}', iotData.ph);
    let phAlertText = iotData.ph < 6.0 ? translations.phLow : '';
    
    // Soil Moisture
    let moistureText = (translations.moisture || "Soil moisture is at {moisture} percent.").replace('{moisture}', iotData.moisture);
    let moistureAlertText = iotData.moisture < 50 ? (translations.moistureAlert || "Alert: Soil moisture is low.") : '';
    
    // Cloud Coverage
    let cloudText = (translations.cloudCoverage || "Cloud cover is at {cloudCoverage} percent.").replace('{cloudCoverage}', iotData.cloudCoverage);
    
    // Ambient Climate
    let ambientText = (translations.ambient || "Immediate climate temperature is {temp} degrees Celsius with {humidity} percent humidity.")
      .replace('{temp}', iotData.ambientTemp)
      .replace('{humidity}', iotData.ambientHumidity);
    
    let nutrientsText = translations.nutrientsAlert.replace('{nutrients}', 'Nitrogen and Potassium');
    let tempText = translations.temp.replace('{temp}', iotData.temp);
    let weatherAlertText = weather.condition === 'Stormy' ? translations.drought : translations.goodRain;
    let outroText = translations.outro;

    const fullReportText = [
      introText,
      phText,
      phAlertText,
      moistureText,
      moistureAlertText,
      cloudText,
      ambientText,
      nutrientsText,
      tempText,
      weatherAlertText,
      outroText
    ].filter(Boolean).join(" ");

    const utterance = new SpeechSynthesisUtterance(fullReportText);
    utterance.lang = audioLanguage;
    
    utterance.rate = 0.85;
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => 
      v.lang.startsWith(audioLanguage.split('-')[0]) && 
      (v.name.includes('Samantha') || 
       v.name.includes('Hazel') || 
       v.name.includes('Zira') || 
       v.name.includes('Google') || 
       v.name.includes('Siri') || 
       v.name.includes('female') || 
       v.name.includes('Female'))
    );

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onend = () => {
      setIsPlayingAudio(false);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
    };

    window.speechSynthesis.speak(utterance);
  };


  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    const interval = setInterval(() => {
      setIsUpdating(true);
      setMarketData(current => current.map(item => {
        // Realistic intra-day micro-fluctuation: ±0.8% max per tick
        const fluctuation = (Math.random() * 1.6 - 0.8) / 100;
        const newPrice = parseFloat((item.price * (1 + fluctuation)).toFixed(2));
        // Rolling 7-day window: drop oldest entry, push today's latest price
        const newHistory = [...item.history.slice(-6), newPrice];
        return { ...item, price: newPrice, history: newHistory };
      }));
      setIotData(prev => ({
        ...prev,
        ph: parseFloat(Math.max(4.0, Math.min(9.0, prev.ph + (Math.random() * 0.08 - 0.04))).toFixed(2)),
        moisture: Math.max(10, Math.min(100, Math.round(prev.moisture + (Math.random() * 4 - 2)))),
        cloudCoverage: Math.max(0, Math.min(100, Math.round(prev.cloudCoverage + (Math.random() * 6 - 3)))),
        ambientTemp: parseFloat(Math.max(15.0, Math.min(40.0, prev.ambientTemp + (Math.random() * 0.4 - 0.2))).toFixed(1)),
        ambientHumidity: Math.max(20, Math.min(100, Math.round(prev.ambientHumidity + (Math.random() * 4 - 2))))
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

  const renderSparkline = (history, compact = false) => {
    const data = history.slice(-7);
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    if (compact) {
      // Simple compact version for small tiles
      return (
        <div className="flex items-end h-8 gap-0.5">
          {data.map((val, i) => {
            const heightPercent = ((val - min) / range) * 100;
            const isUp = val >= (data[i - 1] ?? val);
            return (
              <div
                key={i}
                title={`${WEEK_DAYS[i]}: $${val.toFixed(2)}`}
                className={`flex-1 rounded-t-sm transition-all duration-500 ${isUp ? 'bg-emerald-500' : 'bg-red-400'}`}
                style={{ height: `${Math.max(15, heightPercent)}%` }}
              />
            );
          })}
        </div>
      );
    }
    // Full sparkline with day labels for the market table
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-end h-10 gap-0.5">
          {data.map((val, i) => {
            const heightPercent = ((val - min) / range) * 100;
            const isUp = val >= (data[i - 1] ?? val);
            const isToday = i === data.length - 1;
            return (
              <div
                key={i}
                title={`${WEEK_DAYS[i]}: $${val.toFixed(2)}`}
                className={`flex-1 rounded-t-sm transition-all duration-500 ${
                  isToday
                    ? isUp ? 'bg-emerald-400 ring-1 ring-emerald-300' : 'bg-red-400 ring-1 ring-red-300'
                    : isUp ? 'bg-emerald-600/60' : 'bg-red-500/50'
                }`}
                style={{ height: `${Math.max(15, heightPercent)}%` }}
              />
            );
          })}
        </div>
        <div className="flex gap-0.5">
          {WEEK_DAYS.slice(0, data.length).map((d, i) => (
            <div key={i} className={`flex-1 text-center text-[7px] font-bold ${
              i === data.length - 1 ? 'text-emerald-400' : 'text-slate-600'
            }`}>{d}</div>
          ))}
        </div>
      </div>
    );
  };

  const roles = [
    { id: 'General', name: 'Overview', icon: Layout },
    { id: 'Farmer', name: 'Farmer Portal', icon: User },
    { id: 'Seller', name: 'Market Seller', icon: ShoppingCart },
    { id: 'Ministry', name: 'Ministry/Policy', icon: Building2 },
    { id: 'NGO', name: 'NGO/Initiative', icon: Heart },
    { id: 'Resource', name: 'Resource & Application', icon: Download },
    { id: 'About', name: 'About Us', icon: Info, isQuickLink: true },
    { id: 'Contact', name: 'Contact', icon: Phone, isQuickLink: true },
    { id: 'Items', name: 'Items', icon: Package, isQuickLink: true },
    { id: 'Rules', name: 'Rules', icon: ShieldCheck, isQuickLink: true }
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
    <div className="min-h-screen bg-slate-900 text-slate-50 p-4 md:p-8 pb-24 md:pb-32 font-sans selection:bg-emerald-500/30">
      <div className="max-w-7xl mx-auto">
        {/* Global Top Header */}
        <header className="w-full flex items-center justify-between p-4 bg-slate-950/60 backdrop-blur-md rounded-2xl border border-slate-800/80 mb-4 sticky top-4 z-[80]">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsDrawerOpen(true)}
              className="text-slate-400 hover:text-white transition-colors p-1 bg-slate-900/50 rounded-lg border border-slate-800">
              <Menu size={20} />
            </button>
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-amber-500/30">
              <img src="farm_logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-black uppercase tracking-wider text-white">FAIDA Climate Response</span>
          </div>
          
          {/* Welcome Page Navigation Bar */}
          {activeRole === 'General' && (
            <nav className="hidden md:flex items-center gap-2">
              <button onClick={() => setActiveRole('About')} className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-full transition-all">About Us</button>
              <button onClick={() => setActiveRole('Contact')} className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300 hover:text-blue-400 hover:bg-blue-500/10 rounded-full transition-all">Contact</button>
              <button onClick={() => setActiveRole('Items')} className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300 hover:text-amber-400 hover:bg-amber-500/10 rounded-full transition-all">Items</button>
              <button onClick={() => setActiveRole('Rules')} className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all">Rules</button>
            </nav>
          )}

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
            <Sparkles size={11} className="animate-pulse" /> Live Monitoring
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Sidebar: Stakeholders & Visuals (Consolidated Welcoming Board) */}
          {activeRole === 'General' && (
            <aside className="w-full max-w-2xl mx-auto space-y-8">
            
            {/* Persistent Branding Welcoming Board Container */}
            <div className="glass-panel p-6 flex flex-col items-center text-center gap-6 border-l-4 border-l-amber-500 relative overflow-hidden shadow-2xl group">
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="absolute top-4 left-4 z-30 text-slate-400 hover:text-white transition-colors p-2 bg-slate-900/50 rounded-lg border border-slate-700/50 backdrop-blur-sm">
                <Menu size={20} />
              </button>
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px]"></div>
              
              {/* Spinning Logo Area - Centered on Top */}
              <div className="w-48 h-48 rounded-[1rem] overflow-hidden shadow-[0_0_20px_rgba(245,158,11,0.15)] border border-amber-500/30 relative bg-slate-900/50">
                <img 
                  src="farm_logo.png" 
                  alt="Digital Climate Hub" 
                  className="absolute inset-0 w-full h-full object-cover object-bottom"
                />
                <div className="absolute top-2 left-2 z-20 bg-amber-500/20 p-1.5 rounded-full backdrop-blur-md border border-amber-500/30 shadow-[0_0_5px_rgba(245,158,11,0.4)]">
                  <Sun className="text-amber-400 w-5 h-5 animate-[spin_10s_linear_infinite]" />
                </div>
                <div className="absolute top-2 right-2 z-20 bg-blue-500/20 p-1.5 rounded-full backdrop-blur-md border border-blue-500/30 shadow-[0_0_5px_rgba(59,130,246,0.4)]">
                  <CloudRain className="text-blue-400 w-5 h-5 animate-bounce" />
                </div>
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.85)_100%)]"></div>
                  <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-[spin_60s_linear_infinite]" style={{ transformOrigin: 'center' }}>
                    <path id="textCircleTopSidebar" d="M 20,100 A 80,80 0 0,1 180,100" fill="none" />
                    <path id="textCircleBottomSidebar" d="M 180,100 A 80,80 0 0,1 20,100" fill="none" />
                    <text fill="#fbbf24" className="text-[8px] font-black uppercase tracking-[0.1em]" textAnchor="middle">
                      <textPath href="#textCircleTopSidebar" startOffset="50%">
                        FAIDA DIGITAL CLIMATE RESPONSE
                      </textPath>
                    </text>
                    <text fill="#fbbf24" className="text-[9px] font-black uppercase tracking-[0.15em] opacity-90" textAnchor="middle">
                      <textPath href="#textCircleBottomSidebar" startOffset="50%">
                        Agriculture & Climate Resolution
                      </textPath>
                    </text>
                    <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(251, 191, 36, 0.5)" strokeWidth="1" strokeDasharray="4 4" />
                  </svg>
                </div>
              </div>

              {/* Branding Text & Metadata - Centered Below Logo */}
              <div className="space-y-3 w-full">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest mx-auto">
                  <Sparkles size={11} /> {greeting}, System {userRole}
                </div>
                
                <div>
                  <h1 className="text-xl font-black tracking-tight text-white uppercase leading-none">
                    FAIDA DIGITAL CLIMATE <br/>
                    <span className="text-amber-400 text-base md:text-lg">RESPONSE</span>
                  </h1>
                  <div className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wider mt-1.5">
                    Agriculture & Climate Resolution
                  </div>
                </div>

                {/* Switch User Role Selector (Demo) */}
                <div className="w-full mt-2 p-2 bg-slate-900/60 rounded-xl border border-slate-800 flex flex-col gap-1 text-left relative z-10">
                  <label className="text-[8px] font-black uppercase tracking-widest text-slate-500 block pl-1">Switch User Role (Demo)</label>
                  <select 
                    value={userRole} 
                    onChange={(e) => {
                      setUserRole(e.target.value);
                      setActiveRole('General');
                    }}
                    className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-[11px] font-bold text-emerald-400 cursor-pointer"
                  >
                    <option value="Admin" className="bg-slate-900 text-emerald-400 font-bold">System Administrator</option>
                    <option value="NGO" className="bg-slate-900 text-emerald-400 font-bold">NGO Representative</option>
                    <option value="Farmer" className="bg-slate-900 text-emerald-400 font-bold">Partner Farmer</option>
                    <option value="Seller" className="bg-slate-900 text-emerald-400 font-bold">Market Seller</option>
                    <option value="Ministry" className="bg-slate-900 text-emerald-400 font-bold">Ministry Official</option>
                  </select>
                </div>
              </div>

              {/* Added Images */}
              <div className="w-full flex flex-col gap-4 mt-6">
                <h2 className="text-lg text-emerald-400 font-bold tracking-widest uppercase text-center">Harvest Visuals</h2>
                <img src="/FAIDA-DIGITAL-HERVEST-HUB-AND-CLIMATIC-UPDATES/bountiful_harvest.png" alt="Bountiful Harvest" className="w-3/4 max-w-sm mx-auto rounded-2xl shadow-xl border-2 border-emerald-500/20" />
                <img src="/FAIDA-DIGITAL-HERVEST-HUB-AND-CLIMATIC-UPDATES/farmer_garden_yield.png" alt="Farmer Garden Yield" className="w-3/4 max-w-sm mx-auto rounded-2xl shadow-xl border-2 border-emerald-500/20" />
              </div>

              {/* Divider Line */}
              <div className="w-full border-t border-slate-800 my-1"></div>

              {/* Contact Area */}
              <div className="w-full space-y-4">
                <div className="text-left">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Contact & Mobile Entry</span>
                </div>
                <div className="flex flex-col gap-2">
                  <a href="tel:*672*001#" className="flex items-center justify-between bg-slate-900/60 px-3.5 py-2.5 rounded-xl border border-slate-800 hover:border-amber-500/50 transition-all">
                    <span className="text-[9px] font-black uppercase text-amber-500">MTN Line</span>
                    <span className="text-sm font-black font-mono text-white tracking-widest">*672*001#</span>
                  </a>
                  <a href="tel:*818*3*5#" className="flex items-center justify-between bg-slate-900/60 px-3.5 py-2.5 rounded-xl border border-slate-800 hover:border-red-500/50 transition-all">
                    <span className="text-[9px] font-black uppercase text-red-500">Airtel Line</span>
                    <span className="text-sm font-black font-mono text-white tracking-widest">*818*3*5#</span>
                  </a>
                </div>
                
                {/* QR Code and link */}
                <div className="flex flex-col items-center gap-3 pt-2">
                  <a 
                    href={PORTAL_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-white p-1.5 transform hover:scale-105 transition-transform duration-500 block relative"
                  >
                    <img 
                      src={`https://quickchart.io/qr?text=${encodeURIComponent(PORTAL_URL)}&size=160&centerImageUrl=https://img.icons8.com/color/48/000000/sprout.png`} 
                      alt="FAIDA Portal QR Code" 
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </a>
                  <a 
                    href={PORTAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest hover:bg-blue-500/20 transition-all"
                  >
                    <Layout size={12} /> Public Portal Access
                  </a>
                </div>

                {/* Direct Helpline Support Contacts */}
                {(activeRole === 'NGO' || activeRole === 'Farmer') && (
                  <div className="flex flex-col gap-2 pt-3 border-t border-slate-800 mt-2">
                    <a 
                      href="https://wa.me/256763927908" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 py-2 rounded-xl text-xs font-bold transition-all"
                    >
                      <MessageCircle size={14} /> WhatsApp support
                    </a>
                    <a 
                      href="tel:0763927908" 
                      className="flex items-center justify-center gap-2 w-full bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 py-2 rounded-xl text-xs font-bold transition-all"
                    >
                      <Phone size={14} /> Call: 0763927908
                    </a>
                  </div>
                )}
              </div>
            </div>
          </aside>
          )}

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

  {/* Subsidized Support Apply Modal */}
  {showApplyModal && (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="glass-panel max-w-lg w-full p-8 space-y-6 relative border-t-4 border-t-emerald-500 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto custom-scrollbar pr-2">
        <button 
          type="button"
          onClick={() => setShowApplyModal(false)} 
          className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-full transition-all"
        >
          <X size={20} />
        </button>
        
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
            <Heart className="text-emerald-400 animate-pulse" size={24} /> NGO Support Form
          </h2>
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-wider">FAIDA DIGITAL CLIMATE RESPONSE SUB-GRANTS</p>
        </div>

        <form onSubmit={submitApplication} className="space-y-6">
          {/* SECTION 1: FARMER'S PERSONAL DETAILS */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-black text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-1.5 flex items-center gap-2">
              <User size={14} /> 1. Farmers Personal Details
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Surname</label>
                <input 
                  type="text" 
                  value={formSurname} 
                  onChange={(e) => setFormSurname(e.target.value)} 
                  placeholder="e.g. Kisekka"
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-emerald-500/80 transition-colors"
                  required 
                />
              </div>
              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Other Name(s)</label>
                <input 
                  type="text" 
                  value={formOtherNames} 
                  onChange={(e) => setFormOtherNames(e.target.value)} 
                  placeholder="e.g. John"
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-emerald-500/80 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Age</label>
                <input 
                  type="number" 
                  value={formAge} 
                  onChange={(e) => setFormAge(e.target.value)} 
                  placeholder="e.g. 34"
                  min="18"
                  max="120"
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-emerald-500/80 transition-colors"
                  required 
                />
              </div>
              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Nationality</label>
                <input 
                  type="text" 
                  value={formNationality} 
                  onChange={(e) => setFormNationality(e.target.value)} 
                  placeholder="e.g. Ugandan"
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-emerald-500/80 transition-colors"
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Telephone Number (USSD Linked)</label>
              <input 
                type="tel" 
                value={formPhone} 
                onChange={(e) => setFormPhone(e.target.value)} 
                placeholder="e.g. +256 772 000 111"
                className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-emerald-500/80 transition-colors"
                required 
              />
            </div>
          </div>

          {/* SECTION 2: AGRICULTURAL GEOGRAPHY */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-black text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-1.5 flex items-center gap-2">
              <MapPin size={14} /> 2. Agricultural Geography
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Regional Office</label>
                <select 
                  value={formRegion} 
                  onChange={(e) => setFormRegion(e.target.value)} 
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-3 py-3 text-slate-100 text-sm focus:outline-none focus:border-emerald-500/80 transition-colors"
                >
                  <option value="Northern">Northern Region</option>
                  <option value="Central">Central Region</option>
                  <option value="Westnile">Westnile</option>
                  <option value="Western">Western Region</option>
                  <option value="Southern">Southern Region</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">District</label>
                <input 
                  type="text" 
                  value={formDistrict} 
                  onChange={(e) => setFormDistrict(e.target.value)} 
                  placeholder="e.g. Lira"
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-emerald-500/80 transition-colors"
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Subcounty</label>
                <input 
                  type="text" 
                  value={formSubcounty} 
                  onChange={(e) => setFormSubcounty(e.target.value)} 
                  placeholder="e.g. Adekokwok"
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-emerald-500/80 transition-colors"
                  required 
                />
              </div>
              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Parish</label>
                <input 
                  type="text" 
                  value={formParish} 
                  onChange={(e) => setFormParish(e.target.value)} 
                  placeholder="e.g. Boroboro"
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-emerald-500/80 transition-colors"
                  required 
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: CROP & LAND DETAILS */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-black text-emerald-400 uppercase tracking-widest border-b border-slate-800 pb-1.5 flex items-center gap-2">
              <Leaf size={14} /> 3. Crop & Land Details
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Crop Name</label>
                <select 
                  value={formCrop} 
                  onChange={(e) => {
                    const cVal = e.target.value;
                    setFormCrop(cVal);
                    const cropObj = marketData.find(m => m.id === cVal);
                    setFormCropName(cropObj ? cropObj.name : 'Maize');
                  }} 
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-3 py-3 text-slate-100 text-sm focus:outline-none focus:border-emerald-500/80 transition-colors"
                >
                  <option value="maize">Maize</option>
                  <option value="cocoa">Cocoa</option>
                  <option value="sorghum">Sorghum</option>
                  <option value="millet">Millet</option>
                  <option value="groundnuts">Groundnuts</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Hectares</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={formHectares} 
                  onChange={(e) => setFormHectares(e.target.value)} 
                  placeholder="e.g. 2.5"
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-emerald-500/80 transition-colors"
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Month of Planting</label>
                <select 
                  value={formMonthOfPlanting} 
                  onChange={(e) => setFormMonthOfPlanting(e.target.value)} 
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-3 py-3 text-slate-100 text-sm focus:outline-none focus:border-emerald-500/80 transition-colors"
                >
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Crop Species / Variety</label>
                <input 
                  type="text" 
                  value={formCropSpecies} 
                  onChange={(e) => setFormCropSpecies(e.target.value)} 
                  placeholder="e.g. Longe 10H Hybrid"
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-emerald-500/80 transition-colors"
                  required 
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button 
              type="submit" 
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl transition-all uppercase text-[10px] tracking-widest shadow-lg shadow-emerald-600/25 active:scale-[0.98]"
            >
              Submit Application
            </button>
            <button 
              type="button"
              onClick={() => setShowApplyModal(false)} 
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 rounded-2xl transition-all uppercase text-[10px] tracking-widest border border-slate-700 active:scale-[0.98]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )}

  {/* Beneficiary Application Success Modal */}
  {lastSubmittedApp && (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="glass-panel max-w-lg w-full p-8 space-y-6 relative border-t-4 border-t-emerald-500 shadow-2xl animate-scale-in">
        <button 
          onClick={() => setLastSubmittedApp(null)} 
          className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-full transition-all"
        >
          <X size={20} />
        </button>
        
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-400 border border-emerald-500/20 mb-4 animate-bounce">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Application Logged!</h2>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider">FAIDA DIGITAL CLIMATE RESPONSE OFFICIAL REGISTRY</p>
        </div>

        <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-4 max-h-[220px] overflow-y-auto custom-scrollbar">
          <div className="text-[11px] font-mono text-emerald-400 whitespace-pre-wrap leading-relaxed text-left">
            {generateCompletedApplicationContent(lastSubmittedApp)}
          </div>
        </div>

        <div className="p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 text-center">
          <p className="text-xs text-slate-400 font-medium leading-relaxed">
            Every field has been pre-filled with notes and specific guidelines. Click the button below to download your official completed form immediately.
          </p>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => handleDownload(`completed_form_${lastSubmittedApp.name}`, generateCompletedApplicationContent(lastSubmittedApp))}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl transition-all uppercase text-[10px] tracking-widest shadow-lg shadow-emerald-600/25 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Download size={14} /> Download Form Docket
          </button>
          <button 
            onClick={() => setLastSubmittedApp(null)} 
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-6 py-4 rounded-2xl transition-all uppercase text-[10px] tracking-widest border border-slate-700 active:scale-[0.98]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )}

  {/* Drawer Menu for Stakeholders */}
  <div className={`fixed inset-0 z-[150] flex transition-all duration-300 ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
    <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)}></div>
    <div className={`relative w-72 h-full bg-slate-900 border-r border-slate-800 shadow-2xl flex flex-col transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-amber-500/30">
            <img src="farm_logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-white">Stakeholders</span>
        </div>
        <button 
          onClick={() => setIsDrawerOpen(false)}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto space-y-2 custom-scrollbar">
        {roles.map(role => {
          const isActive = activeRole === role.id;
          return (
            <button
              key={role.id}
              onClick={() => {
                setActiveRole(role.id);
                setIsDrawerOpen(false);
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
              }`}
            >
              <div className={`p-2 rounded-lg ${isActive ? 'bg-emerald-500/20' : 'bg-slate-800/50'}`}>
                <role.icon size={18} className={isActive ? 'animate-pulse' : ''} />
              </div>
              <span className="text-sm font-bold tracking-wide text-left flex-1">
                {role.name}
              </span>
              <ChevronRight size={16} className={`opacity-50 ${isActive ? 'text-emerald-400 opacity-100' : ''}`} />
            </button>
          );
        })}
      </div>
    </div>
  </div>

  {/* Fixed Bottom Navigation Footer for Stakeholders Selection */}
  <footer className="fixed bottom-0 left-0 right-0 z-[120] bg-slate-950/85 backdrop-blur-md border-t border-slate-800/80 shadow-[0_-8px_30px_rgba(0,0,0,0.5)] px-4 py-2.5 md:py-3.5 animate-fade-in">
    <div className="max-w-5xl mx-auto flex justify-around items-center gap-1 overflow-x-auto custom-scrollbar">
      {roles
        .filter(role => {
          if (role.isQuickLink) return false;
          if (userRole === 'Admin') return true;
          if (userRole === 'NGO') return role.id === 'General' || role.id === 'NGO' || role.id === 'Farmer' || role.id === 'Resource';
          if (userRole === 'Farmer') return role.id === 'General' || role.id === 'Farmer' || role.id === 'Seller' || role.id === 'Resource';
          return role.id === 'General' || role.id === userRole || role.id === 'Resource';
        })
        .map(role => {
          const isActive = activeRole === role.id;
          return (
            <button
              key={role.id}
              onClick={() => setActiveRole(role.id)}
              className={`flex flex-col items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-300 min-w-[72px] shrink-0 group ${
                isActive 
                  ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              <role.icon size={16} className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
              <span className="text-[9px] font-black uppercase tracking-wider whitespace-nowrap">
                {role.id === 'General' ? 'Overview' : role.id === 'Resource' ? 'Resources' : role.name.replace(' Portal', '').replace('Initiative', '').replace('Ministry/Policy', 'Ministry').replace('NGO/', '')}
              </span>
            </button>
          );
        })}
    </div>
  </footer>


</div>
  );
}
