import { Component, OnInit, Input } from '@angular/core';
import { TmdbService } from 'src/app/providers/features/tmdb.service';
import { Movie } from 'src/app/models/model';
import { GlobalsProvider } from 'src/app/providers/core/globals';

@Component({
  selector: 'movies-scroll',
  templateUrl: './movies-scroll.component.html',
  styleUrls: ['./movies-scroll.component.scss'],
})
export class MoviesScrollComponent implements OnInit {

  sliderOpts: any = {
    zoom: false,
    slidesPerView: 0,
    slideShadows: true,
    // centeredSlides: true,
    spaceBetween: 10
  };
  paginate: any = [];
  loader: boolean = false;
  movies: Movie[];
  @Input() type: string;
  @Input() collection: string = "movies";
  @Input() slideCount: any = 0;
  constructor(
    private tmdb: TmdbService,
    private globals: GlobalsProvider
  ) {
  }

  onMovieDetail(id: number) {
    this.globals.router.navigate([this.collection, id]);
  }

  onNextPage() {
    this.paginate[this.type]++;
    this.loadMovies();
  }

  public async loadMovies() {
    let service;
    this.loader = true;
    service = (this.collection == 'series') 
      ? this.tmdb.getSeries(this.paginate[this.type], this.type)
      : this.tmdb.getMovies(this.paginate[this.type], this.type);
    service.subscribe(res => {
      this.loader = false;
      if (!this.movies) { this.movies = []; }
      this.movies = this.movies.concat(res);
    }, err => {
      this.loader = false;
      this.movies = [];
    });
  }

  ngOnInit() {
    this.paginate[this.type] = 1;
    this.loadMovies();
    this.sliderOpts.slidesPerView = (this.slideCount == 0) ? 3.5 : this.slideCount ;
  }

}
