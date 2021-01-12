import {Component, OnInit} from '@angular/core';
import {MovieService} from '../services/movie.service';
import {UserService} from '../services/user.service';
import {MovieList} from '../models/movielist';
import {MatDialog} from '@angular/material/dialog';
import {ListdialogComponent} from './listdialog/listdialog.component';
import {AdddialogComponent} from './adddialog/adddialog.component';
import {Movie} from '../models/movie';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {TrailerdialogComponent} from './trailerdialog/trailerdialog.component';
import {NotificationService} from '../services/notification.service';
import {ConfirmdialogComponent} from './confirmdialog/confirmdialog.component';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  displayMovies;
  newMovieList: MovieList;
  newMovieListName: string;
  listsToBeAddedTo: string[] = [];
  isHome: boolean;
  currentList: string;
  searchQuery: string;
  isSearch: boolean;

  constructor(private movieService: MovieService,
              private userService: UserService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router,
              private sanitizer: DomSanitizer,
              private notification: NotificationService
  ) {
    this.newMovieListName = '';
    this.isHome = true;
    this.searchQuery = '';
    this.isSearch = false;
  }

  ngOnInit() {
    if (this.router.url === '/accounthome') {
      this.getPopularMovies();
    } else {
      this.isHome = false;
      this.route.params.subscribe((params) => {
        this.currentList = params.id;
        this.userService.getMovies(params.id).subscribe(
          movies => {
            this.displayMovies = movies;
            this.getTrailers();
            this.getWatchProviders();
            this.getCast();
          },
          err => {
            this.notification.notify(err, 'clear');
          });
      });
    }
  }

  onViewTrailer(movieTrailer: string): void {
    this.dialog.open(TrailerdialogComponent, {
      width: '600px',
      data: {name: movieTrailer}
    });
  }

  getTrailers() {
    for (const movie of this.displayMovies) {
      this.movieService.getTrailers(movie.id).subscribe((trailers: any) => {
          for (const trailer of trailers.results) {
            if (trailer.type === 'Trailer' && trailer.site === 'YouTube') {
              movie.trailer = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + trailer.key);
              return;
            }
          }
          movie.trailer = '';
        },
        err => {
          this.notification.notify(err, 'clear');
        });
    }
  }

  getWatchProviders() {
    for (const movie of this.displayMovies) {
      this.movieService.getWatchProviders(movie.id).subscribe((watchProviders: any) => {
          if (watchProviders.results.US) {
            movie.watchProviders = watchProviders.results.US.link;
          }
        },
        err => {
          this.notification.notify(err, 'clear');
        });
    }
  }

  getPopularMovies() {
    this.movieService.getPopularMovies().subscribe(
      res => {
        this.displayMovies = res.results;
        this.getTrailers();
        this.getWatchProviders();
        this.getCast();
      });
  }

  getCast() {
    for (const movie of this.displayMovies) {
      this.movieService.getCast(movie.id).subscribe((result: any) => {
        let i = 0;
        movie.members = [];
        for (const member of result.cast) {
            if (i < 5){
              movie.members.push(member);
            }
            i++;
          }
        },
        err => {
          this.notification.notify(err, 'clear');
        });
    }
  }

  searchMovies() {
    if (this.searchQuery.length > 3) {
      this.isSearch = true;
      this.movieService.searchMovies(this.searchQuery, 1).subscribe(res => {
        this.displayMovies = res.results;
        this.getTrailers();
        this.getWatchProviders();
        this.getCast();
      });
    } else {
      this.getPopularMovies();
    }
  }

  onAddMovie(movie: Movie): void {
    const dialogRef = this.dialog.open(AdddialogComponent, {
      width: '250px',
      data: {lists: this.listsToBeAddedTo}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.value) {
        this.listsToBeAddedTo = result.value;
        if (this.listsToBeAddedTo.length > 0) {
          this.addMovie(movie);
        }
      }
    });
  }

  addMovie(movie: Movie) {
    for (const list of this.listsToBeAddedTo) {
      this.userService.addMovie(movie, list).subscribe(res => {
          this.notification.notify('Movie added successfully', 'clear');
        },
        err => {
          this.notification.notify(err, 'clear');
        });
    }
  }

  onRemoveMovie(movie: any): void {
    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      width: '350px',
      data: {name: 'movie'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.removeMovie(movie);
      }
    });
  }

  removeMovie(movie: any) {
    this.userService.removeMovie(movie.id, this.currentList).subscribe(res => {
        this.displayMovies = null;
        this.ngOnInit();
        this.notification.notify('Movie Removed', 'clear');
      },
      err => {
        this.notification.notify(err, 'clear');
      });
  }

  onCreateMovieList(): void {
    const dialogRef = this.dialog.open(ListdialogComponent, {
      width: '250px',
      data: {name: this.newMovieListName}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.newMovieListName = result;
      if (this.newMovieListName) {
        this.addMovieList();
      }
    });
  }

  addMovieList() {
    this.newMovieList = {
      movies: [],
      name: this.newMovieListName
    };
    this.userService.createMovieList(this.newMovieList).subscribe(
      res => {
        this.notification.notify('Movie list added', 'clear');
      },
      err => {
        this.notification.notify(err, 'clear');
      });
  }
}
