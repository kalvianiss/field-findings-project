import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
// import { CurrencyMaskInputMode } from 'ngx-currency';
import { validationMessages } from 'src/app/utils/pipe/errorKeys.pipe';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  options = {
    prefix: '',
    thousands: ',',
    decimal: '.',
    precision: 2,
    // inputMode: CurrencyMaskInputMode.NATURAL,
  };
  @Input() finance: boolean;
  @Input() label = '';
  @Input() hint: string;
  @Input() hintLength: string;
  @Input() type = 'text';
  @Input() control: FormControl;
  @Input() placeholder?: string;
  @Input() suffixIcon?: string;
  @Input() textIcon?: string = '';
  @Input() messages = validationMessages;
  @Input() readonly?: boolean;
  @Input() prefixIcon?: boolean;
  @Input() maxlength?: number;
  @Input() noVa?: boolean;
  @Input() max: number;
  @Input() min: number;
  @Input() pointer?: boolean;
  @Input() inputNumber: boolean;
  @Input() hintColor?: boolean;
  @Input() pattern?: boolean;
  @Input() percent?: boolean;

  @Input() tRight: string;
  @Input() currencyMask: boolean;
  @Input() numbersOnly: boolean;
  @Input() price?: boolean;
  @Input() searchLocation?: boolean;
  @Output() visibleAction = new EventEmitter();
  @Output() actionOpenDialog = new EventEmitter();
  @Output() actionNumber = new EventEmitter();
  @Output() getCost = new EventEmitter();
  @Input() pasteVal = new EventEmitter();
  constructor() {}
  formatNumber = '[0-9]+([.,][0-9]+)?';
  ngOnInit(): void {
    if (this.pattern) {
      this.control.setValue(this.convertValue(this.control.value));
    }
  }
  convertValue(val) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      currencyDisplay: 'code',
    })
      .format(val)
      .replace('IDR', '')
      .trim();
  }
  setValue(val) {
    this.actionNumber.emit(val);
  }
  checkValue(event) {
    this.control.setValue(Math.abs(this.control.value));
  }

  inputValue(event) {
    event.preventDefault();
    this.control.setValue(event.target.value);
    event.stopPropagation();
  }
  checkInput(val) {
    if (this.pattern === undefined) return;
    let temp, join;
    var number_string = val.replace(/[^,\d]/g, '').toString(),
      split = number_string.split(','),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{1,3}/gi);

    if (ribuan) {
      let separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    let before = rupiah.replace(/([.,])(\d\d\d\D|\d\d\d$)/g, '$2');

    this.control.setValue(rupiah);

    if (before.split(',')[1]) {
      let afterComma = before.split(',')[1].trim();
      if (afterComma.length < 3) {
        temp = afterComma;
        localStorage.setItem('com', afterComma);
      } else {
        temp = localStorage.getItem('com');
      }
      join = rupiah.substring(0, rupiah.indexOf(',')) + ',' + temp;
      this.control.setValue(join);
    } else {
      join = rupiah;
    }

    let lastCost = join.replace('.', '').replace(',', '');
    this.getCost.emit(lastCost);
  }
}
