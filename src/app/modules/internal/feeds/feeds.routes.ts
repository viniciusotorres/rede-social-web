import { Routes } from '@angular/router';

export const feedRoutes: Routes = [

    {
        path: '', redirectTo: 'principal', pathMatch: 'full'
    },
    {
        path: 'principal', loadComponent: () => import('./feed-principal/feed-principal.component').then(m => m.FeedPrincipalComponent)
    }

];
