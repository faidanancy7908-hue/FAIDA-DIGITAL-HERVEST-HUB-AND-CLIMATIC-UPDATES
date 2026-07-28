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
  { id: 'maize', name: 'Maize', price: 1100, weekAgoPrice: 1150, history: [1150, 1140, 1130, 1120, 1115, 1105, 1100] },
  { id: 'soybeans', name: 'Soybeans', price: 2400, weekAgoPrice: 2500, history: [2500, 2480, 2460, 2450, 2430, 2410, 2400] },
  { id: 'wheat', name: 'Wheat', price: 2100, weekAgoPrice: 2200, history: [2200, 2180, 2150, 2140, 2120, 2110, 2100] },
  { id: 'cocoa', name: 'Cocoa', price: 14500, weekAgoPrice: 14800, history: [14800, 14750, 14700, 14650, 14600, 14550, 14500] },
  { id: 'millet', name: 'Millet', price: 2600, weekAgoPrice: 2750, history: [2750, 2720, 2690, 2670, 2650, 2620, 2600] },
  { id: 'groundnuts', name: 'Groundnuts', price: 4000, weekAgoPrice: 4200, history: [4200, 4150, 4120, 4080, 4050, 4020, 4000] },
  { id: 'sorghum', name: 'Sorghum', price: 1400, weekAgoPrice: 1500, history: [1500, 1480, 1460, 1450, 1430, 1410, 1400] },
  { id: 'tobacco', name: 'Tobacco', price: 8000, weekAgoPrice: 8200, history: [8200, 8150, 8100, 8080, 8050, 8020, 8000] },
  { id: 'livestock', name: 'Livestock', price: 1500000, weekAgoPrice: 1550000, history: [1550000, 1540000, 1530000, 1520000, 1515000, 1510000, 1500000] }
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
