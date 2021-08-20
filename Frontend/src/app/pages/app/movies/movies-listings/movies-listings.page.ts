import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalsProvider } from 'src/app/providers/core/globals';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-movies-listings',
  templateUrl: './movies-listings.page.html',
  styleUrls: ['./movies-listings.page.scss'],
})
export class MoviesListingsPage implements OnInit {

  @ViewChild(IonContent, { static: true }) content: IonContent;
  title: string = (this.globals.router.url.split('/')[2] !== 'movies') ? 'tv shows' : 'movies' ;
  type: string = (this.globals.router.url.split('/')[2] == null) ? this.globals.router.url.split('/')[1] : this.globals.router.url.split('/')[2] ;
  constructor(
    public globals: GlobalsProvider
  ) { }

  ngOnInit() {
    if (this.globals.platform.is('mobile')) {
      this.globals.splitPaneToggle = false;
    }
    if(this.globals.platform.is('tablet') || this.globals.platform.is('desktop')) {
      this.title = (this.globals.router.url.split('/')[1] !== 'movies') ? 'tv shows' : 'movies' ;
    }
    this.content.scrollToTop();
  }

}
