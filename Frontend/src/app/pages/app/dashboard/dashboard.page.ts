import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie } from 'src/app/models/model';
import { Router } from '@angular/router';
import { LoadingController, IonContent } from '@ionic/angular';
import { TmdbService } from 'src/app/providers/features/tmdb.service';
import { GlobalsProvider } from 'src/app/providers/core/globals';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  segment: string;
  page: number;
  movies: Movie[];
  @ViewChild(IonContent, { static: true }) content: IonContent;

  constructor(
    public router: Router,
    public globals: GlobalsProvider,
    public loadingCtrl: LoadingController,
    public tmdb: TmdbService
  ) {
  }

  ngOnInit() {
    this.content.scrollToTop();
    if (this.globals.platform.is('mobile')) {
      this.globals.splitPaneToggle = false;
    }
  }

  onMovieDetail(id: number) {
    this.router.navigate(['movie-detail', id]);
  }

  onSearch() {
    this.router.navigate(['search']);
  }

}
