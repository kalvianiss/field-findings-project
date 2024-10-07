import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppModule } from '../app.module';
import { ClickModel } from '../model/click.model';
import { IDtoPaging } from '../model/dto-paging.model';
import { BaseRest } from '../shared-comp/base-model/base-rest-class';
import { RestParams } from '../shared-comp/base-model/rest-params.class';
import { AuthService } from '../shared-comp/service/auth.service';
import { CrudInterfaceService } from '../shared-comp/service/basecrud.service';
import { ExportExcelService } from '../shared-comp/service/export-excel.service';
import { LangService } from '../shared-comp/service/langservice.service';
// import { RestBuildingSettingService } from '../shared-comp/service/rest-building-setting.service';
import { SnackbarService } from '../shared-comp/service/snackbar.service';
import { TableDataService } from '../shared-comp/service/table-data.service';
// import { ShowConfirmationDialog } from '../shared-dialog/dialog-class';
// import { RestChartOfAccountService } from '../shared-comp/service/rest-chart-of-account.service';
// import { RestCoaCategoryService } from '../shared-comp/service/rest-coa-category.service';
// import { RestNeracaService } from '../shared-comp/service/rest-neraca.service';
// import { RestNeracaTypeService } from '../shared-comp/service/rest-neraca-type.service';
// import { RestJournalService } from '../shared-comp/service/rest-journal.service';
// import { RestCloudAccountingSettingService } from '../shared-comp/service/rest-cloud-accounting-setting.service';
import { Subject } from 'rxjs';
import { LoadingService } from '../shared-comp/service/loading.service';
import { lang } from '../lang/lang.interface';
import { ImageService } from '../shared-comp/service/image.service';
import { ShowConfirmationDialog } from '../shared-dialog/dialog-class';
// import { NgxImageCompressService } from 'ngx-image-compress';
// import { RestPayrollEmployeeService } from '../shared-comp/service/rest-payroll-employee.service';
// import { StoreTempDataService } from '../shared-comp/service/store-temp-data.service';

export abstract class TabObject {
  name: string;
  visible = true;
  active: boolean;
  tablePagingRest: CrudInterfaceService;
  matDialog: MatDialog;
  router: Router;
  activateRoute: ActivatedRoute;
  // route: ActivatedRoute;
  tableDataService: TableDataService;

  snackBarService: SnackbarService;
  // buildingSettingService: RestBuildingSettingService;
  excelService: ExportExcelService;
  underdevelopment = false;
  roles: string;
  // tempService: StoreTempDataService;

  // restEmployee: RestPayrollEmployeeService;

  data$ = new Subject<any>();

  pageNumber = 1;
  pageSize = 20;
  searchTxt = '';
  selectedFilter = 'ALL';
  sortDirection = '';
  sortField = '';
  sortName = [];
  imageServiceFile: ImageService;
  // imageCompressFile: NgxImageCompressService;

  onSuccess: any;
  id = 0;
  cookieService: CookieService;
  titleImport?: string;
  selectTab?: string;
  langService: LangService;
  authService: AuthService;
  dtoPaging: IDtoPaging = {
    direction: null,
    field: null,
    orderedIdList: [],
  };

  // restAccounting: RestChartOfAccountService;
  // restCoaCategory: RestCoaCategoryService;
  // restNeraca: RestNeracaService;
  // restNeracaType: RestNeracaTypeService;
  // restJurnal: RestJournalService;
  // restCloudSetting: RestCloudAccountingSettingService;
  loadingService: LoadingService;

