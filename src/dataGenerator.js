const faker = require('faker');

// Statistical distributions for realistic data generation
const generateAge = () => {
  // Normal distribution around 45 years with std dev of 20
  const age = Math.floor(Math.random() * 40) + 25;
  return Math.min(100, Math.max(18, age));
};

const generateGender = () => {
  // 50/50 male/female distribution
  return Math.random() > 0.5 ? 'Male' : 'Female';
};

const generateEthnicity = () => {
  const ethnicities = ['Caucasian', 'African American', 'Hispanic', 'Asian', 'Native American'];
  return ethnicities[Math.floor(Math.random() * ethnicities.length)];
};

const generateDiagnosis = () => {
  // Common conditions with realistic frequencies
  const diagnoses = [
    { code: 'I25.10', description: 'Atherosclerotic heart disease of native coronary artery without angina pectoris', frequency: 0.2 },
    { code: 'E11.9', description: 'Type 2 diabetes mellitus without complications', frequency: 0.15 },
    { code: 'I10', description: 'Essential hypertension', frequency: 0.18 },
    { code: 'J44.1', description: 'Chronic obstructive pulmonary disease with acute exacerbation', frequency: 0.12 },
    { code: 'N18.3', description: 'Chronic kidney disease, stage 3 moderate', frequency: 0.1 },
    { code: 'Z86.01', description: 'Personal history of tobacco use', frequency: 0.15 },
    { code: 'I25.9', description: 'Atherosclerotic heart disease, unspecified', frequency: 0.05 }
  ];
  
  const rand = Math.random();
  let cumulative = 0;
  for (const diag of diagnoses) {
    cumulative += diag.frequency;
    if (rand <= cumulative) return diag;
  }
  return diagnoses[0];
};

const generateLabResult = () => {
  // Generate realistic lab values with normal ranges
  const labs = [
    { name: 'Hemoglobin', value: Math.random() * 2 + 10, unit: 'g/dL', normalRange: '12-16' },
    { name: 'Creatinine', value: Math.random() * 2 + 0.5, unit: 'mg/dL', normalRange: '0.6-1.2' },
    { name: 'Glucose', value: Math.random() * 100 + 70, unit: 'mg/dL', normalRange: '70-100' },
    { name: 'Cholesterol', value: Math.random() * 100 + 150, unit: 'mg/dL', normalRange: '<200' },
    { name: 'ALT', value: Math.random() * 30 + 10, unit: 'U/L', normalRange: '7-56' }
  ];
  
  const lab = labs[Math.floor(Math.random() * labs.length)];
  return {
    ...lab,
    result: lab.value.toFixed(1)
  };
};

const generateVitalSigns = () => {
  // Generate realistic vital signs
  return {
    bloodPressure: `${Math.floor(Math.random() * 40) + 90}/${Math.floor(Math.random() * 20) + 50}`,
    heartRate: Math.floor(Math.random() * 30) + 60,
    temperature: (Math.random() * 2 + 98.6).toFixed(1),
    respiratoryRate: Math.floor(Math.random() * 10) + 12
  };
};

const generateMedication = () => {
  const medications = [
    { name: 'Lisinopril', dosage: '10mg', frequency: 'daily' },
    { name: 'Metformin', dosage: '500mg', frequency: 'twice daily' },
    { name: 'Atorvastatin', dosage: '20mg', frequency: 'daily' },
    { name: 'Aspirin', dosage: '81mg', frequency: 'daily' },
    { name: 'Albuterol', dosage: '90mcg', frequency: 'as needed' }
  ];
  return medications[Math.floor(Math.random() * medications.length)];
};

const generateClinicalNote = () => {
  const notes = [
    "Patient presents with stable chronic conditions. No acute changes noted.",
    "Follow-up visit for diabetes management. Medication adjustment recommended.",
    "Routine checkup shows normal vital signs and lab results.",
    "Patient reports improved symptoms after medication change.",
    "Emergency department visit for chest pain. ECG showed no acute changes."
  ];
  return notes[Math.floor(Math.random() * notes.length)];
};

const generateSyntheticPatient = () => {
  const patient = {
    id: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: generateAge(),
    gender: generateGender(),
    ethnicity: generateEthnicity(),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zipCode: faker.address.zipCode(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    diagnosis: generateDiagnosis(),
    vitalSigns: generateVitalSigns(),
    labResults: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, generateLabResult),
    medications: Array.from({ length: Math.floor(Math.random() * 2) + 1 }, generateMedication),
    clinicalNotes: generateClinicalNote(),
    lastVisitDate: faker.date.past().toISOString(),
    nextAppointment: faker.date.future().toISOString()
  };
  
  return patient;
};

module.exports = { generateSyntheticPatient };