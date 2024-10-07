import { trigger } from '@angular/animations';
import { I } from '@angular/cdk/keycodes';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  debounceTime,
  Observable,
  Subject,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs';
import { AppModule } from 'src/app/app.module';
// import {
//   ErrorMaintenance,
//   ErrorPageFailToLoad,
//   ErrorUnderdevelopment,
// } from 'src/app/info/error-page-class';
import { AuthService } from '../service/auth.service';
import {
  BaseResponseInterface,
  CrudInterfaceService,
} from '../service/basecrud.service';
import { LoadingService } from '../service/loading.service';
import { SnackbarService } from '../service/snackbar.service';
// import { TableDataService } from '../service/table-data.service';
// import { TitleBreadcrumbService } from '../service/title-breadcrumb.service';
import { RestParams } from './rest-params.class';

@Component({ template: '' })
export class BaseRest {
  loadingService: LoadingService;
  authservice: AuthService;
  alive: boolean = true;
  snackbar: SnackbarService;
  restService: CrudInterfaceService;
  // title: TitleBreadcrumbService;
  viewLoading = true;
  debounceTime = 2000;

  functionName: string;
  successFn: any;
  errorFn: any;

  loadDialog: boolean = false;

  private constructor() {
    this.snackbar = AppModule.injector.get(SnackbarService);
    this.loadingService = AppModule.injector.get(LoadingService);
    // this.title = AppModule.injector.get(TitleBreadcrumbService);
    this.authservice = AppModule.injector.get(AuthService);
  }

  static buildDialog(crudService: CrudInterfaceService) {
    let base = new BaseRest();
    base.loadDialog = true;
    base.restService = crudService;
    return base;
  }

  static build(crudService: CrudInterfaceService) {
    let base = new BaseRest();
    base.loadDialog = false;
    base.restService = crudService;
    return base;
  }

  ignoreLoading() {
    this.viewLoading = false;
    return this;
  }

  private doingRest(
    b: Observable<any>,
    methodName: string,
    onSuccess?,
    onError?: any,
    onComplete?: any
  ) {
    this.authservice.hit();
    if (this.viewLoading) {
      this.loadingService.loadingBtn$.next(true);
      if (!this.loadDialog) {
        this.loadingService.loadingAll$.next(true);
      }
      this.loadingService.loadingDialog$.next(true);
      this.loadingService.loadingTable$.next(true);
    }

    b.pipe(takeWhile(() => this.alive)).subscribe({
      next: (v) => {
        if (v && v.success === false) {
          onError ? onError : this.onError(v.message);
        } else {
          if (v.content) {
            try {
              v = this.restService.convertAction(v, methodName);
            } catch {}
            // v = this.restService.convertContent(v, methodName);
            v = this.restService.convertColumnReponse(v, methodName);
          }
          // this.title.info$.next(v.info);
          if (onSuccess) {
            onSuccess(v);
          } else {
            this.snackbar.createSuccess(v?.message);
          }
        }
      },
      error: (e) => (onError ? onError(e) : this.onError(e)),
      complete: () => {
        if (onComplete) onComplete();
        this.onCompleted();
      },
    });
  }

  onCompleted() {
    this.loadingService.loadingAll$.next(false);
    this.loadingService.loadingDialog$.next(false);
    this.loadingService.loadingBtn$.next(false);
    this.alive = false;
  }

  onError(e: any) {
    this.onCompleted();

    if (!e) return;
    if (e.name === 'HttpErrorResponse') {
      let http = e as HttpErrorResponse;
      let err = http.error?.message;
      if (!err) {
        err = http.message;
      }

      switch (http.status) {
        case 0:
          // new ErrorPageFailToLoad();
          break;
        case 401:
          if (!err) {
            err = 'Unauthorized';
          }
          this.snackbar.createError(err);
          AppModule.injector.get(AuthService).removeAuthenticate();
          break;
        case 502:
          // new ErrorMaintenance();
          break;
        case 400:
        case 500:
        default:
          this.snackbar.createError(err);
          break;
      }
    } else {
      this.snackbar.createSuccess(e);
    }
  }

  findAll(onSuccess, filter?, onError?) {
    this.doingRest(
      this.restService['findAll'](filter),
      'findAll',
      onSuccess,
      onError
    );
  }

  findAllPaging(
    onSuccess,
    restParam?: RestParams,
    filter = { orderedIdList: null },
    onError?
  ) {
    this.doingRest(
      this.restService['findAllPaging'](restParam, filter),
      'findAllPaging',
      onSuccess,
      onError
    );
  }

  findById(id: number, onSuccess, onError?) {
    this.doingRest(
      this.restService['findById'](id),
      'findById',
      onSuccess,
      onError
    );
  }

  createOrUpdate(data, onSuccess, onError?) {
    this.viewLoading = false;
    if (data.id) {
      this.doingRest(
        this.restService['update'](data.id, data),
        'update',
        onSuccess,
        onError
      );
    } else {
      this.doingRest(
        this.restService['create'](data),
        'create',
        onSuccess,
        onError
      );
    }
  }

  delete(id: number, onSuccess, onError?) {
    this.doingRest(
      this.restService['delete'](id),
      'delete',
      onSuccess,
      onError
    );
  }

  callRest(functionName: string, onSuccess?, onError?) {
    this.functionName = functionName;
    this.successFn = onSuccess;
    this.errorFn = onError;
    return this;
  }

  params(...params) {
    this.doingRest(
      this.restService[this.functionName](...params),
      this.functionName,
      this.successFn,
      this.errorFn
    );
  }

  refresh() {}
}
