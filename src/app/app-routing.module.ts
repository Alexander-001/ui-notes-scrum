import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  canActivateAuthGuard,
  canMatchAuthGuard,
} from './auth/guards/auth.guard';
import {
  canActivatePublicGuard,
  canMatchPublicGuard,
} from './auth/guards/public.guard';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module'),
    canActivate: [canActivatePublicGuard],
    canMatch: [canMatchPublicGuard],
  },
  {
    path: 'notes',
    loadChildren: () => import('./notes/notes.module'),
    canActivate: [canActivateAuthGuard],
    canMatch: [canMatchAuthGuard],
  },
  {
    path: '404',
    component: Error404PageComponent,
  },
  {
    path: '',
    redirectTo: 'notes',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
