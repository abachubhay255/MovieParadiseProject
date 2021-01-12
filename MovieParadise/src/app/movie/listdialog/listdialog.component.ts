import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from '../movie.component';

@Component({
  selector: 'app-listdialog',
  templateUrl: './listdialog.component.html',
  styleUrls: ['./listdialog.component.css']
})
export class ListdialogComponent{

  constructor(
    public dialogRef: MatDialogRef<ListdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onCancel(): void {
    this.dialogRef.close();
  }

}
