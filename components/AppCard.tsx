'use client';

import React from 'react';
import Link from 'next/link';
import { CourseApp } from '@/lib/apps-registry';
import { Ruler, Calculator, CheckSquare, ArrowRight, Sparkles } from 'lucide-react';

interface AppCardProps {
  app: CourseApp;
}

export function AppCard({ app }: AppCardProps) {
  // Dynamically render icon based on string name
  const renderIcon = () => {
    switch (app.iconName) {
      case 'Ruler':
        return <Ruler className="w-6 h-6 text-indigo-400" />;
      case 'Calculator':
        return <Calculator className="w-6 h-6 text-purple-400" />;
      case 'CheckSquare':
        return <CheckSquare className="w-6 h-6 text-emerald-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-amber-400" />;
    }
  };

  const isAvailable = app.status === 'available';

  const cardContent = (
    <div className="h-full flex flex-col justify-between p-6 rounded-2xl glass-card relative overflow-hidden group">
      {/* Background Accent Glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all" />

      <div>
        {/* Header Row: Icon & Status Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
            {renderIcon()}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              Módulo {app.moduleNumber}
            </span>
            {isAvailable ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Disponible
              </span>
            ) : (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                En desarrollo
              </span>
            )}
          </div>
        </div>

        {/* Category & Title */}
        <span className="text-xs font-medium uppercase tracking-wider text-indigo-400 mb-1 block">
          {app.category}
        </span>
        <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
          {app.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed mb-6">
          {app.description}
        </p>
      </div>

      {/* Footer Tags & Action Link */}
      <div>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {app.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-900/60 text-slate-400 border border-slate-800"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-sm font-semibold">
          <span className={isAvailable ? 'text-indigo-400 group-hover:text-indigo-300' : 'text-slate-500'}>
            {isAvailable ? 'Abrir Aplicación' : 'Próximamente'}
          </span>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
            isAvailable 
              ? 'bg-indigo-600/20 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:translate-x-1' 
              : 'bg-slate-800 text-slate-600'
          }`}>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );

  if (isAvailable) {
    return <Link href={app.href} className="block h-full">{cardContent}</Link>;
  }

  return <div className="block h-full cursor-not-allowed opacity-75">{cardContent}</div>;
}
