import { Routes } from '@angular/router';

export const registerRoutes: Routes = [


    {
        path: '', loadComponent: () => import('./register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'token', loadComponent: () => import('./token-register/token-register.component').then(m => m.TokenRegisterComponent)
    }

];
