'use client';

import React, { useState } from 'react';
import { Vote, Send, CheckCircle2, RotateCcw, BarChart3 } from 'lucide-react';

type OsOption = 'Android' | 'iOS' | 'Otro';

interface SurveyResults {
  Android: number;
  iOS: number;
  Otro: number;
}

const INITIAL_RESULTS: SurveyResults = {
  Android: 10,
  iOS: 5,
  Otro: 2,
};

const OPTIONS: OsOption[] = ['Android', 'iOS', 'Otro'];

export function OsSurvey() {
  const [selectedOption, setSelectedOption] = useState<OsOption | ''>('');
  const [results, setResults] = useState<SurveyResults>(INITIAL_RESULTS);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastVoted, setLastVoted] = useState<OsOption | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption) return;

    // Registrar respuesta sumando 1 al sistema seleccionado
    setResults((prev) => ({
      ...prev,
      [selectedOption]: prev[selectedOption] + 1,
    }));

    setLastVoted(selectedOption);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setSelectedOption('');
    setIsSubmitted(false);
  };

  const totalVotes = results.Android + results.iOS + results.Otro;

  const getPercentage = (count: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((count / totalVotes) * 100);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-5">
      {/* Header */}
      <div className="p-6 rounded-2xl glass-card text-center space-y-3">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
          <Vote className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Encuesta de Sistema Operativo</h1>
          <p className="text-xs text-slate-400 mt-1">
            Participa seleccionando tu opción favorita y consulta los resultados.
          </p>
        </div>
      </div>

      {/* Formulario de Votación */}
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="p-6 rounded-2xl glass-card space-y-5">
          <div>
            <h2 className="text-sm font-bold text-white mb-3">
              ¿Cuál es tu sistema operativo favorito?
            </h2>

            {/* Opción 1: Menú Desplegable */}
            <div className="space-y-1.5 mb-5">
              <label htmlFor="os-dropdown" className="block text-xs font-semibold text-slate-400">
                1. Seleccionar desde el Menú Desplegable:
              </label>
              <select
                id="os-dropdown"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value as OsOption)}
                className="w-full h-11 px-3 rounded-xl glass-input text-sm text-slate-200 cursor-pointer focus:outline-none"
              >
                <option value="" disabled className="bg-slate-900 text-slate-400">
                  -- Elige una opción --
                </option>
                {OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-slate-900 text-white">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Opción 2: Lista Seleccionable */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-400 mb-2">
                2. O seleccionar desde la Lista:
              </label>
              <div className="space-y-2">
                {OPTIONS.map((opt) => (
                  <label
                    key={opt}
                    onClick={() => setSelectedOption(opt)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                      selectedOption === opt
                        ? 'bg-sky-500/10 border-sky-500/50 text-white'
                        : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="os-selection"
                        value={opt}
                        checked={selectedOption === opt}
                        onChange={() => setSelectedOption(opt)}
                        className="w-4 h-4 text-sky-500 focus:ring-sky-400 bg-slate-900 border-slate-700 cursor-pointer"
                      />
                      <span className="text-sm font-semibold">{opt}</span>
                    </div>
                    {selectedOption === opt && (
                      <CheckCircle2 className="w-4 h-4 text-sky-400" />
                    )}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Botón de Enviar */}
          <button
            type="submit"
            disabled={!selectedOption}
            className={`w-full min-h-[46px] rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              selectedOption
                ? 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-lg shadow-sky-500/20 active:scale-[0.98] cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Enviar</span>
          </button>
        </form>
      ) : (
        /* Pantalla de Resultados */
        <div className="p-6 rounded-2xl glass-card space-y-5 animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-sky-400" />
              <h2 className="text-base font-bold text-white">Resultados de la Encuesta</h2>
            </div>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              Respuesta registrada
            </span>
          </div>

          {lastVoted && (
            <p className="text-xs text-slate-400">
              Has votado por: <span className="font-bold text-sky-400">{lastVoted}</span>
            </p>
          )}

          {/* Lista de Resultados con Conteo */}
          <div className="space-y-4 pt-1">
            {OPTIONS.map((opt) => {
              const count = results[opt];
              const percentage = getPercentage(count);
              const isUserVote = lastVoted === opt;

              return (
                <div key={opt} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className={`flex items-center gap-1.5 ${isUserVote ? 'text-sky-300' : 'text-slate-300'}`}>
                      {opt} {isUserVote && <span className="text-[10px] text-sky-400">(Tu voto)</span>}
                    </span>
                    <span className="text-slate-400">
                      <strong className="text-white text-sm">{count}</strong> respuestas ({percentage}%)
                    </span>
                  </div>

                  {/* Barra de progreso */}
                  <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        opt === 'Android'
                          ? 'bg-emerald-500'
                          : opt === 'iOS'
                          ? 'bg-sky-500'
                          : 'bg-purple-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Resumen Total */}
          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-center text-xs text-slate-400">
            Total de votos acumulados: <strong className="text-white">{totalVotes}</strong>
          </div>

          {/* Botón para Votar de Nuevo */}
          <button
            onClick={handleReset}
            className="w-full min-h-[44px] py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Votar de nuevo</span>
          </button>
        </div>
      )}
    </div>
  );
}
