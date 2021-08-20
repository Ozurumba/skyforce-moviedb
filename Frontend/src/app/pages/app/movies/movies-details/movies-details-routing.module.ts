import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesDetailsPage } from './movies-details.page';

const routes: Routes = [
  {
    path: '',
    component: MoviesDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesDetailsPageRoutingModule {}
