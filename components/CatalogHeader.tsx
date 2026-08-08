'use client';

import React from 'react';
import { Search, Sparkles, FolderGit2 } from 'lucide-react';

interface CatalogHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export function CatalogHeader({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: CatalogHeaderProps) {
  return (
    <div className="space-y-6 mb-10 text-center sm:text-left">
      {/* Title & Hero Section */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden bg-mesh">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portafolio de Desarrollo App</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
            Catálogo de Aplicaciones
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Colección de proyectos y herramientas desarrolladas para el curso.
            Accede a cada aplicación de forma interactiva con soporte **PWA** para instalación y uso offline.
          </p>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <label htmlFor="search-apps-input" className="sr-only">Buscar aplicaciones</label>
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            id="search-apps-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar aplicación o etiqueta..."
            className="w-full h-11 pl-11 pr-4 rounded-xl glass-input text-sm"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => onCategoryChange('All')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'All'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-400 border border-slate-700/80'
            }`}
          >
            Todas ({categories.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-400 border border-slate-700/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
