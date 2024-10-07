import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { TabObject } from 'src/app/tab-class/tab-object';
import { HelperServiceService } from '../service/helper-service.service';
import { TableDataService } from '../service/table-data.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class TabComponent implements OnInit, OnDestroy {
  @Input('tablist') tabList: TabObject[] = [];
  @Output() clicked = new EventEmitter<any>();
  @Output() keyTab = new EventEmitter<any>();
  @Input() tabsW: string;
  alive = true;
  setCustome: boolean;
  @Input() templateDocument: boolean;
  @Input() hrd: boolean;

  activeIdx: number = 0;
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public helper: HelperServiceService,
    public table: TableDataService
  ) {}

  ngOnDestroy(): void {
    this.alive = false;
  }

  ngOnInit(): void {
    let param: string = this.activatedRoute.snapshot.queryParams['tab'];
    let roles: string = this.activatedRoute.snapshot.queryParams['roles'];
    this.table.tabActive = roles;
    if (!param && this.tabList.length > 0) {
      param = this.tabList[0].name;
    }
    if (!param) {
      this.router.navigate(['info', 'no-data'], {
        skipLocationChange: true,
      });
      return;
    }
    this.setActive(param?.toLowerCase());
    this.clicked.emit(param?.toLowerCase());

    this.router.events.pipe(takeWhile(() => this.alive)).subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let tab = this.activatedRoute.snapshot.queryParams['tab'];
        if (tab) {
          this.setActive(tab);
          this.clicked.emit(tab.toLowerCase());
        }
      }
    });
  }

  private setActive(s: string) {
    if (!s) return;
    if (!this.tabList) return;
    this.activeIdx = this.tabList?.findIndex(
      (x) => s.toLowerCase() === x.name.toLowerCase()
    );
    if (this.activeIdx === -1) {
      this.activeIdx = 0;
    }
  }

  clickTab(ev: string, x: any) {
    this.table.tabActive = x.roles;
    this.keyTab.emit(ev);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        tab: ev,
        roles: x.roles,
        search: null,
        filter: x.defaultFilter,
      },
      queryParamsHandling: 'merge',
    });
  }
}
