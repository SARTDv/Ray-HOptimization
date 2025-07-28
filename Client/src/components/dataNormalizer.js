const NORMALIZATION_VALUES = {
  age: {
    ranges: [
      { min: 18, max: 24, value: -0.95197 },
      { min: 25, max: 34, value: -0.07854 },
      { min: 35, max: 44, value: 0.49788 },
      { min: 45, max: 54, value: 1.09449 },
      { min: 55, max: 64, value: 1.82213 },
      { min: 65, max: Infinity, value: 2.59171 }
    ]
  },
  gender: {
    "Femenino": 0.48246,
    "Masculino": -0.48246
  },
  education: {
    "Deja la escuela antes de los 16": -2.43591, 
    "Deja la escuela despues de los 16": -1.73790, 
    "Deja la escuela a los 17": -1.43719, 
    "Deja la escuela a los 18": -1.22751, 
    "Entra a universidad sin certificado ni titulo": -0.61113,
    "diploma profesional": -0.05921,
    "Título universitario": 0.45468,
    "Máster": 1.16365,
    "Doctorado": 1.98437
  },
  country: {
    "Australia": -0.09765,
    "Canada": 0.24923,
    "Nueva Zelanda": -0.46841,
    "Otros": -0.28519,
    "República de Irlanda": 0.21128,
    "Reino Unido": 0.96082,
    "EE.UU": -0.57009
  },
  ethnicity: {
    "Asiático": -0.50212,
    "Negro": -1.10702,
    "Mestizo negro/asiático": 1.90725,
    "Mestizo blanco/asiático": 0.12600,
    "Mestizo blanco/negro": -0.22166,
    "Otros": 0.11440,
    "Blanco": -0.31685
  },
  nscore: {
    // ... (todos los valores de Nscore)
    12: -3.46436, 13: -3.15735, 14: -2.75696, 15: -2.52197,
    16: -2.42317, 17: -2.34360, 18: -2.21844, 19: -2.05048,
    20: -1.86962, 21: -1.69163, 22: -1.55078, 23: -1.43907,
    24: -1.32828, 25: -1.19430, 26: -1.05308, 27: -0.92104,
    28: -0.79151, 29: -0.67825, 30: -0.58016, 31: -0.46725,
    32: -0.34799, 33: -0.24649, 34: -0.14882, 35: -0.05188,
    36: 0.04257, 37: 0.13606, 38: 0.22393, 39: 0.31287,
    40: 0.41667, 41: 0.52135, 42: 0.62967, 43: 0.73545,
    44: 0.82562, 45: 0.91093, 46: 1.02119, 47: 1.13281,
    48: 1.23461, 49: 1.37297, 50: 1.49158, 51: 1.60383,
    52: 1.72012, 53: 1.83990, 54: 1.98437, 55: 2.12700,
    56: 2.28554, 57: 2.46262, 58: 2.61139, 59: 2.82196,
    60: 3.27393
  },
  escore: {
    // ... (todos los valores de Escore)
    16: -3.27393, 17: -3.17393, 18: -3.00537, 19: -2.72827,
    20: -2.53830, 21: -2.44904, 22: -2.32338, 23: -2.21069,
    24: -2.11437, 25: -2.03972, 26: -1.92173, 27: -1.76250,
    28: -1.63340, 29: -1.50796, 30: -1.37639, 31: -1.23177,
    32: -1.09207, 33: -0.94779, 34: -0.80615, 35: -0.69509,
    36: -0.57545, 37: -0.43999, 38: -0.30033, 39: -0.15487,
    40: 0.00332, 41: 0.16767, 42: 0.32197, 43: 0.47617,
    44: 0.63779, 45: 0.80523, 46: 0.96248, 47: 1.11406,
    48: 1.28610, 49: 1.45421, 50: 1.58487, 51: 1.74091,
    52: 1.93886, 53: 2.12700, 54: 2.32338, 55: 2.57309,
    56: 2.85950, 57: 2.95950, 58: 3.00537, 59: 3.27393
  },
  oscore: {
    // ... (todos los valores de Oscore)
    24: -3.27393, 25: -3.07393, 26: -2.85950, 27: -2.75950,
    28: -2.63199, 29: -2.39883, 30: -2.21069, 31: -2.09015,
    32: -1.97495, 33: -1.82919, 34: -1.68062, 35: -1.55521,
    36: -1.42424, 37: -1.27553, 38: -1.11902, 39: -0.97631,
    40: -0.84732, 41: -0.71727, 42: -0.58331, 43: -0.45174,
    44: -0.31776, 45: -0.17779, 46: -0.01928, 47: 0.14143,
    48: 0.29338, 49: 0.44585, 50: 0.58331, 51: 0.72330,
    52: 0.88309, 53: 1.06238, 54: 1.24033, 55: 1.43533,
    56: 1.65653, 57: 1.88511, 58: 2.15324, 59: 2.44904,
    60: 2.90161
  },
  ascore: {
    // ... (todos los valores de Ascore)
    12: -3.46436, 13: -3.46436, 14: -3.46436, 15: -3.46436,
    16: -3.15735, 17: -3.15735, 18: -3.00537, 19: -3.00537,
    20: -3.00537, 21: -3.00537, 22: -3.00537, 23: -2.90161,
    24: -2.78793, 25: -2.70172, 26: -2.53830, 27: -2.35413,
    28: -2.21844, 29: -2.07848, 30: -1.92595, 31: -1.77200,
    32: -1.62090, 33: -1.47955, 34: -1.34289, 35: -1.21213,
    36: -1.07533, 37: -0.91699, 38: -0.76096, 39: -0.60633,
    40: -0.45321, 41: -0.30172, 42: -0.15487, 43: -0.01729,
    44: 0.13136, 45: 0.28783, 46: 0.43852, 47: 0.59042,
    48: 0.76096, 49: 0.94156, 50: 1.11406, 51: 1.28610,
    52: 1.45039, 53: 1.61108, 54: 1.81866, 55: 2.03972,
    56: 2.23427, 57: 2.46262, 58: 2.75696, 59: 3.15735,
    60: 3.46436
  },
  cscore: {
    // ... (todos los valores de Cscore)
    17: -3.46436, 18: -3.46436, 19: -3.15735, 20: -2.90161,
    21: -2.72827, 22: -2.57309, 23: -2.42317, 24: -2.30408,
    25: -2.18109, 26: -2.04506, 27: -1.92173, 28: -1.78169,
    29: -1.64101, 30: -1.51840, 31: -1.38502, 32: -1.25773,
    33: -1.13788, 34: -1.01450, 35: -0.89891, 36: -0.78155,
    37: -0.65253, 38: -0.52745, 39: -0.40581, 40: -0.27607,
    41: -0.14277, 42: -0.00665, 43: 0.12331, 44: 0.25953,
    45: 0.41594, 46: 0.58489, 47: 0.75830, 48: 0.93949,
    49: 1.13407, 50: 1.30612, 51: 1.46191, 52: 1.63088,
    53: 1.81175, 54: 2.04506, 55: 2.33337, 56: 2.63199,
    57: 3.00537, 59: 3.46436
  }
};

