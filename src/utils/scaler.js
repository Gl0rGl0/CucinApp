/**
 * Formats a scaled number cleanly (e.g., 200, 1.5, 0.5, 1.25)
 */
export function formatScaledAmount(amount, baseServings, targetServings) {
  if (amount === undefined || amount === null || amount === '') {
    return '';
  }

  const num = typeof amount === 'number' ? amount : parseFloat(amount);
  if (isNaN(num)) {
    return amount;
  }

  if (!baseServings || !targetServings || baseServings === targetServings) {
    return formatNumber(num);
  }

  const scaled = (num * targetServings) / baseServings;
  return formatNumber(scaled);
}

function formatNumber(val) {
  if (val <= 0) return '0';
  
  // Round to max 2 decimal places
  const rounded = Math.round(val * 100) / 100;

  // Nice fractions for common kitchen amounts
  const decimal = rounded % 1;
  const whole = Math.floor(rounded);

  if (Math.abs(decimal - 0.5) < 0.03) {
    return whole > 0 ? `${whole} ½` : '½';
  }
  if (Math.abs(decimal - 0.25) < 0.03) {
    return whole > 0 ? `${whole} ¼` : '¼';
  }
  if (Math.abs(decimal - 0.75) < 0.03) {
    return whole > 0 ? `${whole} ¾` : '¾';
  }
  if (Math.abs(decimal - 0.33) < 0.04) {
    return whole > 0 ? `${whole} ⅓` : '⅓';
  }

  // If it's an integer or close to it
  if (decimal === 0) {
    return whole.toString();
  }

  // Otherwise 1 decimal place
  return rounded.toFixed(1).replace('.0', '');
}

/**
 * Converts metric units to imperial units if unitSystem is 'imperial'
 */
export function convertUnitAndAmount(amount, unit, unitSystem = 'metric') {
  if (!amount || unitSystem !== 'imperial' || !unit) {
    return { amount, unit };
  }

  const num = typeof amount === 'number' ? amount : parseFloat(amount);
  if (isNaN(num)) {
    return { amount, unit };
  }

  const cleanUnit = unit.toLowerCase().trim();

  // grams -> oz (1 oz ≈ 28.35 g)
  if (cleanUnit === 'g' || cleanUnit === 'gr' || cleanUnit === 'grammi') {
    const oz = num / 28.35;
    return {
      amount: formatNumber(oz),
      unit: 'oz'
    };
  }

  // kg -> lbs (1 lb ≈ 0.4536 kg)
  if (cleanUnit === 'kg' || cleanUnit === 'chili') {
    const lbs = num * 2.20462;
    return {
      amount: formatNumber(lbs),
      unit: 'lb'
    };
  }

  // ml -> fl oz (1 fl oz ≈ 29.57 ml)
  if (cleanUnit === 'ml' || cleanUnit === 'millilitri') {
    const flOz = num / 29.57;
    return {
      amount: formatNumber(flOz),
      unit: 'fl oz'
    };
  }

  // l / lt -> cups (1 cup ≈ 0.236 l)
  if (cleanUnit === 'l' || cleanUnit === 'lt' || cleanUnit === 'litri') {
    const cups = num * 4.22675;
    return {
      amount: formatNumber(cups),
      unit: 'cups'
    };
  }

  return { amount, unit };
}

