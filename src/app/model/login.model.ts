import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseForm } from '../shared-comp/base-model/base-form';

export class ILoginToken {
  building: string;
  phone: string;
  password: string;
}
export class ILoginTokenForm extends BaseForm {
  readonly building = this.get('building') as FormControl;
  readonly phone = this.get('phone') as FormControl;
  readonly password = this.get('password') as FormControl;

  constructor(
    readonly model?: ILoginToken,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        building: [model?.building, [Validators.required]],
        phone: [model?.phone, [Validators.required]],
        password: [model?.password, [Validators.required]],
      }).controls
    );
  }
}

export class IAuthMenu {
  // building: string;
  phone: string;
  password: string;
}
export class IAuthMenuForm extends BaseForm {
  // readonly building = this.get('building') as FormControl;
  readonly phone = this.get('phone') as FormControl;
  readonly password = this.get('password') as FormControl;

  constructor(
    readonly model?: IAuthMenu,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        // building: [model?.building, [Validators.required]],
        phone: [model?.phone, [Validators.required]],
        password: [model?.password, [Validators.required]],
      }).controls
    );
  }
}
