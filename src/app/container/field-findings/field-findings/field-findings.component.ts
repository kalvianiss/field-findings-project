import { Component, OnInit } from '@angular/core';
import { BaseTab } from 'src/app/shared-comp/base-model/base-tab.class';
import { TabObjectFieldFindings } from 'src/app/tab-class/tab-object-field-findings';

@Component({
  selector: 'app-field-findings',
  templateUrl: './field-findings.component.html',
  styleUrls: ['./field-findings.component.css']
})
export class FieldFindingsComponent extends BaseTab {
  constructor() {
    super();
  }

  buildTab(): void {
    this.tabList = [new TabObjectFieldFindings()];
    this.sidebarPath = 'field-findings';
  }
}