  debounceInput: Subject<any> = new Subject();
  oldSearch;
  constructor(rolesEnum) {
    this.excelService = AppModule.injector.get(ExportExcelService);
    // this.restAccounting = AppModule.injector.get(RestChartOfAccountService);
    // this.restCoaCategory = AppModule.injector.get(RestCoaCategoryService);
    this.snackBarService = AppModule.injector.get(SnackbarService);
    this.cookieService = AppModule.injector.get(CookieService);
    this.router = AppModule.injector.get(Router);
    this.activateRoute = AppModule.injector.get(ActivatedRoute);
    this.matDialog = AppModule.injector.get(MatDialog);
    this.tableDataService = AppModule.injector.get(TableDataService);
    this.id = AppModule.injector.get(ActivatedRoute).snapshot.queryParams['id'];
    // this.restNeraca = AppModule.injector.get(RestNeracaService);
    // this.restNeracaType = AppModule.injector.get(RestNeracaTypeService);
    // this.restJurnal = AppModule.injector.get(RestJournalService);
    // this.restCloudSetting = AppModule.injector.get(
    //   RestCloudAccountingSettingService
    // );

    // this.buildingSettingService = AppModule.injector.get(
    //   RestBuildingSettingService
    // );
    this.langService = AppModule.injector.get(LangService);
    this.roles = rolesEnum;
    this.authService = AppModule.injector.get(AuthService);
    this.loadingService = AppModule.injector.get(LoadingService);
    this.imageServiceFile = AppModule.injector.get(ImageService);
    // this.imageCompressFile = AppModule.injector.get(NgxImageCompressService);
    // this.restEmployee = AppModule.injector.get(RestPayrollEmployeeService);
  }

  getName() {
    return this.name.toLowerCase();
  }

  delete(f: ClickModel, t?: string) {
    let nameMsg = f.data.name ? f.data.name : `id ${f.data.id}`;
    if (f.data.title) {
      nameMsg = f.data.title ? f.data.title : `id ${f.data.id}`;
    }
    let title = lang[this.langService.lang].AreYouSure + '?';
    let info =
      lang[this.langService.lang].IfYes +
      ' ' +
      `${
        f.data.disabled ? 'disable' : lang[this.langService.lang].DeleteData
      } ${nameMsg}`;
    new ShowConfirmationDialog(
      (e) => {
        if (e && e.res == 'ok') {
          this.doingDelete(f);
        }
      },
      title,
      info
    );
  }

  checkNameDelete(val) {
    let msg: string = '';
    if (val.deptName) {
      msg = val.deptName;
    }
    return msg;
  }

  abstract doingDelete(e: ClickModel);

  pageChange($event) {
    this.pageNumber = $event.pageNumber;
    this.pageSize = $event.pageSize;
    this.refresh();
  }

  sortTable($event) {
    this.sortDirection = $event.direction;
    this.sortField = $event.field;
    this.sortName = $event.sortName;

    this.refresh();
  }

  searchAndFilter($ev?) {
    this.searchTxt = undefined;
    this.selectedFilter = undefined;

    if ($ev !== undefined) {
      this.searchTxt = $ev.search;
      this.selectedFilter = $ev.filter;
    }

    this.refresh();
  }

  filter($ev) {
    this.selectedFilter = undefined;

    if (!$ev || !$ev.value) return;
    this.selectedFilter = $ev.value;
    this.refresh();
  }

  search($event) {
    if (this.searchTxt === $event) return;
    this.searchTxt = $event;
    // this.pageNumber = 1;
    // this.pageSize = 20;
    this.refresh();
  }

  refresh() {
    if (this.underdevelopment) return;
    let rest = RestParams.buildDef()
      .setPageNumber(this.pageNumber)
      .setPageSize(this.pageSize)
      .setSearch(this.searchTxt)
      .setFilter(this.selectedFilter)
      .setDirection(this.sortDirection)
      .setField(this.sortField);

    this.router.navigate([], {
      relativeTo: AppModule.injector.get(ActivatedRoute),
      queryParams: {
        paging: this.pageNumber,
      },
      queryParamsHandling: 'merge',
    });
    localStorage.removeItem('page');
    localStorage.setItem('page', this.pageSize.toString());
    BaseRest.build(this.tablePagingRest).findAllPaging((e) => {
      this.tableDataService.notify$.next(e);
      // this.data$.next(this.);
    }, rest);
  }
}
