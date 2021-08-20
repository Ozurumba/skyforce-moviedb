import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/models/model';
import { TmdbService } from 'src/app/providers/features/tmdb.service';
import { GlobalsProvider } from 'src/app/providers/core/globals';

@Component({
  selector: 'movies-boxes',
  templateUrl: './movies-boxes.component.html',
  styleUrls: ['./movies-boxes.component.scss'],
})
export class MoviesBoxesComponent implements OnInit {

  paginate: any = [];
  loader: boolean = false;
  movies: Movie[];
  @Input() type: string;
  @Input() collection: string = "movies";
  @Input() moviesCount: any = 0;
  constructor(
    private tmdb: TmdbService,
    private globals: GlobalsProvider
  ) {
  }

  onNextPage() {
    this.paginate[this.type]++;
    this.loadMovies();
  }

  onMovieDetail(id: number) {
    this.globals.router.navigate([this.collection, id]);
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
  }

}
