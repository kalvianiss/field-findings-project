import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-minus',
  templateUrl: './button-minus.component.html',
  styleUrls: ['./button-minus.component.css'],
})
export class ButtonMinusComponent implements OnInit {
  @Input() name: string = 'close';
  @Input() finance: boolean;
  @Input() btnW: boolean;
  @Input() refresh: boolean;
  constructor() {}

  ngOnInit(): void {
    this.name = this.name.toUpperCase();
  }
  checkType(valName) {
    let cssBtn;
    const temp = {
      Close: 'btn-cancel',
      cancel: 'btn-cancel',
    };
    cssBtn = temp[valName.toLowerCase()] ?? 'btn-cancel';
    return cssBtn;
  }
}
