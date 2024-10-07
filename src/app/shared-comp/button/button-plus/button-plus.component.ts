import { Component, Input, OnInit } from '@angular/core';
import { LoadingService } from '../../service/loading.service';
import { TitleBreadcrumbService } from '../../service/title-breadcrumb.service';

@Component({
  selector: 'app-button-plus',
  templateUrl: './button-plus.component.html',
  styleUrls: ['./button-plus.component.css'],
})
export class ButtonPlusComponent implements OnInit {
  @Input() name: string = 'create';
  @Input() loading: boolean;
  @Input() typeBtn: string;
  @Input() btnCustom: boolean;
  @Input() loadBtn: boolean;
  @Input() finance: boolean;
  @Input() camera: boolean;
  @Input() postJurnal: boolean;
  @Input() reimbursementBtn: boolean;
  constructor(
    public titleService: TitleBreadcrumbService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.name = this.name.toUpperCase();
  }

  checkType(valName) {
    let cssBtn;
    const temp = {
      save: 'btn-plus',
      approve: 'btn-approve',
      download: 'btn-approve',
      pay: 'btn-approve',
      reject: 'btn-reject',
      cancel: 'btn-cancel',
      delete: 'btn-delete',
      remove: 'btn-delete',
      hapus: 'btn-delete',
      bayar: 'btn-approve',
      insert: 'btn-approve',
      load: 'btn-plus',
      post: 'btn-plus',
      template: 'btn-approve',
      unpost: 'btn-unpost',
      postJurnal: 'btn-post',
    };
    cssBtn = temp[valName.toLowerCase()] ?? 'btn-plus';
    return cssBtn;
  }
}
