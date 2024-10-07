import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { BaseRest } from 'src/app/shared-comp/base-model/base-rest-class';
import { AuthService } from 'src/app/shared-comp/service/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ILoginToken, ILoginTokenForm } from 'src/app/model/login.model';
import { SnackbarService } from 'src/app/shared-comp/service/snackbar.service';

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
  reload;
  constructor(
    private router: Router,
    private restAuth: AuthService,
    private cookieService: CookieService,
    private snacbarService: SnackbarService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (this.restAuth.token) {
      this.router.navigate(['field-findings']);
    }
    this.getCookies();
  }

  showPass(val, idx) {
    this.hide[idx] = !this.hide[idx];
  }

  submit() {
    BaseRest.build(this.restAuth)
      .callRest('createAuthenticationToken', (v) => {
        this.onSuccess(v);
        this.snacbarService.createSuccess(v.message);
      })
      .params(this.form.getRawValue());
  }

  onSuccess(v) {
    this.restAuth.token = v.content.token;
    localStorage.setItem('codeClient', this.form.building.value);
    localStorage.removeItem('nb');
    localStorage.removeItem('buildName');
    this.router.navigateByUrl('/field-findings');
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
