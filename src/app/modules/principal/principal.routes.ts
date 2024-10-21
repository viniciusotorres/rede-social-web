import { Routes } from '@angular/router';

export const principalRoutes: Routes = [

    {
        path: '', redirectTo: 'entrar', pathMatch: 'full'
    },
    {
        path: 'entrar', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'registro', loadChildren: () => import('./register/register.routes').then(m => m.registerRoutes)
    },
    {
        path: 'esqueci-senha', loadComponent: () => import('./forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
    },
    {
        path: 'resetar-senha', loadComponent: () => import('./confirm-password/confirm-password.component').then(m => m.ConfirmPasswordComponent)
    }

];
