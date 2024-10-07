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
import * as moment from 'moment';
import { MY_DATE_FORMAT } from 'src/app/utils/constant';
import { validationMessages } from 'src/app/utils/pipe/errorKeys.pipe';
// import { TitleBreadcrumbService } from '../service/title-breadcrumb.service';

@Component({
  selector: 'app-input-date-range',
  templateUrl: './input-date-range.component.html',
  styleUrls: ['./input-date-range.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
})
export class InputDateRangeComponent implements OnInit {
  @Input() labelStart = '';
  @Input() labelEnd = '';
  @Input() column: boolean;
  @Input() hint: string;
  @Input() hintLength: string;
  @Input() type = 'text';
  @Input() dateStart: FormControl;
  @Input() dateEnd: FormControl;
  @Input() placeholder?: string;
  @Input() suffixIcon?: string;
  @Input() messages = validationMessages;
  @Input() readonly?: boolean;
  @Input() prefixIcon?: boolean;
  @Input() maxlength?: number;
  @Input() minDate?: any;

  @Input() currencyMask: boolean;
  @Output() dateEmit = new EventEmitter();
  textHint?: string;
  constructor(
    // public title: TitleBreadcrumbService
  ) {}

  ngOnInit(): void {
    if (!this.dateStart.value && !this.dateEnd.value) {
      this.dateStart = new FormControl(moment());
      this.dateEnd = new FormControl(moment());
    } else {
      this.dateStart = new FormControl(new Date(this.dateStart.value * 1000));
      this.dateEnd = new FormControl(new Date(this.dateEnd.value * 1000));
    }
    this.setDate();
  }

  updateUnix(picker) {
    //validate date

    let x = picker._model.selection;
    let endOfMonth = new Date(
      moment(new Date(x.unix() * 1000))
        .clone()
        .endOf('month')
        .format('YYYY-MM-DD hh:mm')
    );
    if (moment(this.dateEnd.value).unix() < x.unix()) {
      this.dateEnd.setValue(endOfMonth);
    } else {
      this.dateEnd.setValue(endOfMonth);
    }
    this.setDate();
  }
  setDate() {
    this.dateEmit.emit({
      dateStart: this.dateStart,
      dateEnd: this.dateEnd,
    });
  }
  validateDate(input) {
    let valid = moment(input.value, 'DD-MM-YYYY', true).isValid();
    if (!valid) {
      // this.title.disableButton$.next(true);
      this.textHint = 'Date is invalid';
    } else {
      // this.title.disableButton$.next(false);
      this.textHint = '';
    }
  }
}
