const express = require('express');
const axios = require('axios');
const { generateSyntheticPatient } = require('./src/dataGenerator');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Generate synthetic patient data
app.post('/api/generate', (req, res) => {
  try {
    const { count = 1, format = 'json' } = req.body;
    const patients = [];
    for (let i = 0; i < count; i++) {
      patients.push(generateSyntheticPatient());
    }
    if (format === 'csv') {
      const csv = require('csv-writer').createObjectCsvStringifier({
        header: Object.keys(patients[0]).map(key => ({ id: key, title: key }))
      });
      res.setHeader('Content-Type', 'text/csv');
      res.send(csv.stringifyRecords(patients));
    } else {
      res.json(patients);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Synthetic Patient Data Engine running on port ${PORT}`);
});