import { EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { takeWhile } from 'rxjs';
import { debounceTime } from 'rxjs';
import { Subject } from 'rxjs';
import { UIConfig } from 'src/app/model/table-model';
import { LoadingService } from '../service/loading.service';
import { FormControl } from '@angular/forms';
import { MY_DATE_FORMAT, YEAR_FORMAT_ONLY } from 'src/app/utils/constant';
import { TableDataService } from '../service/table-data.service';
import { LangService } from '../service/langservice.service';
import { lang } from 'src/app/lang/lang.interface';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
// import { RestEmployementChangeService } from '../service/rest-employement-change.service';
// import { RestPayrollEmployeeService } from '../service/rest-payroll-employee.service';
import { MatDialog } from '@angular/material/dialog';
// import { SelectSingleComponent } from 'src/app/shared-dialog/select-single/select-single.component';
// import { SelectMultipleComponent } from 'src/app/shared-dialog/select-multiple/select-multiple.component';
// import { EmploymentChangeForm } from 'src/app/model/employement-change.model';

@Component({
  selector: 'app-table-param',
  templateUrl: './table-param.component.html',
  styleUrls: ['./table-param.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: YEAR_FORMAT_ONLY },
  ],
})
export class TableParamComponent implements OnInit, OnDestroy {
  alive = true;
  @Input() tableConfig: UIConfig;

  searchKey: string = '';
  filterKey: string = '';

  @Output() anyEmitter = new EventEmitter<string>();
  @Output() search = new EventEmitter<any>();
  @Output() searchAndFilter = new EventEmitter<any>();
  @Output() dateEmit = new EventEmitter<any>();
  @Output() dateRange = new EventEmitter<any>();
  @Output() filterInvoice = new EventEmitter<any>();
  @Output() addNeracaBtn = new EventEmitter<any>();
  @Output() paymentAll = new EventEmitter<any>();
  @Output() exportExcel = new EventEmitter<any>();
  @Output() downloadReport = new EventEmitter<any>();
  @Output() paymentBillsDisc = new EventEmitter<any>();
  @Output() inputYear = new EventEmitter<any>();

  @Output() openDialogEmployee = new EventEmitter<any>();
  @Output() openDialogStatus = new EventEmitter<any>();
  @Output() refreshFilter = new EventEmitter<any>();

  @Input() filterList = [];
  @Input() showMore: boolean;
  @Input() titleTable: string;
  @Input() btnHo: boolean;
  @Input() side2: boolean;
  @Input() btnDownload: boolean;
  @Input() menuInv: boolean;

  searchKeyText: Subject<any> = new Subject();
  @Input() control: FormControl;

  @Input() selected?: string;
  @Input() meterPool: boolean;
  @Input() btnFilter: boolean;
  @Input() btnPayment: boolean;
  @Input() btnPaymentBillsDisc: boolean;
  @Input() btnExportExcel: boolean;
  @Input() addNeraca: boolean;
  @Input() hideParam: boolean;
  @Input() sticky: boolean;
  @Input() filterYearly: boolean;
  @Input() changeEmploye: boolean;

  @Input() controlYear = new FormControl();

  year;
  w400: boolean;
  w500: boolean;

  // @Output() formInput: EmploymentChangeForm = new EmploymentChangeForm();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public loadingService: LoadingService,
    public tableData: TableDataService,
    public langService: LangService,
    // private restEmploye: RestEmployementChangeService,
    // private restEmp: RestPayrollEmployeeService,
    private dialog: MatDialog
  ) {}
  ngOnDestroy(): void {
    this.alive = false;
  }

  ngOnInit(): void {
    if (!this.selected) {
      this.selected = this.meterPool ? 'PLN' : 'ALL';
    }
    let sKeyword = this.activatedRoute.snapshot.queryParams['search'];
    let fKeyword = this.activatedRoute.snapshot.queryParams['filter'];
    if (sKeyword && sKeyword.length > 0) {
      this.searchKey = sKeyword;
    } else {
      this.searchKey = '';
    }
    if (fKeyword && fKeyword.length > 0) {
      this.filterKey = fKeyword;
    } else {
      this.filterKey = '';
    }
    let ob = { search: this.searchKey, filter: this.filterKey };
    this.searchAndFilter.emit(ob);

    this.router.events.pipe(takeWhile(() => this.alive)).subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let sKeyword = this.activatedRoute.snapshot.queryParams['search'];
        let fKeyword = this.activatedRoute.snapshot.queryParams['filter'];
        this.searchKey = '';
        this.filterKey = '';

        if (sKeyword && sKeyword.length > 0) {
          this.searchKey = sKeyword;
        }
        if (fKeyword && fKeyword.length > 0) {
          this.filterKey = fKeyword;
        }
        let ob = { search: this.searchKey, filter: this.filterKey };
        this.searchAndFilter.emit(ob);
      }
    });

    this.searchKeyText
      .pipe(takeWhile(() => this.alive))
      .pipe(debounceTime(500))
      .subscribe((v) => {
        // if(x.length == 0 || v.key === 'Enter') return;
        // this.anyEmitter.emit({ func: 'search', ev: v })
        // let x = v.target.value.trim();
        let x = v.target.value;
        this.tableData.reset$.next(true);
        this.searchKey = x;
        this.search.emit(this.searchKey);
      });
  }

  updateFilter(ev) {
    this.filterKey = ev.value;
    if (!this.filterKey) return;
    let ob = { search: this.searchKey, filter: this.filterKey };
    this.searchAndFilter.emit(ob);
  }

  findConfig(key: string): boolean {
    let idx = this.tableConfig?.actionList?.findIndex((e) => e.key === key);
    return idx !== undefined && idx !== -1;
  }

  //todo ngFor
  // emitFilter($event) {
  //   this.anyEmitter.emit({ func: 'filter', ev: $event });
  // }

  findPlaceholder() {
    let list = [];
    list = this.tableConfig?.placeholderUi.map((e) => {
      return e.name;
    });
    let placeholder = list.join(' / ');
    this.resizeFormSearch(list);
    if (list.length === 0) return 'search';
    return placeholder;
  }

  resizeFormSearch(listPlaceholder: any[]) {
    if (listPlaceholder.length > 10) {
      this.w500 = true;
    } else if (listPlaceholder.length > 4 && listPlaceholder.length <= 10) {
      this.w400 = true;
    }
  }

  emitAny(x) {
    this.anyEmitter.emit(x.key);
  }

  log(x) {
    x.preventDefault();
  }

  filterData(key?) {
    this.filterInvoice.emit(key);
  }

  createEvent(s: string) {
    return {
      event: {
        target: {
          value: s,
        },
      },
    };
  }

  uiCSS(x) {
    let css = null;
    let tokenHo = localStorage.getItem('tokenHo');
    switch (x.key) {
      case 'add':
      case 'addChecklistGroup':
      case 'submit':
        css = 'btn-add-new';
        break;
      case 'refresh':
      case 'import':
      case 'export':
      case 'export-excel':
      // case 'retryAll':
      case 'createFromTemplate':
        css = 'btn-refresh';
        break;
      case 'send':
        css = 'btn-refresh';
        break;
      default:
        css = 'btn-refresh';
        break;
    }
    return css;
  }
  changeColorText(key) {
    let css = null;
    switch (key) {
      case 'delete':
      case 'deleteInvoice':
        css = 't-danger';
        break;
      case 'cancelPayment':
        css = 't-progress';
        break;
      default:
        break;
    }
    return css;
  }

  btnHoBg() {
    let css: boolean;
    if (this.btnHo) {
      css = true;
    }
    return css;
  }
  updateUnix(event, dp) {
    dp.close();
    this.controlYear.setValue(event);
    this.inputYear.emit(event.year());
  }

  // openDialogChangeType() {
  //   this.dialog
  //     .open(SelectSingleComponent, {
  //       data: {
  //         refreshService: this.restEmploye,
  //         functionName: 'findEmployementChangeType',
  //         sizeWidthDialog: '800px',
  //         disableAction: true,
  //         changeType: true,
  //         // arrayParam: [{ orderedIdList: [] }],
  //       },
  //     })
  //     .afterClosed()
  //     .subscribe((res) => {
  //       if (!res) return;
  //       this.formInput.changeType.setValue(res.data.changeType);
  //       this.formInput.changeTypeName.setValue(res.data.description);
  //     });
  // }
  // openDialogEmploye() {
  //   this.dialog
  //     .open(SelectMultipleComponent, {
  //       data: {
  //         refreshService: this.restEmp,
  //         functionName: 'findAllPaging',
  //         sizeWidthDialog: '800px',
  //         disableAction: true,
  //         // selectedId: this.form.employeeId.value,
  //         typeSelect: true,
  //         // arrayParam: [{ orderedIdList: [], deptId: [this.form.deptId.value] }],
  //       },
  //     })
  //     .afterClosed()
  //     .subscribe((res) => {
  //       if (!res) return;
  //       let arrName = [];
  //       arrName = res.map((x) => {
  //         return x.userName;
  //       });
  //       this.formInput.employeeId.setValue(
  //         res.map((v) => {
  //           return v.id;
  //         })
  //       );
  //       this.formInput.employeeName.setValue(arrName.join(', '));
  //     });
  // }
  btnReset(type) {
    switch (type) {
      // case 'employee':
      //   this.formInput.employeeId.setValue(null);
      //   this.formInput.employeeName.setValue(null);
      //   break;
      // case 'status':
      //   this.formInput.changeType.setValue(null);
      //   this.formInput.changeTypeName.setValue(null);
      //   break;
      default:
        break;
    }
  }
}
