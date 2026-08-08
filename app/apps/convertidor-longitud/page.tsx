'use client';

import { Navbar } from '@/components/Navbar';
import { LengthConverter } from '@/components/LengthConverter';
import { PwaRegister } from '@/components/PwaRegister';

export default function LengthConverterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <PwaRegister />
      <Navbar showBack={true} currentTitle="Convertidor de Unidades de Longitud" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <LengthConverter />
      </main>

      <footer className="glass-panel border-t border-slate-800/80 py-6 mt-16 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>Convertidor de Longitud • Módulo 1 • Aplicación PWA</p>
        </div>
      </footer>
    </div>
  );
}
