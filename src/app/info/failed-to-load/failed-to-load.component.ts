import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-failed-to-load',
  templateUrl: './failed-to-load.component.html',
  styleUrls: ['./failed-to-load.component.css'],
})
export class FailedToLoadComponent implements OnInit {
  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: any,
    // public dialogRef: MatDialogRef<FailedToLoadComponent>
  ) {}

  ngOnInit(): void {}
}
