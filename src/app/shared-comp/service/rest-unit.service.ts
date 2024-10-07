import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudInterfaceService } from './basecrud.service';
import { RestParams } from '../base-model/rest-params.class';

@Injectable({
  providedIn: 'root',
})
export class RestUnitService extends CrudInterfaceService {
  constructor(http: HttpClient) {
    super(http, 'api/unit', 'api/unit/paging');
  }
  convertSingle(b: any, methodName: string) {
    if (methodName === 'findAllPaging') {
      b.name = b.typeUnit;
      b.active = b.setActive;
      b.setActive = b.setActive ? 'ACTIVE' : 'IN ACTIVE';
    }
    return b;
  }

  createUnit(dto, lang?: string) {
    let url = `${environment.api_cloud}/api/unit`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('POST', url, dto);
  }
  updateUnit(id: number, dto, lang?: string) {
    let url = `${environment.api_cloud}/api/unit/${id}`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('PUT', url, dto);
  }
  donwloadUnit(lang?: string) {
    let url = `${environment.api_cloud}/api/excel/unit`;
    if (lang) url = url + `?lang=${lang}`;
    return this._http.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      responseType: 'blob',
    });
    // return this.request('GET', url);
  }

  upload(formData: FormData, lang?: string) {
    let url = `${environment.api_cloud}/api/excel/unit`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('POST', url, formData);
  }
  uploadUnitOnly(formData: FormData, lang?: string) {
    let url = `${environment.api_cloud}/api/excel/unit-only`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('POST', url, formData);
  }
  resetMeterUnit(dto, lang?: string) {
    let url = `${environment.api_cloud}/api/unit/reset`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('POST', url, dto);
  }

  setActive(dto, lang?: string) {
    let url = `${environment.api_cloud}/api/unit/set-active/${dto.id}?unitStatus=${dto.active}`;
    if (lang) url = url + `&lang=${lang}`;
    return this.request('PUT', url);
  }

  setTenant(unitId, dto, lang?: string) {
    let url = `${environment.api_cloud}/api/unit/set-tenant/${unitId}`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('POST', url, dto);
  }

  findComplaintUnit(res: RestParams, dto, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint/paging/${dto.unitId}?page=${res.pageNumber}&size=${res.pageSize}`;
    if (lang) url = url + `&lang=${lang}`;
    if (res.search) url = url + `&search=${res.search}`;
    return this.request('POST', url, dto);
  }

  uploadUnitVA(formData: FormData, lang?: string) {
    let url = `${environment.api_cloud}/api/excel/unit-va`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('POST', url, formData);
  }
  uploadNotePayment(formData: FormData, lang?: string) {
    let url = `${environment.api_cloud}/api/excel/unit-note-payment`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('POST', url, formData);
  }
}
