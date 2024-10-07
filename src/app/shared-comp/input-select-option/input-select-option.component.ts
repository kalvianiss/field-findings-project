import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-select-option',
  templateUrl: './input-select-option.component.html',
  styleUrls: ['./input-select-option.component.css'],
})
export class InputSelectOptionComponent implements OnInit {
  @Input() label = '';
  @Input() arrList: any = [];
  @Input() fControl: FormControl;
  @Input() disabled: boolean;
  @Input() changeColor: boolean;
  @Output() changeValue = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    if (this.changeColor) {
      setTimeout(() => {
        let myRow = document.getElementById('selectForm');
        let arr;
        arr = myRow.querySelector('.mat-form-field-infix') as HTMLInputElement;
        arr.style.backgroundColor = '#FFFFFF';
      }, 1000);
    }
  }
}
