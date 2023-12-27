import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home-defer',
    loadComponent: () =>
      import('./home-defer/home-defer.page').then((m) => m.HomeDeferPage),
  },
];
