'use client';

import React from 'react';
import Link from 'next/link';
import { CourseApp } from '@/lib/apps-registry';
import { Ruler, Calculator, CheckSquare, ArrowUpRight, Sparkles, StickyNote, Vote } from 'lucide-react';

interface AppCardProps {
  app: CourseApp;
}

export function AppCard({ app }: AppCardProps) {
  const renderIcon = () => {
    switch (app.iconName) {
      case 'Ruler':
        return <Ruler className="w-5 h-5 text-indigo-400" />;
      case 'StickyNote':
        return <StickyNote className="w-5 h-5 text-amber-400" />;
      case 'Vote':
        return <Vote className="w-5 h-5 text-sky-400" />;
      case 'Calculator':
        return <Calculator className="w-5 h-5 text-purple-400" />;
      case 'CheckSquare':
        return <CheckSquare className="w-5 h-5 text-emerald-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  const isAvailable = app.status === 'available';

  const cardContent = (
    <div className="h-full flex flex-col justify-between p-5 rounded-2xl glass-card transition-all">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
            {renderIcon()}
          </div>
          {isAvailable ? (
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Disponible
            </span>
          ) : (
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Próximamente
            </span>
          )}
        </div>

        <h2 className="text-base font-bold text-white mb-1.5 group-hover:text-indigo-300 transition-colors">
          {app.title}
        </h2>

        <p className="text-xs text-slate-400 leading-relaxed mb-4">
          {app.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold">
        <span className={isAvailable ? 'text-indigo-400' : 'text-slate-500'}>
          {isAvailable ? 'Abrir App' : 'Próximamente'}
        </span>
        {isAvailable && <ArrowUpRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
      </div>
    </div>
  );

  if (isAvailable) {
    return <Link href={app.href} className="block h-full group">{cardContent}</Link>;
  }

  return <div className="block h-full cursor-not-allowed opacity-60">{cardContent}</div>;
}
