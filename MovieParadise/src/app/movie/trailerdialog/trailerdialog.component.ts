import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../movie.component';

@Component({
  selector: 'app-trailerdialog',
  templateUrl: './trailerdialog.component.html',
  styleUrls: ['./trailerdialog.component.css']
})
export class TrailerdialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TrailerdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onCancel(): void {
    this.dialogRef.close();
  }

}
