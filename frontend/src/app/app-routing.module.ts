import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { MovieCatalogComponent } from './features/catalog/components/movie-catalog/movie-catalog.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { cartGuard } from './core/guards/cart/cart.guard';
import { vaultGuard } from './core/guards/vault/vault.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [authGuard],
    loadChildren: () =>
      import('../app/features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    canActivate: [authGuard],
    loadChildren: () =>
      import('../app/features/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    canActivate: [authGuard],
    loadChildren: () =>
      import('../app/features/landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
  },

  {
    path: 'catalog',
    canActivate: [authGuard, cartGuard,vaultGuard],
    loadChildren: () =>
      import('./features/catalog/catalog.module').then((m) => m.CatalogModule),
  },
  {
    path: 'details',
    canActivate: [authGuard, cartGuard,vaultGuard],

    loadChildren: () =>
      import('./features/movie-detail/movie-detail.module').then(
        (m) => m.MovieDetailModule
      ),
  },
  {
    path: 'cart',
    canActivate: [authGuard, cartGuard,vaultGuard],
    loadChildren: () =>
      import('./features/cart/cart.module').then((m) => m.CartModule),
  },
  {
    path:'vault',
    canActivate:[authGuard,cartGuard,vaultGuard],
    loadChildren:()=>import("./features/vault/vault.module").then((m)=>m.VaultModule)
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
