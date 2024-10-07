import { AppModule } from '../app.module';
// import { FilterComplaintDialogComponent } from '../dialog/filter-complaint-dialog/filter-complaint-dialog.component';
import { ClickModel } from '../model/click.model';
import { IFilterDTOForm } from '../model/tenant-inquiry.model';
import { BaseRest } from '../shared-comp/base-model/base-rest-class';
import { RestParams } from '../shared-comp/base-model/rest-params.class';
import { RestComplaintService } from '../shared-comp/service/rest-complaint.service';
import { TabObject } from './tab-object';
import * as moment from 'moment';
import { PreviewImageDialogComponent } from '../dialog/preview-image-dialog/preview-image-dialog.component';
import { ImageService } from '../shared-comp/service/image.service';
import { FilterFieldFindingsDialogComponent } from '../dialog/filter-field-findings-dialog/filter-field-findings-dialog.component';

export class TabObjectFieldFindings extends TabObject {
  form: IFilterDTOForm = new IFilterDTOForm();
  date = moment();
  constructor() {
    super('COMPLAINT');
    this.name = 'Field Findings';
    this.tablePagingRest = AppModule.injector.get(RestComplaintService);
    if (localStorage.getItem('dt')) {
      localStorage.removeItem('dt');
    }
  }
  doingDelete(e: ClickModel) {}

  
  loadData(){
    this.form.typeDate.setValue('MONTHLY');
    this.form.monthStart.setValue(
      moment.unix(this.form.dateStart.value).month()
    );
    this.form.yearStart.setValue(
      moment.unix(this.form.dateStart.value).year()
    );
    this.form.monthEnd.setValue(
      moment.unix(this.form.dateEnd.value).month()
    );
    this.form.yearEnd.setValue(moment.unix(this.form.dateEnd.value).year());
  }

  filterFieldFindings(event) {
    this.matDialog
      .open(FilterFieldFindingsDialogComponent, {
        width: '400px',
        data: {
          month: this.form.monthStart,
          year: this.form.yearStart,
          item: this.form.getRawValue(),
        },
      })
      .afterClosed()
      .subscribe((res) => {
        this.form = new IFilterDTOForm(res);
        this.searchTxt = event;
        this.refresh();
      });
  }
  override refresh() {
    this.form.mine.setValue(false);
    this.form.type.setValue('INTERNAL_COMPLAINT');
    this.form.orderedIdList.setValue([]);

    let restParam = RestParams.buildDef()
      .setPageNumber(this.pageNumber)
      .setPageSize(this.pageSize)
      .setSearch(this.searchTxt)
      .setFilter(this.selectedFilter);
    localStorage.removeItem('page');
    localStorage.setItem('page', this.pageSize.toString());
    BaseRest.build(this.tablePagingRest)
      .callRest('findAllPaging', (e) => {
        this.tableDataService.notify$.next(e);
      })
      .params(restParam, this.form.getRawValue());
  }

  detail(e: ClickModel) {
    let url =
      location.origin +
      String(
        this.router.createUrlTree(['/field-findings/detail'], {
          queryParams: { id: e.data.id, type: 'field-findings' },
        })
      );
    window.open(url, '_blank');
  }

  download() {
    let restParam = RestParams.buildDef()
      .setPageNumber(this.pageNumber)
      .setPageSize(this.pageSize)
      .setSearch(this.searchTxt)
      .setFilter(this.selectedFilter);
    BaseRest.build(this.tablePagingRest)
      .callRest('downloadComplain', (v) => {
        let fileType =
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const blob = new Blob([v], { type: fileType });
        this.excelService.saveFile(blob, fileType, 'Data Field Findings');
        // this.excelService.saveFile(blob, fileType)
      })
      .params(restParam, this.form.getRawValue());
  }

  updafterImage(e?: ClickModel) {
    this.viewImage(e.data.afterImage);
  }
  updimage(e?: ClickModel) {
    this.viewImage(e.data.image);
  }
  viewImage(img) {
    this.matDialog.open(PreviewImageDialogComponent, {
      width: '450px',
      data: AppModule.injector.get(ImageService).getImageByFilename(img),
    });
  }
}
