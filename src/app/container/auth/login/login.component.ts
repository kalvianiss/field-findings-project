import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { BaseRest } from 'src/app/shared-comp/base-model/base-rest-class';
import { AuthService } from 'src/app/shared-comp/service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ILoginToken, ILoginTokenForm } from 'src/app/model/login.model';
import { SnackbarService } from 'src/app/shared-comp/service/snackbar.service';
import { FormControl } from '@angular/forms';
import { RestAddOnService } from 'src/app/shared-comp/service/rest-add-on.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() typePage: string = '';
  @Input() btnName: string = 'sign in';
  form: ILoginTokenForm = new ILoginTokenForm();
  hide: boolean[] = [true, true, true];
  rememberMeActive: boolean;
  selectLoginForm = new FormControl();

  selectLogin: any = [
    {
      name: 'Field Findings',
      id: 1,
    },
    {
      name: 'Tenant Complaint',
      id: 2,
    },
  ];
  selected = -1;
  reload;
  arrAddOn: any = [];
  constructor(
    private router: Router,
    private restAuth: AuthService,
    private cookieService: CookieService,
    private snacbarService: SnackbarService,
    private renderer: Renderer2, 
    private addOn: RestAddOnService
  ) {}

  ngOnInit(): void {
    if (this.restAuth.token) {
      this.router.navigate(['/tenant-complaint']);
    }
    this.getCookies();
  }

  showPass(val, idx) {
    this.hide[idx] = !this.hide[idx];
  }
  checkedValue(event, dt) {
    this.selectLoginForm.setValue(dt.id);
  }
  submit() {
    // let err;
    // if (!this.selectLoginForm.value) {
    //   err = true;
    //   this.snacbarService.createInfo('Please select Field Findings / Tenant Complaint');
    // }
    // if (err) return;
    
    // if (this.selectLoginForm.value === 1) {
    //   localStorage.setItem('typeLogin', 'Field Findings');
    // } else {
    //   localStorage.setItem('typeLogin', 'Tenant Complaint');
    // }
    

    BaseRest.build(this.restAuth)
      .callRest('createAuthenticationToken', (v) => {
        this.snacbarService.createSuccess(v.message);
        this.onSuccess(v);
        BaseRest.build(this.addOn)
        .callRest('getAddOnList', (e) => {
          localStorage.setItem('addOn', JSON.stringify(e.content));
          this.arrAddOn = JSON.parse(localStorage.getItem('addOn'));
          console.log('arr', this.arrAddOn)
          if(this.arrAddOn?.[0]?.name === 'Tenant Complaint'){
            this.router.navigate(['/tenant-complaint']);
          }
          else if (this.arrAddOn?.[0]?.name === 'Field Findings'){
             this.router.navigate(['/field-findings']);
          }else{
            return
            // this.restAuth.token = null;
            // this.router.navigateByUrl('/');
            // this.restAuth.removeAuthenticate();
          }
        })
        .params();
        window.location.reload()
      })
      .params(this.form.getRawValue());
  }

  onSuccess(v) {
    this.restAuth.token = v.content.token;
    localStorage.setItem('codeClientComplaint', this.form.building.value);
    localStorage.removeItem('nb');
    localStorage.removeItem('buildName');
  }

  rememberMe(event) {
    if (event.checked) {
      this.cookieService.set('building', this.form.building.value);
      this.cookieService.set('nope', this.form.phone.value);
      this.cookieService.set('pass', this.form.password.value);
    } else {
      this.cookieService.delete('nope');
      this.cookieService.delete('building');
      this.cookieService.delete('pass');
    }
  }
  getCookies() {
    let rmb: any = {
      building: this.cookieService.get('building'),
      phone: this.cookieService.get('nope'),
      password: this.cookieService.get('pass'),
    };
    if (
      this.cookieService.get('building') &&
      this.cookieService.get('nope') &&
      this.cookieService.get('pass')
    ) {
      this.rememberMeActive = true;
      this.form = new ILoginTokenForm(rmb);
    }
  }
}
