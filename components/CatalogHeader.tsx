'use client';

import React from 'react';
import { User } from 'lucide-react';

export function CatalogHeader() {
  return (
    <div className="mb-8 text-left space-y-3">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-300">
        <User className="w-3.5 h-3.5" />
        <span>Edward Minaya - 100434130</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
        Desarrollo movil Mon24
      </h1>
      <p className="text-slate-400 text-sm">
        Catálogo de aplicaciones del curso.
      </p>
    </div>
  );
}
