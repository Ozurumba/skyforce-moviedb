import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabMenuPage } from './tab-menu.page';

const routes: Routes = [
  {
    path: "",
    component: TabMenuPage,
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            loadChildren: '../app/dashboard/dashboard.module#DashboardPageModule'
          }
        ]
      },
      {
        path: 'movies',
        children: [
          {
            path: '',
            loadChildren: '../app/movies/movies-listings/movies-listings.module#MoviesListingsPageModule'
          }
        ]
      },
      {
        path: 'series',
        children: [
          {
            path: '',
            loadChildren: '../app/movies/movies-listings/movies-listings.module#MoviesListingsPageModule'
          }
        ]
      },
      {
        path: 'watchlist',
        children: [
          {
            path: '',
            loadChildren: '../app/movies/movies-listings/movies-listings.module#MoviesListingsPageModule'
          }
        ]
      },
      { 
        path: 'movies/:id', 
        loadChildren: '../app/movies/movies-details/movies-details.module#MoviesDetailsPageModule' 
      },
      { 
        path: 'series/:id', 
        loadChildren: '../app/movies/movies-details/movies-details.module#MoviesDetailsPageModule' 
      },
      { 
        path: 'watchlist/:id', 
        loadChildren: '../app/movies/movies-details/movies-details.module#MoviesDetailsPageModule' 
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: '../app/settings/settings.module#SettingsPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/app/dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabMenuPage]
})
export class TabMenuPageModule {}
