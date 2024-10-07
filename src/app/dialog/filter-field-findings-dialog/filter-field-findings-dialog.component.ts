import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AppModule } from 'src/app/app.module';
import { IFilterDTOForm } from 'src/app/model/tenant-inquiry.model';
import { BaseRest } from 'src/app/shared-comp/base-model/base-rest-class';
import { RemoveSperatorService } from 'src/app/shared-comp/service/remove-sperator.service';
import { RestComplaintSubcategoryService } from 'src/app/shared-comp/service/rest-complaint-subcategory.service';
import { RestComplaintService } from 'src/app/shared-comp/service/rest-complaint.service';

@Component({
  selector: 'app-filter-field-findings-dialog',
  templateUrl: './filter-field-findings-dialog.component.html',
  styleUrls: ['./filter-field-findings-dialog.component.css']
})
export class FilterFieldFindingsDialogComponent implements OnInit {
  dateStart = new FormControl();
  dateEnd = new FormControl();
  dropdownSettings: IDropdownSettings;
  form: IFilterDTOForm = new IFilterDTOForm();
  categoryArr: any[] = [];
  category: any[] = [];
  subcategoryList = [];
  minDate;
  typeDate = [
    { key: 'DAILY', value: 'Daily' },
    { key: 'MONTHLY', value: 'Monthly' },
  ];

  dropdownListStatus: any = [
    {
      item_id: 1,
      item_text: 'OPEN',
    },
    {
      item_id: 2,
      item_text: 'WAITING_TENANT',
    },
    {
      item_id: 3,
      item_text: 'WAITING_PAYMENT',
    },
    {
      item_id: 4,
      item_text: 'WAITING_WORKING_HOUR',
    },
    {
      item_id: 5,
      item_text: 'APPROVED_WORKING_HOUR',
    },
    {
      item_id: 6,
      item_text: 'SET_DEPARTMENT',
    },
    {
      item_id: 7,
      item_text: 'SET_EMPLOYEE',
    },
    {
      item_id: 8,
      item_text: 'UPDATE_INQUIRY_ITEM',
    },
    {
      item_id: 9,
      item_text: 'INQUIRY_ITEM_DECLINE',
    },
    {
      item_id: 10,
      item_text: 'WAITING_MATERIAL',
    },
    {
      item_id: 11,
      item_text: 'ON_PROGRESS',
    },
    {
      item_id: 12,
      item_text: 'WAITING_CHIEF',
    },
    {
      item_id: 13,
      item_text: 'WAITING_TR',
    },
    {
      item_id: 14,
      item_text: 'DECLINED',
    },
    {
      item_id: 15,
      item_text: 'FINISHED',
    },
    {
      item_id: 16,
      item_text: 'CLOSED',
    },
    {
      item_id: 17,
      item_text: 'ON_CHECK',
    },
  ];

