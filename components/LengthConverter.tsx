'use client';

import React, { useState, useId, useEffect } from 'react';
import {
  LengthUnitKey,
  LENGTH_UNITS,
  validateLengthInput,
  convertLength,
  formatResult,
} from '@/lib/length-units';
import {
  ArrowRightLeft,
  AlertCircle,
  Copy,
  Check,
  RotateCcw,
  Ruler,
  User,
} from 'lucide-react';

export function LengthConverter() {
  const [inputValue, setInputValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<LengthUnitKey>('km');
  const [toUnit, setToUnit] = useState<LengthUnitKey>('m');
  const [copied, setCopied] = useState<boolean>(false);

  const inputId = useId();
  const fromSelectId = useId();
  const toSelectId = useId();

  const allUnits = Object.values(LENGTH_UNITS);

  // Available target units (excluding the source unit)
  const targetUnitOptions = allUnits.filter((u) => u.key !== fromUnit);

  // Ensure toUnit is never equal to fromUnit
  useEffect(() => {
    if (fromUnit === toUnit) {
      const nextAvailable = targetUnitOptions[0]?.key;
      if (nextAvailable) {
        setToUnit(nextAvailable);
      }
    }
  }, [fromUnit, toUnit, targetUnitOptions]);

  const validation = validateLengthInput(inputValue);
  const numericVal = validation.numericValue;

  const convertedResult =
    validation.isValid && numericVal !== undefined
      ? convertLength(numericVal, fromUnit, toUnit)
      : null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFromUnitChange = (newFrom: LengthUnitKey) => {
    setFromUnit(newFrom);
    if (newFrom === toUnit) {
      const available = allUnits.filter((u) => u.key !== newFrom);
      if (available.length > 0) {
        setToUnit(available[0].key);
      }
    }
  };

  const handleSwapUnits = () => {
    const prevFrom = fromUnit;
    const prevTo = toUnit;
    setFromUnit(prevTo);
    setToUnit(prevFrom);
  };

  const handleCopyResult = () => {
    if (convertedResult === null) return;
    const textToCopy = `${formatResult(convertedResult)} ${LENGTH_UNITS[toUnit].symbol}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputValue('');
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-5">
      {/* Student Credit Badge */}
      <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-300">
        <div className="flex items-center gap-2">
          <User className="w-3.5 h-3.5" />
          <span>Edward Minaya - 100434130</span>
        </div>
        <span className="text-[11px] text-slate-400">Desarrollo Móvil MON24</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
            <Ruler className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Convertidor de Longitud</h1>
            <p className="text-xs text-slate-400">km • m • cm • mm</p>
          </div>
        </div>

        <button
          onClick={handleClear}
          title="Limpiar"
          className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Main Converter Card */}
      <div className="glass-panel p-6 rounded-2xl space-y-5">
        {/* Error alert if validation fails */}
        {!validation.isValid && validation.errorMessage && (
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{validation.errorMessage}</span>
          </div>
        )}

        {/* Input & Unit Selectors */}
        <div className="space-y-4">
          {/* Source Input */}
          <div className="space-y-1.5">
            <label htmlFor={inputId} className="block text-xs font-semibold text-slate-400">
              Valor de Origen
            </label>
            <div className="relative flex items-center">
              <input
                id={inputId}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Ej. 1000"
                className={`w-full h-12 px-3.5 pr-28 rounded-xl glass-input text-base font-medium ${
                  !validation.isValid ? 'border-rose-500' : ''
                }`}
              />
              <div className="absolute right-1.5 top-1.5 bottom-1.5 flex items-center">
                <label htmlFor={fromSelectId} className="sr-only">Unidad origen</label>
                <select
                  id={fromSelectId}
                  value={fromUnit}
                  onChange={(e) => handleFromUnitChange(e.target.value as LengthUnitKey)}
                  className="h-9 px-2.5 rounded-lg bg-slate-800 text-indigo-300 font-semibold text-xs border border-slate-700 focus:outline-none cursor-pointer"
                >
                  {allUnits.map((u) => (
                    <option key={u.key} value={u.key} className="bg-slate-900 text-white">
                      {u.symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Swap Button Divider */}
          <div className="flex justify-center my-1">
            <button
              onClick={handleSwapUnits}
              title="Intercambiar unidades"
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700/60 transition-all"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Target Unit Selector (Filtered to exclude source unit) */}
          <div className="space-y-1.5">
            <label htmlFor={toSelectId} className="block text-xs font-semibold text-slate-400">
              Convertir A (Unidad Destino)
            </label>
            <select
              id={toSelectId}
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value as LengthUnitKey)}
              className="w-full h-12 px-3.5 rounded-xl glass-input text-sm font-medium text-slate-200 cursor-pointer"
            >
              {targetUnitOptions.map((u) => (
                <option key={u.key} value={u.key} className="bg-slate-900 text-white">
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result Area */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
              Resultado
            </span>
            {convertedResult !== null ? (
              <div className="text-2xl font-bold text-white flex items-baseline gap-1.5">
                <span>{formatResult(convertedResult)}</span>
                <span className="text-base font-semibold text-indigo-400">
                  {LENGTH_UNITS[toUnit].symbol}
                </span>
              </div>
            ) : (
              <span className="text-xs text-slate-500 italic">Ingrese un valor numérico válido</span>
            )}
          </div>

          {convertedResult !== null && (
            <button
              onClick={handleCopyResult}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Copiar resultado"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
