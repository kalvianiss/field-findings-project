import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { takeWhile } from 'rxjs';
import {
  ActionList,
  TableConfigList,
  UIConfig,
} from 'src/app/model/table-model';
import { miniIcon } from 'src/app/utils/icon-registry';
import { BaseResponseInterface } from '../service/basecrud.service';
import { TableComponent } from '../table/table.component';
import { AppModule } from 'src/app/app.module';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-paging',
  templateUrl: './table-paging.component.html',
  styleUrls: ['./table-paging.component.css'],
})
export class TablePagingComponent extends TableComponent {
  resultLength: number;
  reporAttendance: string;
  showColumnNo: boolean = false;
  pageNumber: number = 1;
  oldPageNumber: number = 0;
  pageSize: number = 20;
  // pageLength: number;
  pageIndexOld: number = 0;

  utilityTenant: boolean = false;

  @Input() checkbox: boolean;
  @Input() maxHeight: boolean;
  @Input() overideTableAction: ActionList[];
  @Input() overideTableColumn: TableConfigList[];
  @Output() pageChangeTable = new EventEmitter<any>();
  @Output() sortTable = new EventEmitter<any>();
  @Input() loading: boolean;
  @Input() customeTb: boolean;
  @Input() hideTable: boolean;
  @Input() hidePagination: boolean;
  @Input() pageNumberCustom: number;
  // @Input() datatable;

  sortDirection: any = 'asc';
  nameSort: any = '';
  sortField;

  totalRecapAr: any = {
    totalDebit: 0,
    totalCredit: 0,
    totalBalance: 0,
  };
  totalReportAr: any = {
    totalFirstPeriod: 0,
    totalSecondPeriod: 0,
    totalThirdPeriod: 0,
    totalFourthPeriod: 0,
    totalFifthPeriod: 0,
    grandTotal: 0,
  };

  showTotalRecapAr: boolean;
  showTotalReportAr: boolean;
  // sortedData = this.dataSource.slice();

  facilityBooking: any = {
    type: null,
    itemArr: null,
  };

  dialyReport: boolean;

  overtimeList: boolean;

  tenantCompList: boolean;
  count = 0;
  nexPage = 0;
  oldPage = 1;

  arrFooter;
  arrFooterReportAr;

  footerName = [
    'total',
    'totalBill',
    'totaPenalty',
    'totalPayment',
    'totalBalance',
  ];
  footerNameReportAr = [
    'total',
    'totalFirstPeriod',
    'totalSecondPeriod',
    'totalThirdPeriod',
    'totalFourthPeriod',
    'totalFifthPeriod',
    'grandTotal',
  ];

  override ngOnInit(): void {
    this.pageIndexOld = 0;
    if (!this.selectedId) this.selectedId = [];
    if (!this.typeSelect) this.typeSelect = false;

    if (!this.dialog) {
      this.tableDataService.notify$
        .pipe(takeWhile(() => this.alive))
        .subscribe((e) => {
          this.onSuccess(e);
          this.oldPage =
            AppModule.injector.get(ActivatedRoute).snapshot.queryParams[
              'paging'
            ];
          if (this.oldPage < 2) {
            this.pageNumber = this.oldPage;
            return;
          }
          this.pageNumber = this.oldPage ? this.oldPage : this.pageNumber;
        });
    }
  }
  pageChangeEv(event: PageEvent): void {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.pageChangeTable.emit({
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    });
  }

  setPageNumber(): number {
    return this.pageIndexOld;
  }
  
  announceSortChange(sortState: Sort) {
    if (this.count > 0) {
      --this.count;
      this.sortDirection = 'asc';
    } else {
      ++this.count;
      this.sortDirection = 'desc';
    }
    sortState.direction = this.sortDirection;
    this.nameSort = sortState.active;
    this.sortTable.emit({
      field: sortState.active,
      direction: this.sortDirection,
    });
  }

