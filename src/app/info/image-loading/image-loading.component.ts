import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-loading',
  templateUrl: './image-loading.component.html',
  styleUrls: ['./image-loading.component.css'],
})
export class ImageLoadingComponent implements OnInit {
  @Input() custom: boolean;
  @Input() text: string;
  @Input() relative: boolean;
  constructor() {}

  ngOnInit(): void {}
}
