import { FormBuilder, FormControl } from '@angular/forms';
import { BaseForm } from '../shared-comp/base-model/base-form';

export class IDtoPaging {
  direction: string;
  field: string;
  orderedIdList: [];
  id?: number;
  moduleType?: string;
  unixStart?: number;
  unixEnd?: number;
  dateEnd?: number;
  dateStart?: number;
  info?: string;
  name?: string;
  export?:string;
}

export class IDtoPagingForm extends BaseForm {
  readonly id = this.get('id') as FormControl;
  readonly field = this.get('field') as FormControl;
  readonly unixStart = this.get('unixStart') as FormControl;
  readonly unixEnd = this.get('unixEnd') as FormControl;
  readonly direction = this.get('direction') as FormControl;
  readonly orderedIdList = this.get('orderedIdList') as FormControl;
  readonly moduleType = this.get('moduleType') as FormControl;
  readonly dateStart = this.get('dateStart') as FormControl;
  readonly dateEnd = this.get('dateEnd') as FormControl;
  readonly info = this.get('info') as FormControl;
  readonly name = this.get('name') as FormControl;
  readonly export = this.get('export') as FormControl;

  constructor(
    readonly model?: IDtoPaging,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        direction: [model?.direction],
        field: [model?.field],
        orderedIdList: [model?.orderedIdList],
        id: [model?.id],
        moduleType: [model?.moduleType],
        unixStart: [model?.unixStart],
        unixEnd: [model?.unixEnd],
        dateEnd: [model?.dateEnd],
        dateStart: [model?.dateStart],
        info: [model?.info],
        name: [model?.name],
        export: [model?.export],
      }).controls
    );
  }
}

export class IDtoAvailability {
  day: number;
  month: number;
  view: string;
  year: number;
}

export class DtoPagingDefault {
  direction: string;
  field: string;
  orderedIdList: [];
  idComplaint?: number;
}

export class CustomView {
  menu: string;
  type: string;
  typeSelected: string;
  year: string;
  buildingId: [];
  buildingName: string;
  yearTemp: string;
  type_complaint: string;
  timestamp: number;
}

export class CustomViewForm extends BaseForm {
  readonly menu = this.get('menu') as FormControl;
  readonly year = this.get('year') as FormControl;
  readonly type = this.get('type') as FormControl;
  readonly typeSelected = this.get('typeSelected') as FormControl;
  readonly buildingId = this.get('buildingId') as FormControl;
  readonly yearTemp = this.get('yearTemp') as FormControl;
  readonly buildingName = this.get('buildingName') as FormControl;
  readonly type_complaint = this.get('type_complaint') as FormControl;
  readonly timestamp = this.get('timestamp') as FormControl;

  constructor(
    readonly model?: CustomView,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        menu: [model?.menu],
        type: [model?.type],
        typeSelected: [model?.typeSelected],
        year: [model?.year],
        buildingId: [model?.buildingId],
        yearTemp: [model?.yearTemp],
        buildingName: [model?.buildingName],
        type_complaint: [model?.type_complaint],
        timestamp: [model?.timestamp],
      }).controls
    );
  }
}
export class CustomView2 {
  menu: string;
  type: string;
  typeSelected: string;
  year: string;
  buildingId: [];
  buildingName: string;
  yearTemp: string;
  type_complaint: string;
  timestamp: number;
}

export class CustomViewForm2 extends BaseForm {
  readonly menu = this.get('menu') as FormControl;
  readonly year = this.get('year') as FormControl;
  readonly type = this.get('type') as FormControl;
  readonly typeSelected = this.get('typeSelected') as FormControl;
  readonly buildingId = this.get('buildingId') as FormControl;
  readonly yearTemp = this.get('yearTemp') as FormControl;
  readonly buildingName = this.get('buildingName') as FormControl;
  readonly type_complaint = this.get('type_complaint') as FormControl;
  readonly timestamp = this.get('timestamp') as FormControl;

  constructor(
    readonly model?: CustomView2,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        menu: [model?.menu],
        type: [model?.type],
        typeSelected: [model?.typeSelected],
        year: [model?.year],
        buildingId: [model?.buildingId],
        yearTemp: [model?.yearTemp],
        buildingName: [model?.buildingName],
        type_complaint: [model?.type_complaint],
        timestamp: [model?.timestamp],
      }).controls
    );
  }
}


