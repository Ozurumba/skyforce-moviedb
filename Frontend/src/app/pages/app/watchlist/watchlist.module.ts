import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchlistRoutingModule } from './watchlist-routing.module';
import { WatchlistComponent } from './watchlist.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [WatchlistComponent],
  imports: [
    CommonModule,
    IonicModule,
    WatchlistRoutingModule
  ]
})
export class WatchlistModule { }