  onSuccess(res: BaseResponseInterface) {
    this.pageSize = +localStorage.getItem('page');
    if (res.message === 'Success FIND_ALL HR_REPORT') this.showColumnNo = true;

    if (res.message === 'Success FIND_ALL SHIFT_DATA_LOCATION_WEB') {
      this.dialyReport = true;
    }
    if (res.message === 'Success FIND_ALL COMPLAINT') {
      this.tenantCompList = true;
    }
    this.resultLength = res.content.totalElements;
    this.tableUi = new UIConfig();

    if (this.overideTotalElement > 0)
      this.resultLength = this.overideTotalElement;

    if (res.uiConfig) {
      this.tableUi = new UIConfig(
        res.uiConfig.actionList,
        res.uiConfig.tableConfigList,
        res.uiConfig.placeholderUi,
        res.uiConfig.entitySortList
      );
    }

    if (this.selectedId.length > 0 && this.typeSelect) {
      this.selectedId.forEach((e) => {
        let find = res.content.content.findIndex((et) => et.userId === e);
        if (find > -1) {
          res.content.content.splice(find, 1);
        }
      });
    }

    this.dataSource = res.content.content;
    this.selectedId.forEach((ef) => {
      let found = this.dataSource.find((e) => e.id == ef);
      if (found) {
        let obj = this.selectedItem.find((e) => e.id == found.id);
        if (obj === undefined) {
          this.selectedItem.push(found);
        }
      }
    });

    if (this.overideTableAction)
      this.tableUi.actionList = this.overideTableAction;
    if (this.overideTableColumn) {
      this.tableUi.tableConfigList = this.overideTableColumn;
    }

    if (this.checkbox) this.tableUi.createCheckbox();
    this.actionList = this.tableUi?.actionList?.filter(
      (x) => x.location === 'SIDE'
    );
    this.actionList?.forEach((x, i) => {
      x.icon = miniIcon(x.key);
    });
  }

