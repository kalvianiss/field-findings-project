import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { UIConfig } from 'src/app/model/table-model';
import { BaseRest } from 'src/app/shared-comp/base-model/base-rest-class';
import { BaseTab } from 'src/app/shared-comp/base-model/base-tab.class';
import { ImageService } from 'src/app/shared-comp/service/image.service';
import { RemoveSperatorService } from 'src/app/shared-comp/service/remove-sperator.service';
import { RestComplaintService } from 'src/app/shared-comp/service/rest-complaint.service';
import { RestTenantOfficeService } from 'src/app/shared-comp/service/rest-tenant-office.service';
import { RestUnitService } from 'src/app/shared-comp/service/rest-unit.service';
import { SnackbarService } from 'src/app/shared-comp/service/snackbar.service';
import { TabObjectTenantComplaint } from 'src/app/tab-class/tab-object-tenant-complaint';

@Component({
  selector: 'app-tenant-complaint-detail',
  templateUrl: './tenant-complaint-detail.component.html',
  styleUrls: ['./tenant-complaint-detail.component.css']
})
export class TenantComplaintDetailComponent extends BaseTab {
  @Input() titleIndex: any = null;
  @Input() data: any;
  showNavigationArrows = true;
  showNavigationIndicators = true;
  images = ['image-container.png', 'img-example.png'].map(
    (n) => `../assets/images/${n}`
  );
  complaintList: any = null;
  complaintId: number;
  tableConfig: UIConfig;
  isPrevious: boolean = true;
  isNext: boolean = false;
  typeDetail = null;
  imagePrev;
  imageNext;
  constructor(
    private restComplaintService: RestComplaintService,
    private dialog: MatDialog,
    private snacbarService: SnackbarService,
    public removeString: RemoveSperatorService,
    private restUnit: RestUnitService,
    private restTenantOffice: RestTenantOfficeService,
    private imageService: ImageService
  ) {
    super();
  }

  buildTab(): void {
    this.tabList = [new TabObjectTenantComplaint()];
    this.sidebarPath = 'tenant-complaint';
  }

  override ngOnInit(): void {
    this.refresh();
    this.complaintId =
      AppModule.injector.get(ActivatedRoute).snapshot.queryParams['id'];
    this.typeDetail =
      AppModule.injector.get(ActivatedRoute).snapshot.queryParams['type'];
  }

  checkStatus(val) {
    let css = '';
    if (val === 'OPEN' || val === 'ON PROGRESS' || val === 'ON_PROGRESS') {
      css = 'box-status-warning';
    } else if (val === 'WAITING WORKING HOUR') {
      css = 'box-status-waiting';
    } else if (val === 'UPDATE INQUIRY ITEM') {
      css = 'box-status-update';
    } else if (
      val === 'PENDING' ||
      val === 'SET DEPARTMENT' ||
      val === 'SET EMPLOYEE' || 'SET_EMPLOYEE' ||
      val === 'WAITING MATERIAL' ||
      val === 'WAITING TENANT' ||
      val === 'WAITING CHIEF' ||
      val === 'WAITING TR' ||
      val === 'WAITING PAYMENT' || 
      val === 'ON CHECK' ||
      val === 'ON_CHECK'
    ) {
      css = 'box-status-warning';
    } else if (
      val === 'DECLINED' ||
      val === 'CLOSED' ||
      val === 'INQUIRY ITEM DECLINE'
    ) {
      css = 'box-status-red';
    } else if (val === 'FINISHED' || val === 'APPROVED WORKING HOUR') {
      css = 'box-status-success';
    }
    return css;
  }

  openImg(val) {
    window.open(val, '_blank');
  }
  previousStep() {
    if (!this.isNext) return;
    this.isPrevious = true;
    this.isNext = false;
    this.imagePrev = this.complaintList?.image;
  }

  nextStep() {
    if (this.isNext) return;
      this.isNext = true;
      this.isPrevious = false;
      this.imagePrev = this.complaintList?.afterImage;
  }

  override refresh() {
    super.refresh();
    let idComplaint =
      AppModule.injector.get(ActivatedRoute).snapshot.queryParams['id'];
    BaseRest.build(this.restComplaintService)
      .callRest('printComplaintByid', (v) => {
        let test = v.content.progresses.sort((a, b) => {
          return a.dateCreated - b.dateCreated;
        });
        this.complaintList = v.content;
        if (this.complaintList.unitId) {
          this.complaintList = {
            ...this.complaintList,
            noUnit: v.content.noUnit,
            unitName: v.content.typeUnit,
            towerUnit: v.content.towerUnit,
          };
        }else{
          this.complaintList = {
            ...this.complaintList,
            noSiup: v.content.noSiup,
            unitName: v.content.unitName,
            namaPt: v.content.namaPt,
          };
        }
        // if (this.complaintList.unitId) {
        //   BaseRest.build(this.restUnit)
        //     .callRest('printComplaintByid', (v) => {
        //       this.complaintList = {
        //         ...this.complaintList,
        //         noUnit: v.content.noUnit,
        //         unitName: v.content.typeUnit,
        //         towerUnit: v.content.towerUnit,
        //       };
        //     })
        //     .params(this.complaintList?.unitId);
        // }

        // if (this.complaintList.officeTenantId) {
        //   BaseRest.build(this.restTenantOffice)
        //     .callRest('printComplaintByid', (v) => {
        //       this.complaintList = {
        //         ...this.complaintList,
        //         noSiup: v.content.noSiup,
        //         unitName: v.content.unitName,
        //         namaPt: v.content.namaPt,
        //       };
        //     })
        //     .params(this.complaintList.officeTenantId);
        // }
        this.imagePrev = this.complaintList?.image;
        this.imageNext = this.complaintList?.afterImage;
        this.tableConfig = v.uiConfig;
      })
      .params(+idComplaint);
  }
  changeBtn(x) {
    let color = null;
    switch (x) {
      case 'addProgress':
      case 'assignDept':
      case 'assignStaff':
        color = 'btn-assign';
        break;
      case 'cancelInquiry':
        color = 'btn-cancel';
        break;
      case 'forceToFinish':
        color = 'btn-force';
        break;
      default:
        break;
    }
    return color;
  }

  printTenantComplaint() {
    let arr = [];
    BaseRest.build(this.restComplaintService)
      .callRest('printComplaintByid', (v) => {
        arr.push(v.content);
        localStorage.setItem('print-tenant-complaint-custom', JSON.stringify(arr));
        window.open(
          `print/print-tenant-complaint?id=${this.complaintId}&type=${this.typeDetail}`,
          '_blank'
        );
        // window.open(
        //   `https://web.nimbus9.tech/ff/print/print-field-findings?id=${this.complaintId}&type=${this.typeDetail}`,
        //   '_blank'
        // );
      })
      .params(this.complaintId);
    }
}
