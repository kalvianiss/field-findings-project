import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActionList, TableConfigList, UIConfig } from '../../model/table-model';
import { RestParams } from '../base-model/rest-params.class';
import { TableDataService } from './table-data.service';
import { lang } from 'src/app/lang/lang.interface';
import { AppModule } from 'src/app/app.module';
import { LangService } from './langservice.service';

export interface BaseResponseInterface {
  message: string;
  content: BaseResponsePaging;
  success: boolean;
  uiConfig?: UIConfig;
  invoiceValue?: any;
}

export interface BaseResponsePaging {
  content: any;
  totalElements: number;
  first: boolean;
  last: boolean;
  totalPages: number;
  info?: any;
}

export abstract class CrudInterfaceService {
  sortField$ = new Subject<any>();
  sortDir$ = new Subject<any>();

  constructor(
    protected _http: HttpClient,
    protected _api_gateway: string = '',
    protected _api_paging: string = '',
    protected _api_paging_method: string = 'POST' // protected tableService?: TableDataService
  ) {}

  request(method: string, url: any, body?: any, param?: any): Observable<any> {
    return this._http.request<any>(method, url, {
      body: body,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params: param,
    });
  }

  requestHo(
    method: string,
    url: any,
    body?: any,
    param?: any
  ): Observable<any> {
    return this._http.request<any>(method, url, {
      body: body,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('tokenHo')}`,
      },
      params: param,
    });
  }

  //dont extend
  convertAction(b: any, methodName: string): BaseResponseInterface {
    let act = [...b?.uiConfig?.actionList];
    if (b?.content?.content) {
      b?.content?.content?.forEach((e) => {
        this.convertAct(e, act, methodName);
      });
      return b;
    } else {
      this.convertAct(b.content, act, methodName);
      return b;
    }
  }

  convertColumnReponse(
    b: BaseResponseInterface,
    methodName: string
  ): BaseResponseInterface {
    if (b?.uiConfig?.tableConfigList) {
      b.uiConfig.tableConfigList = this.convertColumn(
        b.uiConfig.tableConfigList,
        methodName
      );
      return b;
    }
    return b;
  }

  abstract convertSingle(b: any, methodName: string): any;

  convertAct(b, dd: ActionList[], methodName: string) {
    let arr = [];
    if (dd) {
      dd.forEach((e) => {
        if (e.location === 'SIDE') arr.push(e);
      });
      b.actionMenu = arr;
    }
  }

  convertColumn(b: TableConfigList[], methodName: string) {
    return b;
  }

  protected create(data): Observable<any> {
    return this.request(
      'POST',
      `${environment.api_cloud}/${this._api_gateway}`,
      data
    );
  }

  protected findAllPaging(
    r: RestParams,
    filter
  ): Observable<BaseResponseInterface> {
    let str = r.buildQuery(this._api_paging);
    return this.request(this._api_paging_method, str, filter);
  }

  protected findAllPagingHo(
    r: RestParams,
    filter
  ): Observable<BaseResponseInterface> {
    let str = r.buildQuery(this._api_paging);
    return this.requestHo(this._api_paging_method, str, filter);
  }

  protected findAll(filter: any = {}): Observable<any> {
    let str = `${environment.api_cloud}/${
      this._api_paging
    }?page=${1}&size=${3000}`;
    return this.request(this._api_paging_method, str, filter);
  }

  protected findById(id: number): Observable<any> {
    return this.request(
      'GET',
      `${environment.api_cloud}/${this._api_gateway}/${id}`
    );
  }

  protected update(id: number, data: any): Observable<any> {
    return this.request(
      'PUT',
      `${environment.api_cloud}/${this._api_gateway}/${id}`,
      data
    );
  }

  protected delete(id: number): Observable<any> {
    return this.request(
      'DELETE',
      `${environment.api_cloud}/${this._api_gateway}/${id}`
    );
  }

  protected downloadTemplate(fileName, lang?: string): Observable<any> {
    let url = `${environment.api_cloud}/api/excel/blank?type=${fileName}`;
    if (lang) url = url + `&lang=${lang}`;
    return this._http.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      responseType: 'blob',
    });
  }
}
