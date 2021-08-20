import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/model';
import { TmdbService } from 'src/app/providers/features/tmdb.service';
import { TrackService } from 'src/app/providers/features/track.service';
import { GlobalsProvider } from 'src/app/providers/core/globals';

@Component({
  selector: 'app-page-movie-detail',
  templateUrl: 'movies-details.page.html',
  styleUrls: ['movies-details.page.scss']
})
export class MoviesDetailsPage implements OnInit {

  movie: Movie;
  type: string = (this.globals.router.url.split('/')[1] !== 'movies') ? 'tv' : 'movie' ;
  title: string = (this.globals.router.url.split('/')[1] !== 'movies') ? 'tv shows' : 'movies' ;
  showToolbar = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tmdb: TmdbService,
    private globals: GlobalsProvider,
    private track: TrackService
  ) {}

  ngOnInit() {
    const movieId = this.activatedRoute.snapshot.params['id'];
    this.getMovieDetail(movieId);
    if (this.globals.platform.is('mobile')) {
      this.globals.splitPaneToggle = false;
    }
  }

  getMovieDetail(id: number) {
    this.tmdb.getMovieDetail(id, this.type).subscribe(res => {
      this.movie = res;
      this.track.viewMovie(id, this.movie.title);
    });
  }

  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >= 300;
    }
  }

  onPersonDetail(id: number) {
    this.router.navigate(['person-detail', id]);
  }

}
