// HIPAA compliance validator for synthetic data
const validatePatientData = (patient) => {
  // Check that no real identifiers are present
  const checks = [];
  
  // Validate age range
  if (patient.age < 0 || patient.age > 150) {
    checks.push('Age out of valid range');
  }
  
  // Validate gender
  if (!['Male', 'Female', 'Other'].includes(patient.gender)) {
    checks.push('Invalid gender value');
  }
  
  // Validate address fields are not real
  if (patient.address.includes('123') || patient.city.includes('New York')) {
    checks.push('Real address data detected');
  }
  
  // Validate no real phone numbers or emails
  if (patient.phone.includes('555') || patient.email.includes('@example.com')) {
    checks.push('Real contact information detected');
  }
  
  // Validate diagnosis codes are valid ICD-10 format
  if (!patient.diagnosis.code.match(/^\w{3,5}(\.\d{1,2})?$/)) {
    checks.push('Invalid diagnosis code format');
  }
  
  return {
    isValid: checks.length === 0,
    errors: checks
  };
};

const validateLabResults = (labResults) => {
  const errors = [];
  
  for (const lab of labResults) {
    if (!lab.name || !lab.result || !lab.unit) {
      errors.push('Incomplete lab result data');
    }
    
    // Validate numeric values
    if (isNaN(parseFloat(lab.result))) {
      errors.push(`Invalid result value for ${lab.name}`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = { validatePatientData, validateLabResults };