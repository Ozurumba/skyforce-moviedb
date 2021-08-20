import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesListingsPage } from './movies-listings.page';

const routes: Routes = [
  {
    path: '',
    component: MoviesListingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesListingsPageRoutingModule {}
