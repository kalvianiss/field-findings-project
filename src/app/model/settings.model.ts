import { FormArray, FormBuilder, FormControl } from "@angular/forms";
import { BaseForm } from "../shared-comp/base-model/base-form";

export class IRequestSettingFieldFinding {
    logo1: string;
    logo2: string;
    signatureList: [];
    // signatureList: IdataSignature[];
  }
  export class IRequestSettingFieldFindingForm extends BaseForm {
    readonly logo1 = this.get('logo1') as FormControl;
    readonly logo2 = this.get('logo2') as FormControl;
    readonly signatureList = this.get('signatureList') as FormControl;
    // readonly signatureList = (this.get('signatureList') as FormArray).controls as IdataSignatureForm[];
    // readonly signatureListControl = this.get('signatureList') as FormControl;
    constructor(
      readonly model?: IRequestSettingFieldFinding,
      readonly fb: FormBuilder = new FormBuilder()
    ) {
      super(
        fb.group({
          logo1: [model?.logo1],
          logo2: [model?.logo2],
          signatureList: [model?.signatureList],
          // signatureList: fb.array([]),
        }).controls
      );
    }
    
    // addWorkerCustom(i: IdataSignature[]) {
    //     i?.forEach((x) => {
    //       this.signatureList.push(new IdataSignatureForm(x));
    //     });
    //     this.signatureListControl.setValue(
    //       this.signatureList.map((val) => {
    //         return val.value;
    //       })
    //     );
    //   }

    //   removeNewListCustom(idx) {
    //     let find = this.signatureList.findIndex((val, i) => i === idx);
    //     if (find > -1) {
    //       this.signatureList.splice(find, 1);
    //     }
    //   }
  }

  export class IdataSignature {
    name?: string;
    constructor() {}
   }
   export class IdataSignatureForm extends BaseForm {
    readonly name = this.get('name') as FormControl;
  
     constructor(
       readonly model?: IdataSignature,
       readonly fb: FormBuilder = new FormBuilder()
     ) {
       super(
         fb.group({
          name:[model?.name]
         }).controls
       );
     }
   
   }
  