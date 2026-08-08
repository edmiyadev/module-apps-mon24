import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Desarrollo Movil Mon24',
    short_name: 'Desarrollo Movil Mon24',
    description: 'Catálogo de aplicaciones para el curso de desarrollo móvil del mon24.',
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
