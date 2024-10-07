import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-under-development-dialog',
  templateUrl: './under-development-dialog.component.html',
  styleUrls: ['./under-development-dialog.component.css'],
})
export class UnderDevelopmentDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UnderDevelopmentDialogComponent>
  ) {}

  ngOnInit(): void {}
}
