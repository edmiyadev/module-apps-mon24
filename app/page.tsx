'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { CatalogHeader } from '@/components/CatalogHeader';
import { AppCard } from '@/components/AppCard';
import { PwaRegister } from '@/components/PwaRegister';
import { COURSE_APPS } from '@/lib/apps-registry';

export default function CatalogPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <PwaRegister />
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        <CatalogHeader />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSE_APPS.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </main>

      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-400">Edward Minaya - 100434130</p>
          <p className="text-slate-600">Desarrollo movil Mon24</p>
        </div>
      </footer>
    </div>
  );
}
