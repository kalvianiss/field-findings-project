import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperServiceService {
  incomingChat$ = new Subject();
  notifyNewChat$ = new Subject();
  setUnreadChat$ = new Subject();

  constructor() {}

  changeDate(s: string) {
    const date = s.split('.')[0];
    return new Date(`${date}`);
  }
}
