import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initial simulated data state
let iotData = {
  ph: 5.2,
  nitrogen: 'Low',
  potassium: 'Optimal',
  phosphorus: 'Low',
  moisture: 42,
  cloudCoverage: 15,
  ambientTemp: 28,
  ambientHumidity: 45
};

const marketData = [
  { id: 'maize', name: 'Maize', price: 240.50, weekAgoPrice: 231.00, history: [231.00, 233.50, 236.00, 238.20, 239.80, 241.10, 240.50] },
  { id: 'soybeans', name: 'Soybeans', price: 512.20, weekAgoPrice: 498.00, history: [498.00, 501.50, 505.00, 507.80, 510.40, 513.60, 512.20] },
  { id: 'wheat', name: 'Wheat', price: 315.75, weekAgoPrice: 323.00, history: [323.00, 321.50, 319.80, 318.20, 317.00, 315.90, 315.75] },
  { id: 'cocoa', name: 'Cocoa', price: 2850.00, weekAgoPrice: 2790.00, history: [2790.00, 2805.00, 2815.00, 2825.00, 2835.00, 2845.00, 2850.00] },
  { id: 'millet', name: 'Millet', price: 185.30, weekAgoPrice: 178.00, history: [178.00, 179.80, 181.50, 182.90, 184.20, 185.00, 185.30] },
  { id: 'groundnuts', name: 'Groundnuts', price: 420.00, weekAgoPrice: 412.00, history: [412.00, 413.80, 415.50, 417.20, 418.60, 419.50, 420.00] },
  { id: 'sorghum', name: 'Sorghum', price: 195.50, weekAgoPrice: 190.00, history: [190.00, 191.20, 192.50, 193.80, 194.60, 195.20, 195.50] },
  { id: 'tobacco', name: 'Tobacco', price: 3250.00, weekAgoPrice: 3195.00, history: [3195.00, 3205.00, 3215.00, 3225.00, 3235.00, 3244.00, 3250.00] },
  { id: 'livestock', name: 'Livestock', price: 1540.00, weekAgoPrice: 1558.00, history: [1558.00, 1554.00, 1550.00, 1547.00, 1544.00, 1541.00, 1540.00] }
];

const weatherConditions = [
  { condition: 'Clear', temp: 28, humidity: 45, alert: 'Optimal Spraying Conditions' },
  { condition: 'Stormy', temp: 22, humidity: 85, alert: 'High Wind: Delay Spraying' },
  { condition: 'Cloudy', temp: 25, humidity: 60, alert: 'Monitor Soil Moisture' }
];

// Continuous IoT Simulation
setInterval(() => {
  iotData = {
    ...iotData,
    ph: parseFloat(Math.max(4.0, Math.min(9.0, iotData.ph + (Math.random() * 0.08 - 0.04))).toFixed(2)),
    moisture: Math.max(10, Math.min(95, Math.floor(iotData.moisture + (Math.random() * 4 - 2)))),
    ambientTemp: parseFloat(Math.max(15, Math.min(40, iotData.ambientTemp + (Math.random() * 0.4 - 0.2))).toFixed(1)),
    cloudCoverage: Math.max(0, Math.min(100, Math.floor(iotData.cloudCoverage + (Math.random() * 10 - 5)))),
    ambientHumidity: Math.max(20, Math.min(90, Math.floor(iotData.ambientHumidity + (Math.random() * 2 - 1))))
  };
}, 3000);

// API Endpoints

app.get('/api/market', (req, res) => {
  res.json({ data: marketData });
});

app.get('/api/iot', (req, res) => {
  res.json({ data: iotData });
});

app.get('/api/weather', (req, res) => {
  // Just return the first condition for now, can be randomized if needed
  res.json({ data: weatherConditions[0] });
});

app.post('/api/magoba/chat', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const lowerInput = message.toLowerCase();
  let response = "I'm analyzing your request. For personalized advice, please contact the nearest NGO field officer.";
  
  if (lowerInput.includes('pest') || lowerInput.includes('insect') || lowerInput.includes('disease')) {
    response = "For pest control, I recommend using our Pest Drone for precision spraying. Also, ensure you are practicing crop rotation and using organic pesticides where possible.";
  } else if (lowerInput.includes('weather') || lowerInput.includes('rain') || lowerInput.includes('climate')) {
    response = "Based on the current forecast, there's good rainfall expected this week. Wait to irrigate until you check the soil moisture sensors.";
  } else if (lowerInput.includes('fertilizer') || lowerInput.includes('soil') || lowerInput.includes('nutrient')) {
    response = "Your IoT soil sensors indicate low Nitrogen. I suggest applying an NPK fertilizer blend rich in Nitrogen to boost leaf growth.";
  } else if (lowerInput.includes('yield') || lowerInput.includes('harvest') || lowerInput.includes('crop')) {
    response = "To maximize yield, keep your soil pH balanced and ensure your Smart Irrigation Kit is fully operational during dry spells.";
  }

  // Add a small delay to simulate processing
  setTimeout(() => {
    res.json({ response });
  }, 1000);
});

app.post('/api/requests', (req, res) => {
  const { name, district, parish, crop, tools } = req.body;
  console.log(`New equipment request received from ${name}`);
  res.json({ success: true, message: 'Request submitted successfully' });
});

app.listen(PORT, () => {
  console.log(`FAIDA API Server running on http://localhost:${PORT}`);
});
