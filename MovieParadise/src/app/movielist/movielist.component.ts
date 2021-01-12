import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {first} from 'rxjs/operators';
import {NotificationService} from '../services/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmdialogComponent} from '../movie/confirmdialog/confirmdialog.component';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css']
})
export class MovielistComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,
              private userService: UserService,
              private notification: NotificationService,
              private dialog: MatDialog) {
  }


  displayedColumns: string[] = ['Name', 'Movies', 'Actions'];
  dataSource;

  ngOnInit() {
    this.userService.getMovieLists().subscribe(
      res => {
        this.dataSource = res;
      },
      err => {
        this.notification.notify(err, 'clear');
      });
  }

  movies(listID) {
    this.router.navigate(['/movies', listID]);
  }

  onDeleteList(listID): void {
    const dialogRef = this.dialog.open(ConfirmdialogComponent, {
      width: '300px',
      data: {name: 'list'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.deleteList(listID);
      }
    });
  }

  deleteList(listID) {
    this.userService.deleteMovieList(listID).pipe(first()).subscribe(() => {
      this.dataSource = null;
      this.ngOnInit();
      this.notification.notify('List deleted', 'clear');
    });
  }
}
