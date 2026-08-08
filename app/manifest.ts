import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Catálogo de Aplicaciones - Curso Dev',
    short_name: 'App Catalog',
    description: 'Catálogo de aplicaciones para el curso de desarrollo con convertidor de unidades PWA.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#6366f1',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
