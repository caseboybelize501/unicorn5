// Data quality assurance and validation
const validateDataIntegrity = (patient) => {
  // Comprehensive data validation
  const errors = [];
  
  // Validate age range
  if (patient.age < 0 || patient.age > 150) {
    errors.push('Age out of valid range');
  }
  
  // Validate gender
  if (!['Male', 'Female', 'Other'].includes(patient.gender)) {
    errors.push('Invalid gender value');
  }
  
  // Validate vital signs
  if (patient.vitalSigns) {
    const vs = patient.vitalSigns;
    if (vs.heartRate < 30 || vs.heartRate > 200) {
      errors.push('Heart rate out of normal range');
    }
    if (vs.temperature < 95 || vs.temperature > 106) {
      errors.push('Temperature out of normal range');
    }
    if (vs.respiratoryRate < 8 || vs.respiratoryRate > 30) {
      errors.push('Respiratory rate out of normal range');
    }
  }
  
  // Validate lab results
  if (patient.labResults) {
    for (const lab of patient.labResults) {
      if (isNaN(parseFloat(lab.result))) {
        errors.push(`Invalid result value for ${lab.name}`);
      }
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

const calculateDataQualityScore = (patient) => {
  // Calculate synthetic data quality score
  let score = 100;
  
  // Deduct points for missing data
  if (!patient.firstName || !patient.lastName) score -= 10;
  if (!patient.age) score -= 5;
  if (!patient.gender) score -= 5;
  if (!patient.diagnosis) score -= 10;
  
  // Deduct points for invalid data
  if (patient.age && (patient.age < 0 || patient.age > 150)) score -= 15;
  
  // Deduct points for incomplete vital signs
  if (patient.vitalSigns) {
    const vs = patient.vitalSigns;
    if (!vs.bloodPressure || !vs.heartRate || !vs.temperature || !vs.respiratoryRate) score -= 10;
  }
  
  // Deduct points for incomplete lab results
  if (patient.labResults && patient.labResults.length < 1) score -= 10;
  
  return Math.max(0, score);
};

const generateDataReport = (patients) => {
  // Generate comprehensive data quality report
  const report = {
    totalPatients: patients.length,
    averageQualityScore: patients.reduce((sum, p) => sum + calculateDataQualityScore(p), 0) / patients.length,
    validationErrors: [],
    distributionStats: {
      ageDistribution: {
        min: Math.min(...patients.map(p => p.age)),
        max: Math.max(...patients.map(p => p.age)),
        average: patients.reduce((sum, p) => sum + p.age, 0) / patients.length
      },
      genderDistribution: {
        male: patients.filter(p => p.gender === 'Male').length,
        female: patients.filter(p => p.gender === 'Female').length,
        other: patients.filter(p => p.gender === 'Other').length
      }
    }
  };
  
  // Collect all validation errors
  for (const patient of patients) {
    const validation = validateDataIntegrity(patient);
    if (!validation.isValid) {
      report.validationErrors.push({
        id: patient.id,
        errors: validation.errors
      });
    }
  }
  
  return report;
};

module.exports = {
  validateDataIntegrity,
  calculateDataQualityScore,
  generateDataReport
};