  override setColorText(element: any, key: string) {
    let text = '';
    switch (key) {
      case 'purchaseStatus':
        if (element.purchaseStatus === 'APPROVED') {
          text = 't-success t-upper';
        } else if (element.purchaseStatus === 'WAITING APPROVAL CHIEF') {
          text = 't-active t-upper';
        } else if (element.purchaseStatus === 'DECLINED') {
          text = 't-danger t-upper';
        } else if (element.purchaseStatus === 'WAITING APPROVAL GA') {
          text = 't-ga t-upper';
        } else if (element.purchaseStatus === 'WAITING PURCHASE PROCESS') {
          text = 't-purchase t-upper';
        }
        break;
      case 'status':
        if (
          element.status === 'FAIL' ||
          element.status === 'CANCEL' ||
          element.status === 'NON_CHECKED'
        ) {
          text = 't-danger t-upper';
        } else if (
          element.status === 'SUCCESS' ||
          element.status === 'OK' ||
          element.status === 'APPROVED'
        ) {
          text = 't-success t-upper';
        } else if (
          element.status === 'WAITING' ||
          element.status === 'REQUESTED'
        ) {
          text = 't-progress t-upper';
        } else if (element.status === 'EARLY' || element.status === 'LATE') {
          text = 't-progress t-upper';
        } else if (element.status === 'Canceled') {
          text = 't-danger t-upper';
        }
        break;
      case 'tenantComplaintType':
        if (element.tenantComplaintType === 'INQUIRY') {
          text = 't-success t-upper';
        } else if (element.tenantComplaintType === 'PUBLIC AREA') {
          text = 't-active t-upper';
        }
        break;
      case 'active':
        if (element.active === 'ACTIVE' || element.setActive === 'ACTIVE') {
          text = 't-success t-upper';
        } else if (
          element.active === 'IN ACTIVE' ||
          element.setActive === 'IN ACTIVE'
        ) {
          text = 't-danger t-upper';
        }
        break;
      case 'setActive':
        if (element.setActive === 'ACTIVE') {
          text = 't-success t-upper';
        } else if (element.setActive === 'IN ACTIVE') {
          text = 't-danger t-upper';
        }
        break;
      case 'packetStatus':
        if (element.packetStatus === 'NEW') {
          text = 't-active t-upper';
        } else if (element.packetStatus === 'RECEIVED') {
          text = 't-success t-upper';
        }
        break;
      case 'requestStatus':
        if (element.requestStatus === 'REQUESTED') {
          text = 't-progress t-upper';
        } else if (element.requestStatus === 'REJECTED') {
          text = 't-danger t-upper';
        } else if (element.requestStatus === 'CANCELED') {
          text = 't-muted t-upper';
        } else if (element.requestStatus === 'APPROVED') {
          text = 't-success t-upper';
        } else if (element.requestStatus === 'DELETED') {
          text = 't-danger t-upper';
        }
        break;
      case 'statusDeposit':
        if (element.statusDeposit === 'IN') {
          text = 't-ga';
        } else if (element.statusDeposit === 'PAY') {
          text = 't-success';
        }
        break;
      case 'paymentStatus':
        if (element.paymentStatus === 'PAID') {
          text = 't-active t-upper';
        } else if (element.paymentStatus === 'UNPAID') {
          text = 't-danger t-upper';
        }
        break;
      case 'inOutType':
        if (element.inOutType === 'IN') {
          text = 't-active t-upper';
        } else if (element.inOutType === 'OUT') {
          text = 't-success t-upper';
        }
        break;
      case 'itemType':
        if (element.itemType === 'IN') {
          text = 't-active t-upper';
        } else if (element.itemType === 'OUT') {
          text = 't-success t-upper';
        }
        break;
      case 'itemStatusStr':
        if (element.itemStatusStr === 'YES') {
          text = 't-inactive t-upper fw-bold';
        } else if (element.itemStatusStr === 'NO') {
          text = 't-active t-upper fw-bold';
        }
        break;
      case 'failedChecklist':
        text = 't-danger';
        break;
      case 'checkedOut':
        if (element.checkedOut === 'In Progress') {
          text = 't-progress t-upper fw-600';
        } else if (element.checkedOut === 'Checked Out') {
          text = 't-success t-upper fw-600';
        }
        break;
      case 'valueChecklist':
        if (element.color === '#FF0000') {
          text = 't-danger';
        } else if (element.color === '000000') {
          text = '';
        }
        break;
      case 'statusOnline':
        if (element.statusOnline === 'FAIL') {
          text = 't-danger';
        } else if (element.statusOnline === 'WAITING') {
          text = 't-progress';
        } else if (element.statusOnline === 'SUCCESS') {
          text = 't-success';
        }
        break;
      case 'approvalStatus':
        if (element.approvalStatus === 'Pending') {
          text = 't-progress';
        } else if (element.approvalStatus === 'Approved') {
          text = 't-success';
        } else if (element.approvalStatus === 'Canceled') {
          text = 't-danger';
        } else if (element.approvalStatus === 'Rejected') {
          text = 't-danger';
        } else if (element.approvalStatus === 'Waiting for BM') {
          text = 't-progress';
        } else if (element.approvalStatus === 'Waiting to Purchase') {
          text = 't-progress';
        } else if (element.approvalStatus === 'Purchasing Item') {
          text = 't-progress';
        } else if (element.approvalStatus === 'Completed') {
          text = 't-success';
        } else if (element.approvalStatus === 'Waiting for Supplier Approval') {
          text = 't-progress';
        } else if (element.approvalStatus === 'Waiting for Chief') {
          text = 't-progress';
        } else if (
          element.approvalStatus === 'Waiting for Supplier Approval from BM'
        ) {
          text = 't-progress';
        } else if (element.approvalStatus === 'Waiting for BM Approval') {
          text = 't-progress';
        }
        break;
      case 'accountingFeignStatus':
        if (element.accountingFeignStatus === 'FAIL') {
          text = 't-danger';
        } else if (element.accountingFeignStatus === 'SUCCESS') {
          text = 't-success';
        } else if (element.accountingFeignStatus === 'CANCEL') {
          text = 't-danger';
        } else if (element.accountingFeignStatus === 'WAITING') {
          text = 't-progress';
        }
        break;
      default:
        break;
    }
    return text;
  }

