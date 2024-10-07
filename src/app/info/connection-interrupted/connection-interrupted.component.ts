import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-connection-interrupted',
  templateUrl: './connection-interrupted.component.html',
  styleUrls: ['./connection-interrupted.component.css'],
})
export class ConnectionInterruptedComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConnectionInterruptedComponent>
  ) {}

  ngOnInit(): void {}
}
