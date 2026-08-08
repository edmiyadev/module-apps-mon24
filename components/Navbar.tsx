'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutGrid, ChevronLeft } from 'lucide-react';
import { PwaInstaller } from './PwaInstaller';

interface NavbarProps {
  currentTitle?: string;
  showBack?: boolean;
}

export function Navbar({ currentTitle, showBack = false }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBack ? (
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg border border-slate-700/60 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Volver al Catálogo</span>
            </Link>
          ) : (
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <LayoutGrid className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                  DevCatalog
                </span>
                <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Curso App
                </span>
              </div>
            </Link>
          )}

          {currentTitle && (
            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-slate-800">
              <span className="text-sm font-medium text-slate-400">{currentTitle}</span>
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
