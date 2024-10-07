import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppModule } from 'src/app/app.module';
import { ErrorUnderdevelopmentDialog } from 'src/app/info/error-page-class';
import {
  FIND_SIDEBAR,
  LIST_SIDEBAR,
  Sidebar,
} from 'src/app/model/sidebar-class';
import { TabObject } from 'src/app/tab-class/tab-object';
import { LoadingService } from '../service/loading.service';
import { TitleBreadcrumbService } from '../service/title-breadcrumb.service';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Component({ template: '' })
export abstract class BaseTitle implements AfterViewInit {
  sidebarPath: string;
  pathId?: number;
  title: TitleBreadcrumbService;
  matDialog: MatDialog;
  loadingService: LoadingService;
  dataSource = new MatTreeNestedDataSource<Sidebar>();

  constructor() {
    this.title = AppModule.injector.get(TitleBreadcrumbService);
    this.loadingService = AppModule.injector.get(LoadingService);
  }

  ngAfterViewInit(): void {
    let f = FIND_SIDEBAR(LIST_SIDEBAR,
      // localStorage.getItem('tokenHo') ? LIST_SIDEBAR_HO : LIST_SIDEBAR,
      this.sidebarPath
    );
    if (f) this.title.updateSidebar$.next(f);
  }

  call($event) {
    try {
      this[$event]();
    } catch (e) {
      if (e instanceof TypeError) {
        new ErrorUnderdevelopmentDialog();
      }
    }
  }

  callTabMethod($event) {
    try {
      this.tab[$event]();
    } catch (e) {
      if (e instanceof TypeError) {
        new ErrorUnderdevelopmentDialog();
      }
    }
  }

  callTableRowFunction($event) {
    try {
      this.tab[$event.key]($event);
    } catch (e) {
      if (e instanceof TypeError) {
        new ErrorUnderdevelopmentDialog();
      }
    }
  }

  abstract get tab(): TabObject;
}
