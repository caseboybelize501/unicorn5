// Statistical validity for synthetic data generation
const calculateNormalDistribution = (mean, stdDev) => {
  // Box-Muller transform for normal distribution
  let u = 0, v = 0;
  while(u === 0) u = Math.random();
  while(v === 0) v = Math.random();
  
  const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return mean + stdDev * z;
};

const generateAgeDistribution = (count) => {
  // Generate ages with normal distribution around 45 years
  const ages = [];
  for (let i = 0; i < count; i++) {
    ages.push(Math.round(calculateNormalDistribution(45, 20)));
  }
  return ages;
};

const generateGenderDistribution = (count) => {
  // Generate gender distribution with 50/50 split
  const genders = [];
  for (let i = 0; i < count; i++) {
    genders.push(Math.random() > 0.5 ? 'Male' : 'Female');
  }
  return genders;
};

const generateEthnicityDistribution = (count) => {
  // Generate ethnicity distribution based on US demographics
  const ethnicities = ['Caucasian', 'African American', 'Hispanic', 'Asian', 'Native American'];
  const weights = [0.75, 0.13, 0.18, 0.06, 0.02]; // Approximate US percentages
  
  const distribution = [];
  for (let i = 0; i < count; i++) {
    let rand = Math.random();
    let cumulative = 0;
    for (let j = 0; j < ethnicities.length; j++) {
      cumulative += weights[j];
      if (rand <= cumulative) {
        distribution.push(ethnicities[j]);
        break;
      }
    }
  }
  
  return distribution;
};

const generateClinicalConditionDistribution = (count) => {
  // Generate clinical conditions with realistic frequencies
  const conditions = [
    { code: 'I25.10', description: 'Atherosclerotic heart disease', frequency: 0.2 },
    { code: 'E11.9', description: 'Type 2 diabetes', frequency: 0.15 },
    { code: 'I10', description: 'Essential hypertension', frequency: 0.18 },
    { code: 'J44.1', description: 'COPD with exacerbation', frequency: 0.12 },
    { code: 'N18.3', description: 'CKD stage 3', frequency: 0.1 },
    { code: 'Z86.01', description: 'Tobacco use history', frequency: 0.15 },
    { code: 'I25.9', description: 'Atherosclerotic heart disease unspecified', frequency: 0.05 }
  ];
  
  const distribution = [];
  for (let i = 0; i < count; i++) {
    let rand = Math.random();
    let cumulative = 0;
    for (const condition of conditions) {
      cumulative += condition.frequency;
      if (rand <= cumulative) {
        distribution.push(condition);
        break;
      }
    }
  }
  
  return distribution;
};

module.exports = {
  calculateNormalDistribution,
  generateAgeDistribution,
  generateGenderDistribution,
  generateEthnicityDistribution,
  generateClinicalConditionDistribution
};