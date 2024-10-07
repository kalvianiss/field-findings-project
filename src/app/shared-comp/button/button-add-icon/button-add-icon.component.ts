import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-add-icon',
  templateUrl: './button-add-icon.component.html',
  styleUrls: ['./button-add-icon.component.css'],
})
export class ButtonAddIconComponent implements OnInit {
  @Input() tenant: boolean;
  @Input() name: string;
  @Input() unposted: boolean;
  constructor() {}

  ngOnInit(): void {}
}
