export interface CourseApp {
  id: string;
  title: string;
  description: string;
  category: string;
  iconName: string; // Used for Lucide icon lookup
  href: string;
  status: 'available' | 'coming_soon';
  tags: string[];
  moduleNumber: number;
}

export const COURSE_APPS: CourseApp[] = [
  {
    id: 'convertidor-longitud',
    title: 'Convertidor de Unidades de Longitud',
    description: 'Convierte rápidamente entre kilómetros (km), metros (m), centímetros (cm) y milímetros (mm) con validación en tiempo real.',
    category: 'Herramientas y Conversiones',
    iconName: 'Ruler',
    href: '/apps/convertidor-longitud',
    status: 'available',
    tags: ['Longitud', 'PWA', 'Validación', 'km-m', 'cm-mm'],
    moduleNumber: 1,
  },
  {
    id: 'calculadora-promedios',
    title: 'Calculadora de Promedios y Calificaciones',
    description: 'Gestión de ponderaciones, notas de tareas y exámenes del curso.',
    category: 'Académico',
    iconName: 'Calculator',
    href: '#',
    status: 'coming_soon',
    tags: ['Matemáticas', 'Próximamente'],
    moduleNumber: 2,
  },
  {
    id: 'gestor-tareas',
    title: 'Gestor de Tareas & Proyectos',
    description: 'Organizador personal de entregas de aplicaciones y actividades del curso.',
    category: 'Productividad',
    iconName: 'CheckSquare',
    href: '#',
    status: 'coming_soon',
    tags: ['Productividad', 'Próximamente'],
    moduleNumber: 3,
  },
];
