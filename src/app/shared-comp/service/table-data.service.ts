import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableDataService {
  print$ = new Subject<any>();
  notify$ = new Subject<any>();
  notify2$ = new Subject<any>();
  generateJurnal$ = new Subject<any>();
  tabActive: string;
  dialog$ = new Subject<any>();
  dialog2$ = new Subject<any>();
  reset$ = new Subject<any>();
  reset2$ = new Subject<any>();
  // sortField$ = new Subject<any>();
  // sortDir$ = new Subject<any>();
  dataPrint$ = new Subject<any>();
  dropdownFilter$ = [];
  tableDisabledLoading$ = new Subject<any>();
}
