import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageService } from 'src/app/shared-comp/service/image.service';

@Component({
  selector: 'app-preview-image-dialog',
  templateUrl: './preview-image-dialog.component.html',
  styleUrls: ['./preview-image-dialog.component.css'],
})
export class PreviewImageDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PreviewImageDialogComponent>
  ) {}

  ngOnInit(): void {}
}
