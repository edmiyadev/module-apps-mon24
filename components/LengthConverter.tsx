'use client';

import React, { useState, useId } from 'react';
import {
  LengthUnitKey,
  LENGTH_UNITS,
  COMMON_PRESETS,
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
  Sparkles,
  Zap,
} from 'lucide-react';

export function LengthConverter() {
  const [inputValue, setInputValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<LengthUnitKey>('km');
  const [toUnit, setToUnit] = useState<LengthUnitKey>('m');
  const [copied, setCopied] = useState<boolean>(false);

  const inputId = useId();
  const fromSelectId = useId();
  const toSelectId = useId();

  // Validate current input
  const validation = validateLengthInput(inputValue);
  const numericVal = validation.numericValue;

  // Perform live conversion
  const convertedResult =
    validation.isValid && numericVal !== undefined
      ? convertLength(numericVal, fromUnit, toUnit)
      : null;

  // Handle Input Change with strict validation feedback
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInputValue(raw);
  };

  // Swap Units
  const handleSwapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  // Quick Preset Selection
  const handlePresetSelect = (presetFrom: LengthUnitKey, presetTo: LengthUnitKey) => {
    setFromUnit(presetFrom);
    setToUnit(presetTo);
    if (!inputValue || !validation.isValid) {
      setInputValue('1');
    }
  };

  // Copy Result to Clipboard
  const handleCopyResult = () => {
    if (convertedResult === null) return;
    const textToCopy = `${formatResult(convertedResult)} ${LENGTH_UNITS[toUnit].symbol}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Clear Input
  const handleClear = () => {
    setInputValue('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* App Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -z-10" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <Ruler className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Convertidor de Longitud
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  PWA
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                Conversión exacta entre kilómetros, metros, centímetros y milímetros.
              </p>
            </div>
          </div>

          <button
            onClick={handleClear}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpiar campos</span>
          </button>
        </div>
      </div>

      {/* Main Converter Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
        {/* Error Alert Box if input validation fails */}
        {!validation.isValid && validation.errorMessage && (
          <div className="flex items-start gap-3 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm animate-fade-in">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block mb-0.5">Error de Entrada</span>
              <span>{validation.errorMessage}</span>
            </div>
          </div>
        )}

        {/* Form Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Input Value & Source Unit */}
          <div className="md:col-span-5 space-y-2">
            <label htmlFor={inputId} className="block text-xs font-medium uppercase tracking-wider text-slate-400">
              Valor a Convertir
            </label>
            <div className="relative flex items-center">
              <input
                id={inputId}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Ej. 10"
                className={`w-full h-14 px-4 pr-24 rounded-2xl glass-input text-lg font-bold ${
                  !validation.isValid ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500' : ''
                }`}
              />
              <div className="absolute right-2 top-2 bottom-2 flex items-center">
                <label htmlFor={fromSelectId} className="sr-only">Unidad de origen</label>
                <select
                  id={fromSelectId}
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value as LengthUnitKey)}
                  className="h-10 px-3 rounded-xl bg-slate-800 text-indigo-300 font-semibold text-sm border border-slate-700 focus:outline-none cursor-pointer hover:bg-slate-700 transition-colors"
                >
                  {Object.values(LENGTH_UNITS).map((u) => (
                    <option key={u.key} value={u.key} className="bg-slate-900 text-white">
                      {u.symbol} ({u.name})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Swap Units Button */}
          <div className="md:col-span-2 flex justify-center py-2 md:py-0">
            <button
              onClick={handleSwapUnits}
              title="Intercambiar unidades"
              className="w-12 h-12 rounded-2xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/30 flex items-center justify-center shadow-md transition-all hover:scale-110 active:scale-95 group"
            >
              <ArrowRightLeft className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
            </button>
          </div>

          {/* Target Unit Dropdown */}
          <div className="md:col-span-5 space-y-2">
            <label htmlFor={toSelectId} className="block text-xs font-medium uppercase tracking-wider text-slate-400">
              Convertir A
            </label>
            <div className="relative flex items-center">
              <select
                id={toSelectId}
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value as LengthUnitKey)}
                className="w-full h-14 px-4 rounded-2xl glass-input text-base font-semibold text-slate-200 cursor-pointer"
              >
                {Object.values(LENGTH_UNITS).map((u) => (
                  <option key={u.key} value={u.key} className="bg-slate-900 text-white">
                    {u.name} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Output Result Box */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Resultado de la Conversión
            </span>

            {convertedResult !== null && (
              <button
                onClick={handleCopyResult}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            )}
          </div>

          {convertedResult !== null ? (
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {formatResult(convertedResult)}
              </span>
              <span className="text-xl font-bold text-indigo-400">
                {LENGTH_UNITS[toUnit].symbol}
              </span>
              <span className="text-sm text-slate-500 ml-auto">
                ({LENGTH_UNITS[toUnit].name})
              </span>
            </div>
          ) : (
            <div className="text-slate-500 italic text-sm py-2">
              Ingrese un valor numérico válido arriba para ver el resultado.
            </div>
          )}

          {/* Formula explanation line */}
          {convertedResult !== null && numericVal !== undefined && (
            <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
              <span>
                Fórmula: <strong className="text-slate-300">{numericVal} {LENGTH_UNITS[fromUnit].symbol}</strong> ={' '}
                <strong className="text-indigo-300">{formatResult(convertedResult)} {LENGTH_UNITS[toUnit].symbol}</strong>
              </span>
              <span className="text-slate-500 font-mono text-[11px]">
                1 {LENGTH_UNITS[fromUnit].symbol} = {convertLength(1, fromUnit, toUnit)} {LENGTH_UNITS[toUnit].symbol}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Quick Common Conversions Section */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">
            Conversiones Frecuentes (km-m, m-km, cm-mm, mm-cm)
          </h2>
        </div>
        <p className="text-xs text-slate-400">
          Haz clic en cualquiera de estas conversiones directas para configurar automáticamente los parámetros:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {COMMON_PRESETS.map((preset) => {
            const isActive = fromUnit === preset.from && toUnit === preset.to;
            const sampleConverted = convertLength(1, preset.from, preset.to);

            return (
              <button
                key={`${preset.from}-${preset.to}`}
                onClick={() => handlePresetSelect(preset.from, preset.to)}
                className={`p-4 rounded-2xl text-left transition-all flex flex-col justify-between border ${
                  isActive
                    ? 'bg-indigo-600/20 border-indigo-500/50 shadow-md shadow-indigo-500/10'
                    : 'bg-slate-900/50 hover:bg-slate-800/80 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white">{preset.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                  )}
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {preset.formula}
                </span>
                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Ejemplo (1 {preset.from}):</span>
                  <span className="font-semibold text-indigo-300">
                    {sampleConverted} {preset.to}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
