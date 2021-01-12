import {MovieList} from './movielist';

export class User {
  username: string;
  name: string;
  email: string;
  _id: string;
  password: string;
  token?: string;
  group: string;
  movieCollection: MovieList[];
}
