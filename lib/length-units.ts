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

export interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
  numericValue?: number;
}

/**
 * Validates text input to ensure only numeric non-negative numbers are entered.
 * Supports numbers with thousands separators like 1,000
 */
export function validateLengthInput(input: string): ValidationResult {
  const trimmed = input.trim();

  if (trimmed === '') {
    return { isValid: true, numericValue: undefined };
  }

  // Check for letters or illegal characters (excluding comma and dot)
  if (/[a-zA-Z]/i.test(trimmed)) {
    return {
      isValid: false,
      errorMessage: 'No se permiten letras ni caracteres alfabéticos en la entrada numérica.',
    };
  }

  // Check for negative numbers or math operators
  if (trimmed.startsWith('-') || /[+\-*/=]/.test(trimmed)) {
    return {
      isValid: false,
      errorMessage: 'Por favor, ingrese un número entero o decimal positivo válido.',
    };
  }

  // Sanitize commas used as thousands separators for parsing
  const cleanInput = trimmed.replace(/,/g, '');

  const isStrictNumeric = /^\d*\.?\d*$/.test(cleanInput);
  if (!isStrictNumeric) {
    return {
      isValid: false,
      errorMessage: 'Formato numérico inválido. Verifique los puntos y comas ingresados.',
    };
  }

  const num = parseFloat(cleanInput);
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
 * Formats conversion result using comma (,) as thousands separator (e.g., 1,000)
 */
export function formatResult(val: number): string {
  if (val === 0) return '0';

  // Format with comma (,) for thousands separator as requested (e.g. 1,000)
  return val.toLocaleString('en-US', {
    maximumFractionDigits: 6,
    useGrouping: true,
  });
}