  setColorStatus(element: any, key: string) {
    let css = '';
    switch (key) {
      case 'status':
        if (element.status === 'OPEN' || element.status === 'WAITING TR') {
          css = 'box-status-warning';
        } else if (
          element.status === 'ON PROGRESS' ||
          element.status === 'WAITING WORKING HOUR' ||
          element.status === 'WAITING PAYMENT'
        ) {
          css = 'box-status-warning';
        } else if (element.status === 'UPDATE INQUIRY ITEM') {
          css = 'box-status-update';
        } else if (
          element.status === 'PENDING' ||
          element.status === 'SET DEPARTMENT' ||
          element.status === 'SET EMPLOYEE' ||
          element.status === 'WAITING MATERIAL' ||
          element.status === 'WAITING TENANT' ||
          element.status === 'WAITING CHIEF' ||
          element.status === 'WAITING TR' ||
          element.status === 'ON CHECK' ||
          element.status === 'ON_CHECK'
        ) {
          css = 'box-status-warning';
        } else if (
          element.status === 'DECLINED' ||
          element.status === 'CLOSED' ||
          element.status === 'INQUIRY ITEM DECLINE'
        ) {
          css = 'box-status-red';
        } else if (
          element.status === 'FINISHED' ||
          element.status === 'APPROVED WORKING HOUR'
        ) {
          css = 'box-status-success';
        } else if (element.status === 'Canceled') {
          css = 'box-status-red';
        } else if (element.status === 'Completed') {
          css = 'box-status-success';
        } else if (element.status === 'Booked') {
          css = 'box-status-blue';
        } else if (element.status === 'Waiting for Payment') {
          css = 'box-status-waiting';
        } else if (element.status === 'In Use') {
          css = 'box-status-waiting';
        }
        if (element.colour === 'yellow') {
          css = 'box-status-warning-boldType';
        } else if (element.colour === 'red') {
          css = 'box-status-red-boldType';
        } else if (element.colour === 'green') {
          css = 'box-status-success-boldType';
        } else if (element.colour === 'grey') {
          css = 'box-status-muted-boldType';
        }
        break;
      case 'fittingOutStatus':
        if (element.fittingOutStatus === 'PENDING') {
          css = 'box-status-blue';
        } else if (element.fittingOutStatus === 'REVIEWED') {
          css = 'box-status-blue';
        } else if (element.fittingOutStatus === 'APPROVED') {
          css = 'box-status-success';
        } else if (element.fittingOutStatus === 'ON_PROGRESS') {
          css = 'box-status-warning';
        } else if (element.fittingOutStatus === 'PROCESS_EXTEND') {
          css = 'box-status-warning';
        } else if (element.fittingOutStatus === 'APPROVE_EXTEND') {
          css = 'box-status-warning';
        } else if (
          element.fittingOutStatus === 'REJECT_EXTEND' ||
          element.fittingOutStatus === 'REJECTED'
        ) {
          css = 'box-status-red';
        } else if (element.fittingOutStatus === 'WAITING_CHECKING') {
          css = 'box-status-warning';
        } else if (element.fittingOutStatus === 'CHECKING_DONE') {
          css = 'box-status-warning';
        } else if (element.fittingOutStatus === 'CHECKING_PROBLEM') {
          css = 'box-status-warning';
        } else if (element.fittingOutStatus === 'DONE') {
          css = 'box-status-success';
        } else if (element.fittingOutStatus === 'CANCEL') {
          css = 'box-status-cancel';
        } else if (element.fittingOutStatus === 'UPDATED') {
          css = 'box-status-blue';
        }
        break;
      case 'inOutStatus':
        if (element.inOutStatus === 'NEW') {
          css = 'box-status-blue';
        } else if (element.inOutStatus === 'REVIEWED') {
          css = 'box-status-blue';
        } else if (element.inOutStatus === 'REJECTED') {
          css = 'box-status-red';
        } else if (element.inOutStatus === 'APPROVED') {
          css = 'box-status-success';
        } else if (element.inOutStatus === 'LOADING_ITEM') {
          css = 'box-status-warning';
        } else if (element.inOutStatus === 'DONE') {
          css = 'box-status-success';
        } else if (element.inOutStatus === 'CANCELED') {
          css = 'box-status-cancel';
        } else if (element.inOutStatus === 'UPDATED') {
          css = 'box-status-blue';
        }
        break;
      default:
        break;
    }
    return css;
  }
  setIconAction(el) {
    let icon;
    switch (el) {
      case 'updateSort':
        icon = 'edit-blue';
        break;
      case 'uporderingViews':
        icon = 'up-order';
        break;
      case 'downorderingViews':
        icon = 'down-order';
        break;
      default:
        icon = 'delete-red';
        break;
    }
    return icon;
  }

