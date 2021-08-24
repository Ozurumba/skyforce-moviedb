import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'app', 
    loadChildren: './pages/tab-menu/tab-menu.module#TabMenuPageModule',
    canActivate: [AuthGuard], 
  },
  {
    path: 'overview', 
    loadChildren: './pages/app/dashboard/dashboard.module#DashboardPageModule',
    canActivate: [AuthGuard], 
  },
  {
    path: 'welcome', 
    loadChildren: './pages/app/welcome/welcome.module#WelcomePageModule',
    canActivate: [AuthGuard], 
  },
  { 
    path: 'search', 
    loadChildren: './pages/app/search/search.module#SearchPageModule',
  },
  {
    path: 'movies',
    loadChildren: './pages/app/movies/movies-listings/movies-listings.module#MoviesListingsPageModule',
    canActivate: [AuthGuard], 
  },
  {
    path: 'series',
    loadChildren: './pages/app/movies/movies-listings/movies-listings.module#MoviesListingsPageModule',
    canActivate: [AuthGuard], 
  },
 
  { 
    path: 'movies/:id', 
    loadChildren: './pages/app/movies/movies-details/movies-details.module#MoviesDetailsPageModule',
    canActivate: [AuthGuard],  
  },
  { 
    path: 'series/:id', 
    loadChildren: './pages/app/movies/movies-details/movies-details.module#MoviesDetailsPageModule' ,
    canActivate: [AuthGuard], 
  },
  
  {
    path: 'signup', 
    loadChildren: './pages/authentication/register/register.module#RegisterPageModule',
  },
  { 
    path: 'login', 
    loadChildren: './pages/authentication/login/login.module#LoginPageModule',
  },
  { 
    path: 'reset', 
    loadChildren: './pages/authentication/forgot-password/forgot-password.module#ForgotPasswordPageModule',
  },
  {
    path: 'settings',
    loadChildren: './pages/app/settings/settings.module#SettingsPageModule',
    canActivate: [AuthGuard], 
  },
  { 
    path: 'watchlist', 
    loadChildren: './pages/app/watchlist/watchlist.module#WatchlistModule'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
