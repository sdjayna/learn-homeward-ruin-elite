import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'study',
    loadComponent: () => import('./pages/study/study.component').then(m => m.StudyComponent)
  },
  {
    path: 'subjects/:type',
    loadComponent: () => import('./pages/subject-detail/subject-detail.component').then(m => m.SubjectDetailComponent)
  },
  {
    path: 'progress',
    loadComponent: () => import('./pages/progress/progress.component').then(m => m.ProgressComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent)
  },
  { path: '**', redirectTo: '' }
];
