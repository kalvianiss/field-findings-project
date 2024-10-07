import { Injectable } from '@angular/core';
export const customCurrencyMaskConfig = {
  align: 'right',
  allowNegative: false,
  allowZero: true,
  decimal: ',',
  precision: 0,
  prefix: '',
  suffix: '',
  thousands: '.',
  nullable: true,
};
export interface ISetting {
  date: 'DAY' | 'MONTH';
  view: 'TABLE' | 'CARD';
  labelMarketplace: 'URL' | 'PICTURE';
  invoiceMarketplace: 'URL' | 'PICTURE';
}

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  strongRegex: RegExp = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'
  );

  constructor() {}

  get setting(): ISetting {
    let s: ISetting = JSON.parse(localStorage.getItem('setting'));
    if (!s) {
      this.setting = null;
      s = JSON.parse(localStorage.getItem('setting'));
    }
    return s;
  }

  set setting(setting: ISetting) {
    setting
      ? localStorage.setItem('setting', JSON.stringify(setting))
      : localStorage.setItem('setting', JSON.stringify(this.defaultSetting()));
  }

  defaultSetting(): ISetting {
    return {
      date: 'MONTH',
      view: 'TABLE',
      labelMarketplace: 'PICTURE',
      invoiceMarketplace: 'PICTURE',
    };
  }

  checkPassword(s: string) {
    let result: string = `Password must be contain at least 1`;
    if (!new RegExp('(?=.*[a-z])').test(s))
      return `${result} lowercase character`;
    if (!new RegExp('(?=.*[A-Z])').test(s))
      return `${result} uppercase character`;
    if (!new RegExp('(?=.*[0-9])').test(s)) return `${result} number`;
    if (!new RegExp('(?=.*[!@#$%^&*])').test(s))
      return `${result} special character`;

    return result;
  }

  settingDateEnd(): number {
    switch (this.setting.date) {
      case 'DAY':
        return Math.round(new Date().setHours(23, 59, 59) / 1000);
      case 'MONTH':
        let date = new Date();
        return Math.round(
          new Date(date.getFullYear(), date.getMonth() + 1, 0).setHours(
            23,
            59,
            59
          ) / 1000
        );
    }
  }

  settingDateStart(): number {
    switch (this.setting.date) {
      case 'DAY':
        return Math.round(new Date().setHours(0, 0, 0) / 1000);
      case 'MONTH':
        let date = new Date();
        return Math.round(
          new Date(date.getFullYear(), date.getMonth(), 1).setHours(0, 0, 0) /
            1000
        );
    }
  }
  randomFileName(lengthText: number): string {
    const s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let result = '';
    const d = new Date();
    result += `${d.getDate() > 10 ? d.getDate() : `0${d.getDate() + 1}`}-${
      d.getMonth() + 1
    }-${d.getFullYear()}_`;
    for (let i = 0; i < lengthText; i++) {
      result += s.charAt(Math.floor(Math.random() * s.length));
    }
    return result;
  }
}
