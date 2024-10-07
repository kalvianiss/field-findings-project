import {
  FormArray,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { SnackbarService } from '../service/snackbar.service';

export class BaseForm extends FormGroup {
  constructor(controls) {
    super(controls);
  }

  removeControlValidator(key: string) {
    this.get(key).setValidators(null);
    this.get(key).setErrors(null);
  }

  removeAllValidator() {
    Object.keys(this.controls).forEach((e) => {
      this.get(e).setValidators(null);
      this.get(e).setErrors(null);
    });
  }

  getFormValidationErrors(idx?: number) {
    Object.keys(this.controls).forEach((key) => {
      if (this.get(key).invalid) {
        this.setErrors({ incorrect: key });
        let c = (this.get(key) as FormArray).controls;
        if (Array.isArray(c)) {
          c.forEach((e, i) => {
            try {
              e['getFormValidationErrors'](i + 1);
            } catch {}
          });
        } else {
          try {
            this.get(key)['getFormValidationErrors']();
          } catch {}
        }
      }
      const controlErrors: ValidationErrors = this.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          let info;
          let name = Object.getPrototypeOf(this).constructor.name;
          if (idx >= 0) {
            info = name + ' index : ' + idx + ' ' + key + ' ' + keyError;
          } else {
            info = name + ' ' + key + ' ' + keyError;
          }
          AppModule.injector.get(SnackbarService).createError(info);
        });
      }
    });
  }
}
