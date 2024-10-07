import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { BaseForm } from '../shared-comp/base-model/base-form';

export class IRequestCreateUserDTO {
  departmentId: number;
  name: string;
  email: string;
  phone: string;
  phone2: string;
  enabled: boolean;
  password: string;
  // userPrivilegeAccessList: IUserPrivileges[];
  src?: string;
  deleteImage: boolean;
  imageLocation?: string;
  chief: boolean;
  rolesId: number;
  rolesName?: string;
  webAccess: boolean;
  positionId: string;
  positionName: string;
  id: number;
  imagePath?: string;
}
export class IRequestCreateUserDTOForm extends BaseForm {
  readonly id = this.get('id') as FormControl;
  readonly departmentId = this.get('departmentId') as FormControl;
  readonly email = this.get('email') as FormControl;
  readonly phone = this.get('phone') as FormControl;
  readonly phone2 = this.get('phone2') as FormControl;
  // readonly userPrivilegeAccessListControl = this.get(
  //   'userPrivilegeAccessList'
  // ) as FormControl;
  // readonly userPrivilegeAccessList = (
  //   this.get('userPrivilegeAccessList') as FormArray
  // ).controls as IUserPrivilegesForm[];
  readonly name = this.get('name') as FormControl;
  readonly password = this.get('password') as FormControl;
  readonly enableds = this.get('enabled') as FormControl;
  readonly src = this.get('src') as FormControl;
  readonly deleteImage = this.get('deleteImage') as FormControl;
  readonly imageLocation = this.get('imageLocation') as FormControl;
  readonly chief = this.get('chief') as FormControl;
  readonly rolesId = this.get('rolesId') as FormControl;
  readonly rolesName = this.get('rolesName') as FormControl;
  readonly webAccess = this.get('webAccess') as FormControl;
  readonly positionId = this.get('positionId') as FormControl;
  readonly positionName = this.get('positionName') as FormControl;
  readonly imagePath = this.get('imagePath') as FormControl;
  constructor(
    readonly model?: IRequestCreateUserDTO,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        departmentId: [model?.departmentId, [Validators.required]],
        email: [model?.email, [Validators.required, Validators.email]],
        enabled: [model?.enabled],
        name: [model?.name],
        password: [model?.password, [Validators.required]],
        phone: [model?.phone, [Validators.required]],
        phone2: [model?.phone2],
        deleteImage: [model?.deleteImage],
        src: [model?.src],
        imageLocation: [model?.imageLocation],
        chief: [model?.chief],
        rolesId: [model?.rolesId],
        rolesName: [model?.rolesName],
        webAccess: [model?.webAccess],
        positionId: [model?.positionId],
        positionName: [model?.positionName],
        id: [model?.id],
        imagePath: [model?.imagePath],
        // userPrivilegeAccessList: fb.array([]),
      }).controls
    );
  }
  checkPhoneInput() {
    let ph1 = this.phone.value;
    let ph2 = this.phone2.value;
    this.phone.setValue(Number(ph1));
    this.phone2.setValue(Number(ph2));
  }
  // addUserPriveges(i?: IUserPrivileges[]) {
  //   i?.forEach((x) => {
  //     this.userPrivilegeAccessList.push(new IUserPrivilegesForm(x));
  //   });

  //   this.userPrivilegeAccessListControl.setValue(
  //     this.userPrivilegeAccessList.map((e) => {
  //       return e.value;
  //     })
  //   );
  // }
}

export class RequestChangePasswordDTO {
  newPassword: string;
  oldPassword: string;
  userId: number;
  validateNewPasswordIsNotEmptyWhitespace: boolean;
  validateOldAndNewAreSame: boolean;
  newPasswordConfirm?: string;
}
export class RequestChangePasswordDTOForm extends BaseForm {
  readonly newPassword = this.get('newPassword') as FormControl;
  readonly oldPassword = this.get('oldPassword') as FormControl;
  readonly userId = this.get('userId') as FormControl;
  readonly validateNewPasswordIsNotEmptyWhitespace = this.get(
    'validateNewPasswordIsNotEmptyWhitespace'
  ) as FormControl;
  readonly validateOldAndNewAreSame = this.get(
    'validateOldAndNewAreSame'
  ) as FormControl;
  readonly newPasswordConfirm = this.get('newPasswordConfirm') as FormControl;
  constructor(
    readonly model?: RequestChangePasswordDTO,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        newPassword: [model?.newPassword],
        oldPassword: [model?.oldPassword],
        userId: [model?.userId],
        validateNewPasswordIsNotEmptyWhitespace: [
          model?.validateNewPasswordIsNotEmptyWhitespace,
        ],
        validateOldAndNewAreSame: [model?.validateOldAndNewAreSame],
        newPasswordConfirm: [model?.newPasswordConfirm],
      }).controls
    );
  }
}

export class IUserPrivileges {
  id: number;
  type: string;
}
export class IUserPrivilegesForm extends BaseForm {
  readonly id = this.get('id') as FormControl;
  readonly type = this.get('type') as FormControl;
  constructor(
    readonly model?: IUserPrivileges,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        id: [model?.id],
        type: [model?.type],
      }).controls
    );
  }
}

export class IRequestFilterUser {
  deptId: number;
  deptName?: string;
  excludeChief: boolean;
  statusEnabled: boolean;
}
export class IRequestFilterUserForm extends BaseForm {
  readonly deptId = this.get('deptId') as FormControl;
  readonly deptName = this.get('deptName') as FormControl;
  readonly excludeChief = this.get('excludeChief') as FormControl;
  readonly statusEnabled = this.get('statusEnabled') as FormControl;
  constructor(
    readonly model?: IRequestFilterUser,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        deptId: [model?.deptId],
        deptName: [model?.deptName],
        excludeChief: [model?.excludeChief],
        statusEnabled: [model?.statusEnabled],
      }).controls
    );
  }
}
export class IUserPaging {
  deptId: number;
  direction: string;
  excludeChief: boolean;
  field: string;
  moduleType: string;
  month: number;
  orderedIdList: [];
  withComplaintJob: boolean;
  withScore: boolean;
  year: number;
  officer: boolean;
}

export class IRequestFilterUserActivity {
  dateStart: number;
  dateEnd: number;
  moduleType?: string;
}
export class IRequestFilterUserActivityForm extends BaseForm {
  readonly dateStart = this.get('dateStart') as FormControl;
  readonly dateEnd = this.get('dateEnd') as FormControl;
  readonly moduleType = this.get('moduleType') as FormControl;
  constructor(
    readonly model?: IRequestFilterUserActivity,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group({
        dateStart: [model?.dateStart],
        dateEnd: [model?.dateEnd],
        moduleType: [model?.moduleType],
      }).controls
    );
  }
}
