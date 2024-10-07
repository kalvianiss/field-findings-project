import { Component, OnInit } from '@angular/core';
import { ErrorUnderdevelopment } from 'src/app/info/error-page-class';
import { BaseTitle } from './base-title.class';

@Component({ template: '' })
export abstract class BaseTab extends BaseTitle implements OnInit {
  tabList: any[];
  titleIndexTabs: any;

  constructor() {
    super();
    this.buildTab();
    this.sortTab();
  }

  ngOnInit(): void {
    if (this.tabList === undefined) {
      new ErrorUnderdevelopment();
    }
  }

  clickTab(ev: string) {
    localStorage.removeItem('schEndDate');
    localStorage.removeItem('schStartDate');
    localStorage.removeItem('schEndDateTemp');
    try {
      this.tabList.map((a) => (a.active = false));
      this.tabList.find((x) => x.getName() === ev).active = true;
    } catch (err) {
      this.tabList.map((a) => (a.active = false));
      this.tabList[0].active = true;
    }
    // this.tabList.find((x) => x.getName() === ev).refresh();
  }

  sortTab() {
    for (let c = 0; c < this.tabList.length; c++) {
      let found = this.title.allowedRoles.includes(this.tabList[c].roles);
      // if (!found) this.tabList.splice(c, 1);
    }
  }

  get tab(): any {
    let found = this.tabList.find((x) => x.active);
    return found;
  }

  pageChange($event) {
    this.tab?.pageChange($event);
  }
  pageChange2($event) {
    this.tab?.pageChange2($event);
  }

  sortTable($event) {
    this.tab?.sortTable($event);
  }
  sortTable2($event) {
    this.tab?.sortTable2($event);
  }

  searchAndFilter($ev) {
    this.tab?.searchAndFilter($ev);
  }
  searchAndFilter2($ev) {
    this.tab?.searchAndFilter2($ev);
  }

  tabFilter($event) {
    this.tab?.filter($event);
  }
  tabFilter2($event) {
    this.tab?.filter2($event);
  }

  refresh() {
    this.tab?.refresh();
  }

  tabSearch($event) {
    this.tab?.search($event);
  }
  refresh2() {
    this.tab?.refresh2();
  }

  tabSearch2($event) {
    this.tab?.search2($event);
  }

  callOnInit() {}
  abstract buildTab(): void;
}