const normalizeAge = (age) => {
  const ageNum = parseInt(age);
  const range = NORMALIZATION_VALUES.age.ranges.find(r => 
    ageNum >= r.min && ageNum <= r.max
  );
  return range ? range.value : 0;
};

const normalizeCategory = (value, categoryType) => {
  const categoryMap = NORMALIZATION_VALUES[categoryType];
  if (!categoryMap) return 0;
  
  if (categoryMap[value] !== undefined) return categoryMap[value];
  
  const normalizedValue = Object.keys(categoryMap).find(key => 
    key.toLowerCase().includes(value.toLowerCase()) || 
    value.toLowerCase().includes(key.toLowerCase())
  );
  
  return normalizedValue ? categoryMap[normalizedValue] : 0;
};

const normalizeScore = (value, scoreType) => {
  const scoreMap = NORMALIZATION_VALUES[scoreType];
  if (!scoreMap) return 0;
  
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return 0;
  
  const roundedValue = Math.round(numValue);
  
  return scoreMap[roundedValue] !== undefined ? scoreMap[roundedValue] : 0;
};

export const normalizeAndPrepareData = (formData) => {
  const param_grid = {
    hidden_layer_sizes: formData.model.hiddenLayerSize
      .split(';')
      .filter(x => x)
      .map(arch => arch.split(',').map(Number)),
    activation: formData.model.activation.split(','),
    solver: formData.model.algorithm.split(','),
    alpha: formData.model.alpha
      .split(',')
      .filter(x => x)
      .map(Number),
    max_iter: formData.model.maxIterations
      .split(',')
      .filter(x => x)
      .map(Number)
  };

  const prediction = formData.prediction;
  
  
  const requestData = {
    param_grid,
    age: normalizeAge(prediction.age),
    gender: normalizeCategory(prediction.gender, 'gender'), 
    education: normalizeCategory(prediction.education, 'education'),
    country: normalizeCategory(prediction.country, 'country'),
    ethnicity: normalizeCategory(prediction.ethnicity, 'ethnicity'),
    nscore: normalizeScore(prediction.nscore, 'nscore'),
    escore: normalizeScore(prediction.escore, 'escore'),
    oscore: normalizeScore(prediction.oscore, 'oscore'),
    ascore: normalizeScore(prediction.ascore, 'ascore'),
    cscore: normalizeScore(prediction.cscore, 'cscore'),
    impulsive: 0.00721,
    ss: -0.00329
  };

  return requestData;
};