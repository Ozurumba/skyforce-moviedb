import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { Movie, Person } from 'src/app/models/model';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly params = {
    api_key: '01eccc8f525522a52f32771024aec40d',
    // api_key: '54f328a5af7810d70d6797009e225fe4',
    language: 'en-US'
  };

  constructor(
    private http: HttpClient
  ) {}

  getMovies(page: number, type: string) {
    return this.http.get(`${this.baseUrl}/movie/${type}${this.getParams({ page: page })}`)
      .pipe(map((res: any) => <Movie[]>res.results))
      .pipe(delay(500));
  }

  addToWatchList(payload: any) {
    let url = 'https://grupa-app-api.herokuapp.com';
    return this.http.post(`${url}/api/v1/wishlist/add`, payload,  {
      observe: 'body',    
      headers:  new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  // Function to get list of watchlist
  getWatchList(item: any) {
    let url = 'https://grupa-app-api.herokuapp.com';
    return this.http.get(`${url}/api/v1/wishlist/${item}`,   {
      observe: 'body',    
      headers:  new HttpHeaders({
        'Content-Type': 'application/json',
      })
    });
  }

  getSeries(page: number, type: string) {
    return this.http.get(`${this.baseUrl}/tv/${type}${this.getParams({ page: page })}`)
      .pipe(map((res: any) => <Movie[]>res.results))
      .pipe(delay(500));
  }

  get(page: number, collection: string, type: string) {
    return this.http.get(`${this.baseUrl}/${collection}/${type}${this.getParams({ page: page })}`)
      .pipe(map((res: any) => <Movie[]>res.results))
      .pipe(delay(500));
  }

  searchMovies(query: string) {
    let page = 1;
    let include_adult = false
    let movie = 'movies';
    let url = 'https://api.themoviedb.org/3/search/movie';
    return this.http.get(`${url}/search/${movie}${this.getParams({ query: query })}${page}${include_adult}`)
      .pipe(map((res: any) => <Movie[]>res.results));
  }

  getMovieDetail(id: number, type: string) {
    const append = '&append_to_response=credits';
    return this.http.get<Movie>(`${this.baseUrl}/${type}/${id}${this.getParams()}${append}`);
  }

  private getParams(params?: any) {
    const obj = { ...this.params, ...params };
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    }
    return '?' + str.join('&');
  }

}
