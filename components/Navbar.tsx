'use client';

import React from 'react';
import Link from 'next/link';
import { Smartphone, ChevronLeft } from 'lucide-react';
import { PwaInstaller } from './PwaInstaller';

interface NavbarProps {
  currentTitle?: string;
  showBack?: boolean;
}

export function Navbar({ currentTitle, showBack = false }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBack ? (
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg border border-slate-700/60 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Inicio</span>
            </Link>
          ) : (
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Smartphone className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-white tracking-tight">
                Desarrollo Movil Mon24
              </span>
            </Link>
          )}

          {currentTitle && (
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-800 text-xs font-medium text-slate-400">
              <span>{currentTitle}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <PwaInstaller />
        </div>
      </div>
    </header>
  );
}
