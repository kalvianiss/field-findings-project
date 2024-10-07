import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
import { MY_DATE_FORMAT } from 'src/app/utils/constant';
import { validationMessages } from 'src/app/utils/pipe/errorKeys.pipe';
import * as moment from 'moment';
import { TitleBreadcrumbService } from '../service/title-breadcrumb.service';
import { LangService } from '../service/langservice.service';
import { lang } from 'src/app/lang/lang.interface';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
})
export class InputDateComponent implements OnInit {
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
  @Input() maxDate?: any;
  @Input() firstBill?: boolean;

  @Input() currencyMask: boolean;
  @Output() dateEmit = new EventEmitter();
  textHint?: string;

  fr: FormControl = new FormControl();
  @Output() dateStart = new EventEmitter();

  constructor(
    public title: TitleBreadcrumbService,
    private langService: LangService
  ) {}
  ngOnInit(): void {
    let dateUse = new Date();
    let date = +this.control.value;
    if (date > 0) {
      dateUse = new Date(date * 1000);
    }
    this.fr.setValue(dateUse);
    this.control.setValue(Math.floor(dateUse.getTime() / 1000));
  }

  openPicker(picker) {
    if (this.readonly) return;
    if (!picker) return;
    picker.open();
  }

  validateDate(input) {
    let valid = moment(input.value).isValid();
    if (!valid) {
      this.title.disableButton$.next(true);
      this.textHint = 'Date is invalid';
    } else {
      this.title.disableButton$.next(false);
      this.textHint = '';
    }
  }
  checkDate(y, m) {
    return new Date(y, m + 1, 0).getDate();
  }
  updateUnix(picker) {
    //validate date
    let x = picker._model.selection;
    let mindate = new Date(this.minDate);
    let defaultDate = new Date(x);
    if (this.minDate) {
      if (defaultDate < mindate) {
        this.control.setValue(new Date(this.minDate).getTime() / 1000);
        this.dateEmit.emit(new Date(this.minDate).getTime() / 1000);
        this.fr.setValue(new Date(this.minDate));
      } else {
        this.control.setValue(new Date(x).getTime() / 1000);
        this.dateEmit.emit(new Date(x).getTime() / 1000);
      }
      return;
    }
    this.control.setValue(new Date(x).getTime() / 1000);
    this.dateEmit.emit(new Date(x).getTime() / 1000);
  }
}
