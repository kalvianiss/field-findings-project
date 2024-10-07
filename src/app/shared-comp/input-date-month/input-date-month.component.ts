import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MONTH_FORMAT,
  MO_FORMAT,
  MY_DATE_FORMAT,
} from 'src/app/utils/constant';
import { validationMessages } from 'src/app/utils/pipe/errorKeys.pipe';
@Component({
  selector: 'app-input-date-month',
  templateUrl: './input-date-month.component.html',
  styleUrls: ['./input-date-month.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MO_FORMAT },
  ],
})
export class InputDateMonthComponent implements OnInit {
  @Input() label = '';
  @Input() hint: string;
  @Input() hintLength: string;
  @Input() type = 'text';
  @Input() control: FormControl;
  @Input() placeholder?: string;
  @Input() suffixIcon?: string;
  @Input() messages = validationMessages;
  @Input() readonly?: boolean;
  @Input() prefixIcon?: boolean;
  @Input() maxlength?: number;
  @Input() minDate?: any;
  @Input() changeColor?: boolean;

  @Input() currencyMask: boolean;
  @Output() dateEmit = new EventEmitter();

  textHint?: string;

  fr: FormControl = new FormControl();
  @Output() dateStart = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    let dateUse = new Date();
    let date = +this.control.value;
    if (date > 0) {
      dateUse = new Date(date * 1000);
    }
    this.fr.setValue(dateUse);
    this.control.setValue(Math.floor(dateUse.getTime() / 1000));
    if (this.changeColor) {
      setTimeout(() => {
        let myRow = document.getElementById('form-input');
        let arr;
        arr = myRow.querySelector('.mat-form-field-infix') as HTMLInputElement;
        arr.style.backgroundColor = '#FFFFFF';
      }, 1000);
    }
  }
  openPicker(picker) {
    if (this.readonly) return;
    if (!picker) return;
    picker.open();
  }
  updateUnix(event, dp) {
    dp.close();
    this.control.setValue(event.unix());
    this.dateEmit.emit(this.control.value);
    this.fr.setValue(event);
  }
}
