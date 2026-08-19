import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./pages/login/login').then((m) => m.Login),
  },
  {
  path: 'admin/dashboard',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./pages/admin/dashboard/dashboard').then(
      (m) => m.Dashboard
    ),
},
  {
    path: 'rooms',
    loadComponent: () =>
        import('./pages/rooms/rooms').then((m) => m.RoomsComponent),
    },
    {
  path: 'facilities',
  loadComponent: () =>
    import('./pages/facilities/facilities').then(
      (m) => m.FacilitiesComponent
    ),
},
{
  path: 'gallery',
  loadComponent: () =>
    import('./pages/gallery/gallery').then(
      (m) => m.GalleryComponent
    ),
},
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: '**',
    redirectTo: '',
  },
  
];