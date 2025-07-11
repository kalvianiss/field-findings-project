import { Component, OnInit } from '@angular/core';
import { BaseTab } from 'src/app/shared-comp/base-model/base-tab.class';
import { TabObjectTenantComplaint } from 'src/app/tab-class/tab-object-tenant-complaint';

@Component({
  selector: 'app-tenant-complaint',
  templateUrl: './tenant-complaint.component.html',
  styleUrls: ['./tenant-complaint.component.css']
})
export class TenantComplaintComponent extends BaseTab {
  constructor() {
    super();
  }

  buildTab(): void {
    this.tabList = [new TabObjectTenantComplaint()];
    this.sidebarPath = 'tenant-complaint';
  }
}
