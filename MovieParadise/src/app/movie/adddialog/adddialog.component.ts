import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../movie.component';
import {FormControl} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {MovieList} from '../../models/movielist';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-adddialog',
  templateUrl: './adddialog.component.html',
  styleUrls: ['./adddialog.component.css']
})
export class AdddialogComponent {
  selectedLists = new FormControl();
  movieListArray: MovieList[];
  constructor(
    public dialogRef: MatDialogRef<AdddialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UserService,
    private notification: NotificationService) {
    this.userService.getMovieLists().subscribe(
      res => {
        this.movieListArray = res;
      },
      err => {
        this.notification.notify(err, 'clear');
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
