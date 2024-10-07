import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestParams } from '../base-model/rest-params.class';
import {
  BaseResponseInterface,
  CrudInterfaceService,
} from './basecrud.service';
import { ImageService } from './image.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class RestUserService extends CrudInterfaceService {
  constructor(
    http: HttpClient,
    private imageService: ImageService,
    private location: Location
  ) {
    super(http, 'api/user', 'api/user/paging');
  }
  convertSingle(m: any, method: string) {
    if (method === 'findAllPaging') {
      m.deptName = m.department?.deptName;
    }
    if (method === 'getUserShiftScoreReport') {
      m.userProfile.urlSrc = this.imageService.getImageByFilename(
        m.userProfile.imageUrl
      );
      m.srcLocation = this.imageService.getImageByFilename(m.imageLocation);
    }
    if (method === 'findAllByDeptId') {
      m.id = m.userId;
    }
    return m;
  }

  findAllByDeptId(r: RestParams, dto) {
    let url = `${environment.api_cloud}/api/user/findbydept?page=${r.pageNumber}&size=${r.pageSize}`;
    if (r.search) url = url + `&search=${r.search}`;
    return this.request('POST', url, dto);
  }

  findAllUser(r: RestParams, dto) {
    let url = `${environment.api_cloud}/api/user/paging?page=${r.pageNumber}&size=${r.pageSize}`;
    if (r.search) url = url + `&search=${r.search}`;
    return this.request('POST', url, dto);
  }

  getUserDetailDashboard(r: RestParams, dto) {
    let url = `${environment.api_cloud}/api/user/paging?page=${r.pageNumber}&size=${r.pageSize}`;
    if (r.search) url = url + `&search=${r.search}`;
    return this.request('POST', url, dto);
  }

  findUserById(id, lang?: string) {
    let url = `${environment.api_cloud}/api/user/${id}`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('GET', url);
  }

  changePassword(body, lang?: string) {
    let url = `${environment.api_cloud}/api/user/changePassword`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('POST', url, body);
  }

  resetPassword(body, lang?: string) {
    let url = `${environment.api_cloud}/api/user/resetPassword`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('POST', url, body);
  }

  override create(body, lang?: string) {
    let url = `${environment.api_cloud}/api/user`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('POST', url, body);
  }

  override update(id: number, body, lang?: string) {
    let url = `${environment.api_cloud}/api/user/${id}`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('PUT', url, body);
  }

  upload(formData: FormData, lang?: string) {
    let url = `${environment.api_cloud}/api/excel/user`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('POST', url, formData);
  }

  setLocation(id, locationList, lang?: string) {
    let url = `${environment.api_cloud}/api/user/location/${id}`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('POST', url, locationList);
  }

  getUserShiftScoreReport(dto, lang?: string) {
    let url = `${environment.api_cloud}/api/shift-score/user/report?date_end=${dto.date_end}&date_start=${dto.date_start}&user_id=${dto.user_id}`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('GET', url);
  }

  // uploadFixUser(formData: FormData, lang?: string) {
  //   let url = `${environment.api_cloud}/api/excel/user/fix`;
  //   if (lang) url = url + `?lang=${lang}`;
  //   return this.request('POST', url, formData);
  // }

  reportUserMonthly(dto, lang?: string) {
    let url = `${environment.api_cloud}/api/hr/report/user-monthly?date_end=${dto.date_end}&date_start=${dto.date_start}&user_id=${dto.user_id}`;
    if (lang) url = url + `&lang=${lang}`;
    return this.request('GET', url);
  }

  donwloadUser(lang?: string) {
    let url = `${environment.api_cloud}/api/excel/user/download`;
    if (lang) url = url + `?lang=${lang}`;
    // return this.request('GET', url);
    return this._http.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      responseType: 'blob',
    });
  }

  createUser(dto, lang?: string) {
    let url = `${environment.api_image_upload}/api/user`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('POST', url, dto);
  }
  updateUser(id, dto): Observable<string> {
    return this._http.put<string>(
      `${environment.api_image_upload}/api/user/${id}`,
      dto,
      {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      }
    );
    // return this.request('PUT', url, dto);
  }
}