  showTextTooltip(key: string, val) {
    if (val) return;
    let text;
    if (
      key === 'firstPeriod.value' ||
      key === 'fifthPeriod.value' ||
      key === 'thirdPeriod.value' ||
      key === 'fourthPeriod.value' ||
      key === 'secondPeriod.value'
    ) {
      switch (key) {
        case 'firstPeriod.value':
          text = 'Click Detail First Period Value';
          break;
        case 'secondPeriod.value':
          text = 'Click Detail Second Period Value';
          break;
        case 'thirdPeriod.value':
          text = 'Click Detail Third Period Value';
          break;
        case 'fourthPeriod.value':
          text = 'Click Detail Fourth Period Value';
          break;
        case 'fifthPeriod.value':
          text = 'Click Detail  Fifth Period Value';
          break;
        default:
          break;
      }
    }
    return text;
  }

  showDetailRecap(element: any, key: string) {
    let listData: any = [];
    if (
      key === 'firstPeriod.value' ||
      key === 'fifthPeriod.value' ||
      key === 'thirdPeriod.value' ||
      key === 'fourthPeriod.value' ||
      key === 'secondPeriod.value'
    ) {
      listData = {
        element: element,
        key: key,
      };
    }
    this.detailRecapAr.emit(listData);
  }

  changeTextColorAction(val) {
    let text;
    if (val === 'cancelDenda' || val === 'cancelPayment' || val === 'cancel') {
      text = 't-progress';
    } else if (val === 'deleteInvoice' || val === 'delete') {
      text = 't-danger';
    } else if (val === 'invoiceCode' || val === 'receiptCode') {
      text = 't-active';
    }
    return text;
  }

  reimbursementLimit(element, key) {
    let arrLimit = [];
    if (element.medicalUnlimited) {
      arrLimit.push('UNLIMITED');
    } else {
      arrLimit.push(element.medicalAmount);
    }
    if (element.travelUnlimited) {
      arrLimit.push('UNLIMITED');
    } else {
      arrLimit.push(element.travelAmount);
    }
    if (element.operationalUnlimited) {
      arrLimit.push('UNLIMITED');
    } else {
      arrLimit.push(element.operationalAmount);
    }
    return arrLimit;
  }
  reimbursementRequest(element, key) {
    let arrLimit = [];
    if (element.medicalUnlimitedRequest) {
      arrLimit.push('UNLIMITED');
    } else {
      arrLimit.push(element.medicalAmountRequest);
    }
    if (element.travelUnlimitedRequest) {
      arrLimit.push('UNLIMITED');
    } else {
      arrLimit.push(element.travelAmountRequest);
    }
    if (element.operationalUnlimitedRequest) {
      arrLimit.push('UNLIMITED');
    } else {
      arrLimit.push(element.operationalAmountRequest);
    }
    return arrLimit;
  }
  reimbursementRemining(element, key) {
    let arrLimit = [];

    arrLimit.push(element.medicalRemaining);
    arrLimit.push(element.travelRemaining);
    arrLimit.push(element.operationalRemaining);

    return arrLimit;
  }

  formatString(val) {
    if (val.length === 0) return;
    return val.toString().replace(',', ':   ');
  }
}
