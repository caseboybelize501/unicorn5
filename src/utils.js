// Utility functions for data generation and processing
const generateMultiplePatients = (count) => {
  const patients = [];
  for (let i = 0; i < count; i++) {
    patients.push(generateSyntheticPatient());
  }
  return patients;
};

const exportToCSV = (patients, filename = 'synthetic_patients.csv') => {
  const csvWriter = require('csv-writer').createObjectCsvStringifier({
    header: Object.keys(patients[0]).map(key => ({ id: key, title: key }))
  });
  
  return csvWriter.stringifyRecords(patients);
};

const exportToJSON = (patients, filename = 'synthetic_patients.json') => {
  return JSON.stringify(patients, null, 2);
};

const generateRandomString = (length = 10) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const generateUUID = () => {
  // Simple UUID generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

module.exports = {
  generateMultiplePatients,
  exportToCSV,
  exportToJSON,
  generateRandomString,
  generateUUID
};