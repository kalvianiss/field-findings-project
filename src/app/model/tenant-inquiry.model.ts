import { FormBuilder, FormControl } from '@angular/forms';
import { BaseForm } from '../shared-comp/base-model/base-form';

export interface IFilterDTO {
  category: string;
  mine?: boolean;
  orderedIdList?: any[];
  status: [];
  type: string;
  monthStart: number;
  yearStart: number;
  monthEnd: number;
  yearEnd: number;
  moduleType: string;
  subCategoryId?: [];
  subCategoryName?: string;
  refType: string;
  refId: number;
  refName: string;
  tenantComplaintType: string;
  web: boolean;
  typeDate: string;
  unixStart: number;
  unixEnd:number;
  dateStart: number;
  dateEnd:number;
  month:number;
  year: number;
}

export class IFilterDTOForm extends BaseForm {
  readonly category = this.get('category') as FormControl;
  readonly monthStart = this.get('monthStart') as FormControl;
  readonly yearStart = this.get('yearStart') as FormControl;
  readonly monthEnd = this.get('monthEnd') as FormControl;
  readonly yearEnd = this.get('yearEnd') as FormControl;
  readonly type = this.get('type') as FormControl;
  readonly statusType = this.get('status') as FormControl;
  readonly mine = this.get('mine') as FormControl;
  readonly orderedIdList = this.get('orderedIdList') as FormControl;
  readonly moduleType = this.get('moduleType') as FormControl;
  readonly subCategoryId = this.get('subCategoryId') as FormControl;
  readonly subCategoryName = this.get('subCategoryName') as FormControl;
  readonly refType = this.get('refType') as FormControl;
  readonly refId = this.get('refId') as FormControl;
  readonly refName = this.get('refName') as FormControl;
  readonly tenantComplaintType = this.get('tenantComplaintType') as FormControl;
  readonly web = this.get('web') as FormControl;
  readonly typeDate = this.get('typeDate') as FormControl;
  readonly unixStart = this.get('unixStart') as FormControl;
  readonly unixEnd = this.get('unixEnd') as FormControl;
  readonly dateStart = this.get('dateStart') as FormControl;
  readonly dateEnd = this.get('dateEnd') as FormControl;
  readonly month = this.get('month') as FormControl;
  readonly year = this.get('year') as FormControl;
  constructor(
    readonly model?: IFilterDTO,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        category: [model?.category],
        mine: [model?.mine],
        monthStart: [model?.monthStart],
        monthEnd: [model?.monthEnd],
        orderedIdList: [model?.orderedIdList],
        status: [model?.status],
        type: [model?.type],
        yearStart: [model?.yearStart],
        yearEnd: [model?.yearEnd],
        moduleType: [model?.moduleType],
        subCategoryId: [model?.subCategoryId],
        subCategoryName: [model?.subCategoryName],
        refType: [model?.refType],
        refId: [model?.refId],
        refName: [model?.refName],
        tenantComplaintType: [model?.tenantComplaintType],
        web: [model?.web || true],
        typeDate: [model?.typeDate],
        unixStart: [model?.unixStart],
        unixEnd: [model?.unixEnd],
        dateStart: [model?.dateStart],
        dateEnd: [model?.dateEnd],
        month: [model?.month],
        year: [model?.year],
      }).controls
    );
  }
}

export interface IFilterDetailDTO {
  status: string;
  checklistStatus?: string;
}
export class IFilterDetailDTOForm extends BaseForm {
  readonly statusType = this.get('status') as FormControl;
  readonly checklistStatus = this.get('checklistStatus') as FormControl;
  constructor(
    readonly model?: IFilterDetailDTO,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        status: [model?.status],
        checklistStatus: [model?.checklistStatus],
      }).controls
    );
  }
}
