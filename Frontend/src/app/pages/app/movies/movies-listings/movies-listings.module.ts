import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoviesListingsPageRoutingModule } from './movies-listings-routing.module';

import { MoviesListingsPage } from './movies-listings.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MoviesListingsPageRoutingModule
  ],
  declarations: [MoviesListingsPage]
})
export class MoviesListingsPageModule {}
