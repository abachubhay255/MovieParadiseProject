import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {User} from '../models/user';
import {MovieList} from '../models/movielist';
import {Movie} from '../models/movie';


@Injectable({providedIn: 'root'})
export class UserService {
  BASEURL: string;

  constructor(private http: HttpClient) {
    this.BASEURL = 'http://localhost:4000/user/';
  }

  register(user: User) {
    return this.http.post(this.BASEURL + `register`, user);
  }

  getMovieLists() {
    return this.http.get<MovieList[]>(this.BASEURL + `movielists`);
  }

  createMovieList(movieList: MovieList) {
    return this.http.post(this.BASEURL + `createmovielist`, movieList);
  }

  deleteMovieList(id: string) {
    return this.http.delete(this.BASEURL + `deletemovielist/` + id);
  }

  getMovies(listID: string) {
    return this.http.get<MovieList[]>(this.BASEURL + `movies/` + listID);
  }

  addMovie(movie: Movie, listID: string) {
    const req = movie;
    req.list = listID;
    return this.http.post(this.BASEURL + `addmovie`, req);
  }

  removeMovie(movieID: string, listID: string) {
    return this.http.delete(this.BASEURL + `removemovie/` + movieID + '/' + listID);
  }


}
