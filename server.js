import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

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
  { id: 'maize', name: 'Maize', price: 1200, weekAgoPrice: 1150, history: [1150, 1160, 1175, 1180, 1195, 1205, 1200] },
  { id: 'soybeans', name: 'Soybeans', price: 3100, weekAgoPrice: 2950, history: [2950, 2980, 3020, 3050, 3080, 3110, 3100] },
  { id: 'wheat', name: 'Wheat', price: 2250, weekAgoPrice: 2300, history: [2300, 2290, 2280, 2260, 2250, 2240, 2250] },
  { id: 'cocoa', name: 'Cocoa', price: 15200, weekAgoPrice: 14800, history: [14800, 14900, 15000, 15100, 15150, 15250, 15200] },
  { id: 'millet', name: 'Millet', price: 2850, weekAgoPrice: 2750, history: [2750, 2770, 2790, 2810, 2830, 2840, 2850] },
  { id: 'groundnuts', name: 'Groundnuts', price: 4600, weekAgoPrice: 4500, history: [4500, 4520, 4540, 4560, 4580, 4590, 4600] },
  { id: 'sorghum', name: 'Sorghum', price: 1550, weekAgoPrice: 1500, history: [1500, 1510, 1520, 1530, 1540, 1545, 1550] },
  { id: 'tobacco', name: 'Tobacco', price: 8200, weekAgoPrice: 8000, history: [8000, 8050, 8100, 8150, 8180, 8220, 8200] },
  { id: 'livestock', name: 'Livestock', price: 1550000, weekAgoPrice: 1580000, history: [1580000, 1575000, 1570000, 1565000, 1560000, 1555000, 1550000] }
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