  dropdownList: any = [];
  selectedItems = [];
  selectedItemsStatus = [];
  dateStartParam;
  dateEndParam;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FilterFieldFindingsDialogComponent>,
    private restComplain: RestComplaintService,
    public removeService: RemoveSperatorService,
    private restSubCategory: RestComplaintSubcategoryService,
    private dialog: MatDialog,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true,
    };
  }

  ngOnInit(): void {
    this.form = new IFilterDTOForm(this.data.item);
    if (this.form.category.value) {
      BaseRest.build(this.restSubCategory)
        .callRest('findByCategory', (v) => {
          this.dropdownList = [];
          v.content.forEach((x, i) => {
            this.dropdownList.push({
              item_id: x.id,
              item_text: x.subCategoryName,
            });
          });
          if (this.data.item.subCategoryId.length > 0) {
            this.data.item.subCategoryId.forEach((item) => {
              let find = this.dropdownList.find((v) => v.item_id === item);
              if (find) {
                this.selectedItems.push(find);
              }
            });
          }
        })
        .params(this.form.category.value);
    }

    let old = +localStorage.getItem('dt');
    if (old) {
      this.dateStart.setValue(old);
    }

    BaseRest.build(this.restComplain)
      .callRest('findComplaintCategory', (v) => {
        for (const [key, value] of Object.entries(v.content)) {
          this.category.push({
            name: key,
            subList: value,
          });
        }
      })
      .params();

    if (this.data.item.status) {
      this.data.item.status.forEach((item) => {
        let find = this.dropdownListStatus.find((v) => v.item_text === item);
        if (find) {
          this.selectedItemsStatus.push(find);
        }
      });
    }

    this.dateStartParam = AppModule.injector.get(ActivatedRoute).snapshot.queryParams['dateStart'];
    this.dateEndParam = AppModule.injector.get(ActivatedRoute).snapshot.queryParams['dateEnd'];
    if(this.dateStartParam && this.dateEndParam){
      const qParams: Params = {};
      this.route.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: qParams,
        queryParamsHandling: ''
      });
      this.resetDate();
    }
  }
  onItemSelect(item: any) {}
  onDeSelect(item: any) {}
  onSelectAll(items: any) {}
  onDeSelectAll(items: any) {}

  onChange(event) {
    this.selectedItems = [];
    BaseRest.build(this.restSubCategory)
      .callRest('findByCategory', (v) => {
        this.dropdownList = [];
        v.content.forEach((x, i) => {
          this.dropdownList.push({
            item_id: x.id,
            item_text: x.subCategoryName,
          });
        });
        this.subcategoryList = v.content;
      })
      .params(event.value);
  }


  btnReset() {
    this.form.subCategoryId.setValue(null);
    this.form.subCategoryName.setValue(null);
  }
  selectSubCategory(event) {
    let ids = [];
    let arrName = [];
    let find = this.subcategoryList.find((v) => v.id === event.value);
    if (find) {
      arrName.push(find.subCategoryName);
      this.form.subCategoryName.setValue(arrName.join(', '));
    }
    ids.push(event.value);
    this.form.subCategoryId.setValue(ids);
  }

  resetDate() {
    localStorage.removeItem('dt');
  }

  changeDate(event) {
    let date_start = moment(new Date(event * 1000)).format('YYYY-MM-DD');
    let date_end = moment(this.form.unixEnd.value).format('YYYY-MM-DD');
    if (date_start < date_end) {
      let endOfMonth = new Date(
        moment(new Date(event * 1000))
          .clone()
          .endOf('month')
          .format('YYYY-MM-DD hh:mm')
      );
      this.form.unixEnd.setValue(endOfMonth);
    }
    this.minDate = new Date(event * 1000);
  }

  updateUnix(picker) {
    //validate date
    let x = picker._model.selection;
    const text = moment(x.unix() * 1000)
      .endOf('day')
      .format('X');
    this.form.unixEnd.setValue(new Date(+text * 1000));
  }

  changeValue(event) {
    this.form.typeDate.setValue(event.value)
    console.log('type', event.value)
    if (event.value === 'DAILY') {
      this.form.monthStart.setValue(0);
      this.form.monthEnd.setValue(0);
      this.form.yearStart.setValue(0);
      this.form.yearEnd.setValue(0);
      this.form.dateStart.setValue(0);
      this.form.dateEnd.setValue(0)
    } else {
      this.form.unixStart.setValue(null);
      this.form.unixEnd.setValue(null);
    }
  }

  submit() {
    if (this.form.typeDate.value === 'DAILY') {
      this.form.yearEnd.setValue(0);
      this.form.yearStart.setValue(0);
      this.form.monthStart.setValue(0);
      this.form.monthEnd.setValue(0);
    }
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
    localStorage.setItem('dt', this.form.dateStart.value);

    if (this.form.type.value === 'ALL') {
      this.form.type.setValue(null);
    }

    this.form.subCategoryId.setValue(
      this.selectedItems.map((v) => {
        return v.item_id;
      })
    );

    this.form.statusType.setValue(
      this.selectedItemsStatus.map((v) => {
        return v.item_text;
      })
    );
    this.dialogRef.close(this.form.getRawValue());
  }
}
