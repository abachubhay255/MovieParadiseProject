import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  BASEURL: string;
  APIKEY: string;

  constructor(private http: HttpClient) {
    this.BASEURL = 'https://api.themoviedb.org/3/';
    this.APIKEY = 'e56c9b04b53586a718ad452bc7e096a3';
  }

  getPopularMovies(): Observable<any> {
    return this.http.get(this.BASEURL + `movie/popular?api_key=${this.APIKEY}&language=en-US&page=1&region=US`);
  }

  searchMovies(query: string, page: number): Observable<any> {
    return this.http.get(this.BASEURL + 'search/movie?api_key=' + this.APIKEY + '&language=en-US&query='
      + query + '&page=' + page + '&include_adult=false');
  }

  getTrailers(id: string){
    return this.http.get(this.BASEURL + 'movie/' + id + '/videos?api_key=' + this.APIKEY + '&language=en-US');
  }

  getWatchProviders(id: string){
    return this.http.get(this.BASEURL + 'movie/' + id + '/watch/providers?api_key=' + this.APIKEY);
  }

  getCast(id: string) {
    return this.http.get(this.BASEURL + 'movie/' + id + '/credits?api_key=' + this.APIKEY + '&language=en-US');
  }
}
