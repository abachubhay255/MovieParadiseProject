import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(public snackBar: MatSnackBar) {}

  public notify(message, action): void {
    this.snackBar.open(message, action, { duration: 2000 });
  }
}
