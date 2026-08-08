export type LengthUnitKey = 'km' | 'm' | 'cm' | 'mm';

export interface LengthUnitInfo {
  key: LengthUnitKey;
  name: string;
  symbol: string;
  ratioToMeter: number; // base unit is meter (m)
}

export const LENGTH_UNITS: Record<LengthUnitKey, LengthUnitInfo> = {
  km: { key: 'km', name: 'Kilómetros', symbol: 'km', ratioToMeter: 1000 },
  m: { key: 'm', name: 'Metros', symbol: 'm', ratioToMeter: 1 },
  cm: { key: 'cm', name: 'Centímetros', symbol: 'cm', ratioToMeter: 0.01 },
  mm: { key: 'mm', name: 'Milímetros', symbol: 'mm', ratioToMeter: 0.001 },
};

export const COMMON_PRESETS: Array<{ from: LengthUnitKey; to: LengthUnitKey; label: string; formula: string }> = [
  { from: 'km', to: 'm', label: 'km ➔ m', formula: '1 km = 1,000 m' },
  { from: 'm', to: 'km', label: 'm ➔ km', formula: '1,000 m = 1 km' },
  { from: 'cm', to: 'mm', label: 'cm ➔ mm', formula: '1 cm = 10 mm' },
  { from: 'mm', to: 'cm', label: 'mm ➔ cm', formula: '10 mm = 1 cm' },
];

export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
  numericValue?: number;
}

/**
 * Validates text input to ensure only numeric non-negative numbers are entered.
 */
export function validateLengthInput(input: string): ValidationResult {
  const trimmed = input.trim();

  if (trimmed === '') {
    return { isValid: true, numericValue: undefined };
  }

  // Check for letters or illegal characters
  if (/[a-zA-Z]/i.test(trimmed)) {
    return {
      isValid: false,
      errorMessage: 'No se permiten letras ni caracteres alfabéticos en la entrada numérica.',
    };
  }

  // Check for negative numbers or math operators
  if (trimmed.startsWith('-') || /[+\-*/=]/!?.test(trimmed)) {
    return {
      isValid: false,
      errorMessage: 'Por favor, ingrese un número entero o decimal positivo válido.',
    };
  }

  // Match decimal pattern strictly (only digits and optionally one dot)
  const isStrictNumeric = /^\d*\.?\d*$/.test(trimmed);
  if (!isStrictNumeric) {
    return {
      isValid: false,
      errorMessage: 'Formato numérico inválido. Verifique que no haya múltiples puntos ni símbolos.',
    };
  }

  const num = parseFloat(trimmed);
  if (isNaN(num)) {
    return {
      isValid: false,
      errorMessage: 'El valor ingresado no representa un número válido.',
    };
  }

  return {
    isValid: true,
    numericValue: num,
  };
}

/**
 * Converts length between requested units (km, m, cm, mm).
 */
export function convertLength(value: number, from: LengthUnitKey, to: LengthUnitKey): number {
  if (from === to) return value;
  const meters = value * LENGTH_UNITS[from].ratioToMeter;
  const targetValue = meters / LENGTH_UNITS[to].ratioToMeter;
  return targetValue;
}

/**
 * Formats conversion result neatly (e.g. 1000 or 0.001 with up to 6 decimals, removing trailing zeros)
 */
export function formatResult(val: number): string {
  if (val === 0) return '0';
  
  const formatted = val.toLocaleString('es-ES', {
    maximumFractionDigits: 6,
    useGrouping: true,
  });

  return formatted;
}
