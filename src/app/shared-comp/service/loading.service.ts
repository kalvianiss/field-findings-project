import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loadingAll$ = new BehaviorSubject<boolean>(false);
  loadingAll2$ = new BehaviorSubject<boolean>(false);
  loadingDialog$ = new BehaviorSubject<boolean>(false);
  loadingBtn$ = new BehaviorSubject<boolean>(false);
  loadingTable$ = new BehaviorSubject<boolean>(false);

  listData$ = new Subject<any>();
}
