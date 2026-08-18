export interface CourseApp {
  id: string;
  title: string;
  description: string;
  iconName: string;
  href: string;
  status: 'available' | 'coming_soon';
}

export const COURSE_APPS: CourseApp[] = [
  {
    id: 'convertidor-longitud',
    title: 'Convertidor de Unidades de Longitud',
    description: 'Conversión instantánea entre kilómetros (km), metros (m), centímetros (cm) y milímetros (mm).',
    iconName: 'Ruler',
    href: '/apps/convertidor-longitud',
    status: 'available',
  },
  {
    id: 'notas-rapidas',
    title: 'Notas Rápidas',
    description: 'Toma, organiza y guarda notas de forma rápida y sencilla con almacenamiento local.',
    iconName: 'StickyNote',
    href: '/apps/notas-rapidas',
    status: 'available',
  }
];
