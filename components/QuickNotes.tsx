'use client';

import React, { useState } from 'react';
import { StickyNote, Plus, Trash2, Pencil, ArrowLeft, Save } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
}

const STORAGE_KEY = 'quick_notes_list';

function loadNotes(): Note[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [
      { id: '1', title: 'Primera Nota', content: 'Este es el contenido de tu primera nota rápida.' }
    ];
  } catch {
    return [];
  }
}

function saveNotes(notes: Note[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error('Error al guardar notas:', error);
  }
}

export function QuickNotes() {
  const [started, setStarted] = useState(false);
  const [notes, setNotes] = useState<Note[]>(() => loadNotes());
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Estado de edición y campos
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  // Estado para confirmación de eliminación
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Abrir formulario para crear
  const handleOpenCreate = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setIsFormOpen(true);
  };

  // Abrir formulario para editar
  const handleOpenEdit = (note: Note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setIsFormOpen(true);
  };

  // Guardar (crear o actualizar) nota
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    let updated: Note[];

    if (editingId) {
      // Modo edición
      updated = notes.map((n) =>
        n.id === editingId
          ? { ...n, title: title.trim(), content: content.trim() }
          : n
      );
    } else {
      // Modo creación
      const newNote: Note = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
      };
      updated = [newNote, ...notes];
    }

    setNotes(updated);
    saveNotes(updated);
    
    // Limpiar y volver
    setTitle('');
    setContent('');
    setEditingId(null);
    setIsFormOpen(false);
  };

  // Eliminar nota confirmada
  const handleDelete = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    saveNotes(updated);
    setDeletingId(null);
  };

  // 1. Pantalla Inicial / Comenzar
  if (!started) {
    return (
      <div className="w-full max-w-md mx-auto p-8 rounded-2xl glass-card text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <StickyNote className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Notas Rápidas</h1>
          <p className="text-sm text-slate-400 mt-2">
            Toma, edita y guarda tus notas de manera fácil y rápida.
          </p>
        </div>
        <button
          onClick={() => setStarted(true)}
          className="w-full min-h-[48px] py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all"
        >
          Comenzar
        </button>
      </div>
    );
  }

  // 2. Formulario para crear o editar nota
  if (isFormOpen) {
    return (
      <div className="w-full max-w-md mx-auto p-6 rounded-2xl glass-card space-y-5">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setIsFormOpen(false);
            }}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            title="Volver"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h2 className="text-lg font-bold text-white">
            {editingId ? 'Editar Nota' : 'Nueva Nota'}
          </h2>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Título
            </label>
            <input
              type="text"
              required
              placeholder="Título de la nota"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-11 px-3 rounded-xl glass-input text-sm text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">
              Contenido
            </label>
            <textarea
              required
              rows={5}
              placeholder="Escribe el contenido..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 rounded-xl glass-input text-sm text-white focus:outline-none resize-none"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setIsFormOpen(false);
              }}
              className="flex-1 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
            >
              Volver
            </button>
            <button
              type="submit"
              className="flex-1 h-11 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{editingId ? 'Actualizar' : 'Guardar'}</span>
            </button>
          </div>
        </form>
      </div>
    );
  }

  // 3. Pantalla Principal: Lista de notas
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Header con botón para agregar nueva nota */}
      <div className="flex items-center justify-between p-4 rounded-2xl glass-card">
        <div>
          <h1 className="text-lg font-bold text-white">Notas Rápidas</h1>
          <p className="text-xs text-slate-400">{notes.length} notas guardadas</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="min-h-[44px] px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Nota</span>
        </button>
      </div>

      {/* Lista de notas */}
      {notes.length === 0 ? (
        <div className="p-8 text-center rounded-2xl glass-card text-slate-400 text-sm">
          No hay notas guardadas. Presiona &quot;Nueva Nota&quot; para crear una.
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-4 rounded-2xl glass-card flex items-start justify-between gap-3"
            >
              <div 
                onClick={() => handleOpenEdit(note)}
                className="flex-1 min-w-0 cursor-pointer group"
                title="Haz clic para editar"
              >
                <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                  {note.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {note.content}
                </p>
              </div>

              {/* Botones de acción: Editar y Eliminar */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleOpenEdit(note)}
                  className="p-2 rounded-lg bg-slate-800/80 hover:bg-amber-500/20 text-slate-400 hover:text-amber-300 transition-colors"
                  title="Editar nota"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeletingId(note.id)}
                  className="p-2 rounded-lg bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Eliminar nota"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmación antes de eliminar */}
      {deletingId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-xs p-5 rounded-2xl glass-card bg-slate-900 text-center space-y-4 border border-slate-700">
            <h3 className="text-sm font-bold text-white">¿Eliminar esta nota?</h3>
            <p className="text-xs text-slate-400">Esta acción no se puede deshacer.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeletingId(null)}
                className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deletingId)}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
