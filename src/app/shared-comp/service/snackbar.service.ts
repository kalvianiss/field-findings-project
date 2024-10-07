import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  public createError(c: string) {
    let title = 'ERROR';
    this.buildMsg(c, title);
  }

  public createSuccess(c: string) {
    let title = 'SUCCESS';
    this.buildMsg(c, title);
  }

  createInfo(msg: string) {
    let title = 'INFO';
    this.buildMsg(msg, title);
  }

  private buildMsg(message, title) {
    this.snackBar.open(message, title, {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'end',
      // panelClass: ['success'],
    });
  }
}
