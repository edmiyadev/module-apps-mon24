'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { QuickNotes } from '@/components/QuickNotes';
import { PwaRegister } from '@/components/PwaRegister';

export default function QuickNotesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <PwaRegister />
      <Navbar showBack={true} currentTitle="Notas Rápidas" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex items-center justify-center">
        <QuickNotes />
      </main>

      <footer className="border-t border-slate-900 py-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-400">Edward Minaya - 100434130</p>
          <p className="text-slate-600">Desarrollo movil Mon24</p>
        </div>
      </footer>
    </div>
  );
}
