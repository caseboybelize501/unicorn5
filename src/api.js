const express = require('express');
const { generateSyntheticPatient, generateMultiplePatients } = require('./dataGenerator');
const { validateDataIntegrity, calculateDataQualityScore, generateDataReport } = require('./dataQuality');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Generate single synthetic patient
app.post('/api/patient', (req, res) => {
  try {
    const patient = generateSyntheticPatient();
    const validation = validateDataIntegrity(patient);
    
    res.json({
      patient,
      validation,
      qualityScore: calculateDataQualityScore(patient)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Generate multiple synthetic patients
app.post('/api/patients', (req, res) => {
  try {
    const { count = 10 } = req.body;
    const patients = generateMultiplePatients(count);
    
    const validationResults = patients.map(patient => ({
      id: patient.id,
      isValid: validateDataIntegrity(patient).isValid,
      qualityScore: calculateDataQualityScore(patient)
    }));
    
    const report = generateDataReport(patients);
    
    res.json({
      patients,
      report,
      validationResults
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Data quality endpoint
app.get('/api/quality', (req, res) => {
  try {
    const patients = generateMultiplePatients(100);
    const report = generateDataReport(patients);
    
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Synthetic Patient Data Engine API running on port ${PORT}`);
});