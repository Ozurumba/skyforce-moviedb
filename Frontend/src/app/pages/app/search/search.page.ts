import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/model';
import { TmdbService } from 'src/app/providers/features/tmdb.service';

@Component({
  selector: 'app-page-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage {

  searchType: 'movies';
  searchInput = '';
  results: Movie[];

  constructor(
    private router: Router,
    private tmdb: TmdbService
  ) {}

  onInput(event: any) {
    // console.log(event.target.value, );
    this.performSearchMovies(event.target.value);
  }

  onClear(event: any) {
    this.results = null;
  }

  onMovieDetail(id: number) {
    this.router.navigate(['movie-detail', id]);
  }

  onSearchTypeChange() {
    this.results = null;
    this.performSearchMovies(this.searchInput);
  }

  private performSearchMovies(query: string) {
    this.tmdb.searchMovies(query).subscribe(res => {
      this.results = res;
      console.log('This is the result', this.results);
    });
  }

}
