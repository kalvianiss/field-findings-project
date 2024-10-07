import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Sidebar } from 'src/app/model/sidebar-class';

@Injectable({
  providedIn: 'root',
})
export class TitleBreadcrumbService {
  updateSidebar$ = new Subject<Sidebar>();
  allowedRoles: string[] = [];
  disableButton$ = new Subject();
  info$ = new Subject<any>();
  listSidebar$ = new BehaviorSubject<any>([]);

  constructor() {}
}
