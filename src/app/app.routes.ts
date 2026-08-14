import { Routes } from '@angular/router';

const placeholder = (titleKey: string) => ({
  loadComponent: () => import('./pages/placeholder/placeholder').then((m) => m.Placeholder),
  data: { titleKey },
});

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: '',
    loadComponent: () => import('./pages/shell/shell').then((m) => m.Shell),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
      },
      { path: 'eiin-list', ...placeholder('nav.eiinList') },
      { path: 'institute-search', ...placeholder('nav.instituteSearch') },
      { path: 'eiin-search', ...placeholder('nav.eiinSearch') },
      { path: 'fund-distribution', ...placeholder('nav.fundDistribution') },
      { path: 'program-management', ...placeholder('dash.program') },
      { path: 'progress-management', ...placeholder('dash.progress') },
      { path: 'program-setup', ...placeholder('dash.mod.programSetup') },
      { path: 'work-plan', ...placeholder('dash.mod.workPlan') },
      { path: 'institute-mapping', ...placeholder('dash.mod.instituteMap') },
      { path: 'resource-allocation', ...placeholder('dash.mod.resource') },
      { path: 'tender-approval', ...placeholder('dash.mod.tender') },
      { path: 'fund-demand', ...placeholder('dash.mod.demand') },
      { path: 'post-allocation-survey', ...placeholder('dash.mod.survey') },
      { path: 'profile', ...placeholder('nav.profile') },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
