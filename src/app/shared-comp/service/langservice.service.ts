import { Injectable } from '@angular/core';
export type LangList = 'en' | 'id';
@Injectable({
  providedIn: 'root',
})
export class LangService {
  constructor() {}

  get lang(): LangList {
    let r = localStorage.getItem('lang') as LangList;
    return r ? r : 'en';
  }

  set lang(lang: LangList) {
    localStorage.setItem('lang', lang);
  }
}
