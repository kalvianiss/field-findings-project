import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { first, takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CrudInterfaceService } from './basecrud.service';
import { SnackbarService } from './snackbar.service';
import { IToken } from 'src/app/model/token.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { utc } from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends CrudInterfaceService {
  convertSingle(b: any, methodName: string) {
    return b;
  }
  private env_cloud: string = environment.api_cloud;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {
    super(http);
  }

  public hit() {
    let currentTime = new Date().getTime() / 1000;
    let lastHit = +localStorage.getItem('time');
    if (lastHit === 0) {
      localStorage.setItem('time', currentTime.toString());
      return;
    }
    if (Math.floor(lastHit - currentTime) <= -3600) {
      this.removeAuthenticate();
    } else {
      localStorage.setItem('time', currentTime.toString());
    }
  }

  createAuthenticationToken(data: any): Observable<any> {
    return this.http.post<any>(
      `${environment.api_cloud}/api/authenticate?web=true`,
      data
    );
  }

  previewFile(url) {
    this.http
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        responseType: 'blob',
      })
      .pipe(first())
      .subscribe((response) => {
        let blob = new Blob([response], { type: 'application/pdf' });
        let fileURL = URL.createObjectURL(blob);
        window.open(fileURL);
      });
  }

  refreshAndGetAuthenticationToken(): Observable<string> {
    return this.http.get<string>(`${environment.api_cloud}/api/refresh`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  onlinecloud() {
    return this.http.get(`${this.env_cloud}/online?web=true`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  get token() {
    let t = localStorage.getItem('token');
    return t;
  }
  set token(val: string) {
    val ? localStorage.setItem('token', val) : localStorage.clear();
  }

  get jwtDecode(): IToken {
    return new JwtHelperService().decodeToken(this.token);
  }


  removeAuthenticate(msg?: string) {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('time');
    localStorage.removeItem('codeClient');

    this.router.navigate(['login']);
    this.dialog.closeAll();
    if (msg) {
      this.snackbarService.createInfo(msg);
    }
  }

  refreshTokenAccess() {
    return this.request('GET', `${environment.api_cloud}/refresh`);
  }

  buildingAuthCode(code, lang?: string) {
    let url = `${environment.api_cloud}/api/head_office/building/authenticate?code=${code}`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('GET', url);
  }
}
