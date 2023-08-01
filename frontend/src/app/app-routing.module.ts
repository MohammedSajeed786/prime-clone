import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { MovieCatalogComponent } from './features/catalog/components/movie-catalog/movie-catalog.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [authGuard],
    loadChildren: () =>
      import('../app/features/login/login.module').then((m) => m.LoginModule),
    // component: LoginComponent,
  },
  {
    path: 'register',
    canActivate: [authGuard],
    loadChildren: () =>
      import('../app/features/register/register.module').then(
        (m) => m.RegisterModule
      ),
    // component: RegisterComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadChildren: () =>
      import('../app/features/landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
    // component: RegisterComponent,
  },

  {
    path: 'catalog',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/catalog/catalog.module').then(
        (m) => m.CatalogModule
      ),
    // component: MovieCatalogComponent,
  },
  {
    path: '**',
    redirectTo: 'catalog',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
