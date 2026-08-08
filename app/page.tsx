'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { CatalogHeader } from '@/components/CatalogHeader';
import { AppCard } from '@/components/AppCard';
import { PwaRegister } from '@/components/PwaRegister';
import { COURSE_APPS } from '@/lib/apps-registry';
import { SearchX } from 'lucide-react';

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories
  const categories = Array.from(new Set(COURSE_APPS.map((app) => app.category)));

  // Filter apps based on search & category selection
  const filteredApps = COURSE_APPS.filter((app) => {
    const matchesSearch =
      app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || app.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <PwaRegister />
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <CatalogHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        {/* Catalog App Grid */}
        {filteredApps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        ) : (
          <div className="glass-panel p-12 rounded-3xl text-center space-y-4 max-w-md mx-auto my-12">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <SearchX className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">No se encontraron aplicaciones</h3>
            <p className="text-xs text-slate-400">
              No hay coincidencias para &quot;{searchQuery}&quot;. Intenta buscar con otro término.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
            >
              Restablecer filtros
            </button>
          </div>
        )}
      </main>

      <footer className="glass-panel border-t border-slate-800/80 py-8 mt-16 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>© {new Date().getFullYear()} Catálogo de Aplicaciones - Curso de Desarrollo. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
