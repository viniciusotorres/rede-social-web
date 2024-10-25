import { Routes } from '@angular/router';
import { AuthGuard } from './modules/core/guards/auth.guard';
import { AuthenticatedGuard } from './modules/core/guards/authenticated.guard';

export const routes: Routes = [
    {
        path: '', redirectTo: 'inicio', pathMatch: 'full'
    },
    {
        path: 'inicio', loadChildren: () => import('./modules/principal/principal.routes')
        .then(m => m.principalRoutes), canActivate: [AuthenticatedGuard]
    },
    {
        path: 'feed', loadChildren: () => import('./modules/internal/feeds/feeds.routes')
        .then(m => m.feedRoutes), canActivate: [AuthGuard]
    }
];