import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-plus-minus',
  templateUrl: './button-plus-minus.component.html',
  styleUrls: ['./button-plus-minus.component.css'],
})
export class ButtonPlusMinusComponent implements OnInit {
  @Output() dialogClose = new EventEmitter<any>();
  @Output() submit = new EventEmitter<any>();
  @Output() insert = new EventEmitter<any>();
  @Output() postBtn = new EventEmitter<any>();
  @Output() unpostBtn = new EventEmitter<any>();
  @Input() btnAdd: boolean;
  @Input() customCancel: string;
  @Input() customAdd: string;
  @Input() showHide: boolean;
  @Input() customW: boolean;
  @Input() customWCancel: boolean;
  @Input() btnInsert: boolean;
  @Input() template: string;
  @Input() post: boolean;
  @Input() unpost: boolean;
  @Input() reimbursementBtn: boolean;
  @Input() employee: boolean;
  @Input() hideCancel: boolean;
  constructor() {}

  ngOnInit(): void {}
}
