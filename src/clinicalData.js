// Clinical data generation with realistic patterns
const generateVitalSigns = () => {
  // Generate realistic vital signs with statistical distributions
  return {
    bloodPressure: `${Math.floor(Math.random() * 40) + 90}/${Math.floor(Math.random() * 20) + 50}`,
    heartRate: Math.floor(Math.random() * 30) + 60,
    temperature: (Math.random() * 2 + 98.6).toFixed(1),
    respiratoryRate: Math.floor(Math.random() * 10) + 12
  };
};

const generateLabResults = () => {
  // Generate realistic lab values with normal ranges
  const labs = [
    { name: 'Hemoglobin', value: Math.random() * 2 + 10, unit: 'g/dL', normalRange: '12-16' },
    { name: 'Creatinine', value: Math.random() * 2 + 0.5, unit: 'mg/dL', normalRange: '0.6-1.2' },
    { name: 'Glucose', value: Math.random() * 100 + 70, unit: 'mg/dL', normalRange: '70-100' },
    { name: 'Cholesterol', value: Math.random() * 100 + 150, unit: 'mg/dL', normalRange: '<200' },
    { name: 'ALT', value: Math.random() * 30 + 10, unit: 'U/L', normalRange: '7-56' }
  ];
  
  const labCount = Math.floor(Math.random() * 3) + 1;
  const results = [];
  
  for (let i = 0; i < labCount; i++) {
    const lab = labs[Math.floor(Math.random() * labs.length)];
    results.push({
      ...lab,
      result: lab.value.toFixed(1)
    });
  }
  
  return results;
};

const generateMedications = () => {
  // Generate realistic medication list with appropriate combinations
  const medications = [
    { name: 'Lisinopril', dosage: '10mg', frequency: 'daily' },
    { name: 'Metformin', dosage: '500mg', frequency: 'twice daily' },
    { name: 'Atorvastatin', dosage: '20mg', frequency: 'daily' },
    { name: 'Aspirin', dosage: '81mg', frequency: 'daily' },
    { name: 'Albuterol', dosage: '90mcg', frequency: 'as needed' },
    { name: 'Levothyroxine', dosage: '50mcg', frequency: 'daily' },
    { name: 'Omeprazole', dosage: '20mg', frequency: 'daily' }
  ];
  
  const medCount = Math.floor(Math.random() * 3) + 1;
  const meds = [];
  
  for (let i = 0; i < medCount; i++) {
    meds.push(medications[Math.floor(Math.random() * medications.length)]);
  }
  
  return meds;
};

const generateClinicalNotes = () => {
  // Generate realistic clinical notes with context
  const noteTemplates = [
    "Patient presents with stable chronic conditions. No acute changes noted.",
    "Follow-up visit for diabetes management. Medication adjustment recommended.",
    "Routine checkup shows normal vital signs and lab results.",
    "Patient reports improved symptoms after medication change.",
    "Emergency department visit for chest pain. ECG showed no acute changes.",
    "Patient admitted for pneumonia treatment with positive response to antibiotics.",
    "Annual physical examination reveals no significant findings.",
    "Patient presents with new onset of shortness of breath and fatigue.",
    "Post-operative recovery progressing well. Wound healing as expected.",
    "Patient reports significant improvement in sleep quality after treatment adjustment."
  ];
  
  return noteTemplates[Math.floor(Math.random() * noteTemplates.length)];
};

const generateDiagnosis = () => {
  // Generate realistic diagnosis with ICD-10 codes
  const diagnoses = [
    { code: 'I25.10', description: 'Atherosclerotic heart disease of native coronary artery without angina pectoris' },
    { code: 'E11.9', description: 'Type 2 diabetes mellitus without complications' },
    { code: 'I10', description: 'Essential hypertension' },
    { code: 'J44.1', description: 'Chronic obstructive pulmonary disease with acute exacerbation' },
    { code: 'N18.3', description: 'Chronic kidney disease, stage 3 moderate' },
    { code: 'Z86.01', description: 'Personal history of tobacco use' },
    { code: 'I25.9', description: 'Atherosclerotic heart disease, unspecified' }
  ];
  
  return diagnoses[Math.floor(Math.random() * diagnoses.length)];
};

module.exports = {
  generateVitalSigns,
  generateLabResults,
  generateMedications,
  generateClinicalNotes,
  generateDiagnosis
};