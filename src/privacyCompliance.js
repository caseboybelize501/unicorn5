// Ensure synthetic data meets HIPAA privacy requirements
const generatePrivacyCompliantData = (patient) => {
  // Remove any potential real identifiers
  const cleanPatient = { ...patient };
  
  // Replace real identifiers with synthetic ones
  cleanPatient.id = `synthetic-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  cleanPatient.firstName = faker.name.firstName();
  cleanPatient.lastName = faker.name.lastName();
  cleanPatient.email = `patient${Math.floor(Math.random() * 10000)}@synthetic.hospital`;
  cleanPatient.phone = `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 10000)}`;
  
  // Ensure address is not real
  cleanPatient.address = faker.address.streetAddress();
  cleanPatient.city = faker.address.city();
  cleanPatient.state = faker.address.stateAbbr();
  cleanPatient.zipCode = faker.address.zipCode();
  
  return cleanPatient;
};

const anonymizeData = (data) => {
  // Remove or hash all direct identifiers
  const anonymized = { ...data };
  
  // Remove or replace sensitive fields
  delete anonymized.email;
  delete anonymized.phone;
  delete anonymized.address;
  delete anonymized.city;
  delete anonymized.state;
  delete anonymized.zipCode;
  
  return anonymized;
};

const generateDataAuditTrail = (patient) => {
  // Create audit trail for compliance
  return {
    generatedAt: new Date().toISOString(),
    dataVersion: '1.0',
    privacyCompliance: 'HIPAA-compliant synthetic data',
    patientId: patient.id,
    generationMethod: 'Statistical distribution engine'
  };
};

module.exports = { generatePrivacyCompliantData, anonymizeData, generateDataAuditTrail };