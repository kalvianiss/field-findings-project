import { B, I } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestParams } from '../base-model/rest-params.class';
import { CrudInterfaceService } from './basecrud.service';
import { ImageService } from './image.service';
import { RemoveSperatorService } from './remove-sperator.service';

@Injectable({
  providedIn: 'root',
})
export class RestComplaintService extends CrudInterfaceService {
  constructor(
    http: HttpClient,
    private removeString: RemoveSperatorService,
    private imageService: ImageService
  ) {
    super(http, 'api/complaint', 'api/complaint/paging');
  }
  convertSingle(b: any, methodName: string) {
    if (methodName === 'findAllPaging') {
      if (b.tenantComplaintType) {
        b.tenantComplaintType = this.removeString.remove_(
          b.tenantComplaintType
        );
      }
      b.buildingComplaintFrom = this.removeString.remove_(
        b.buildingComplaintFrom
      );
      b.status = this.removeString.remove_(b.status);
      b.number = b.complaintCode;
      if (b.tenantComplaintType === 'PUBLIC AREA') {
        let find = b.actionMenu.findIndex((v) => v.key === 'confirmToTenant');
        if (find > -1) {
          b.actionMenu.splice(find, 1);
        }
      }
      if (
        b.status === 'DECLINED' ||
        b.status === 'FINISHED' ||
        b.status === 'CLOSED'
      ) {
        let find = b.actionMenu.findIndex((v) => v.key === 'removeDept');
        if (find > -1) {
          b.actionMenu.splice(find, 1);
        }
      }
    }
    if (methodName === 'findById') {
      b.restImage = [];
      b?.imageList?.forEach((x, i) => {
        b.restImage.push(this.imageService.getImageByFilename(x.imageLocation));
      });
      b?.progresses.forEach((val, i) => {
        if (val.image) {
          b.restImage.push(this.imageService.getImageByFilename(val.image));
        }
        val.src = this.imageService.getImageByFilename(val.image);
        val.status = this.removeString.remove_(val.status);
      });
    }

    return b;
  }

  findAllComplaint(res: RestParams, dto, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint/paging?page=${res.pageNumber}&size=${res.pageSize}`;
    if (res.search) url = url + `&search=${res.search}`;
    if (lang) url = url + `&lang=${lang}`;
    return this.request('POST', url, dto);
  }
  setDepartment(dto, id: number, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint/${id}/department`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('PUT', url, dto);
  }
  setEmployee(dto, id: number, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint/${id}/employee`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('PUT', url, dto);
  }
  createProgress(dto, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint/progress`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('POST', url, dto);
  }
  updateProgress(dto, progressId: number, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint/progress/${progressId}`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('PUT', url, dto);
  }
  findComplaintCategory(lang?: string) {
    let url = `${environment.api_cloud}/api/complaint-category`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('GET', url);
  }

  complaintFinished(id: number, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint/${id}/finished`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('GET', url);
  }
  complaintCancel(id: number, note?: string, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint/${id}/cancel`;
    if (lang) url = url + `&lang=${lang}`;
    if (note) url = url + `?note=${note}`;
    return this.request('GET', url);
  }

  confirmToTenant(id, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint/${id}/confirm-to-tenant`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('GET', url);
  }
  setItem(id: number, dto, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint/${id}/set-item`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('PUT', url, dto);
  }

  setTypeComplaint(body, id, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint/${id}/set-type`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('PUT', url, body);
  }

  setWorkHour(body, id, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint/${id}/work-hour`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('PUT', url, body);
  }
  setForward(dto, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint/progress/${dto.idProgress}/forward`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('PUT', url, dto);
  }

  approvePayment(id, lang?) {
    let url = `${environment.api_cloud}/api/complaint/${id}/approve-payment`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('PUT', url);
  }
  removeItem(id, itemId, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint/${id}/delete-item/${itemId}`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('DELETE', url);
  }

  approveItem(id, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint/${id}/approve-item`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('PUT', url);
  }

  downloadComplain(res: RestParams, dto, lang) {
    let url = `${environment.api_cloud}/api/excel/complaint/download`;
    if (res.search) url = url + `?search=${res.search}`;
    if (lang) url = url + `&lang=${lang}`;
    return this._http.post(url, dto, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      responseType: 'blob',
    });
  }
  changeCategory(dto, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint/${dto.id}/change-category?subcategoryId=${dto.subcategoryId}`;
    if (lang) url = url + `&lang=${lang}`;
    return this.request('GET', url);
  }

  printComplaintByid(id, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint-print/${id}`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('GET', url);
  }

  setServiceLevelAgreement(id, dto, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint/${id}/set-sla`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('PUT', url, dto);
  }

  getItemDetail(inquiryId, dto, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint/${inquiryId}/set-item-detail`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('PUT', url, dto);
  }

  findDeptByComplaint(res: RestParams, dto, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint/${dto.idComplaint}/find_dept?page=${res.pageNumber}&size=${res.pageSize}`;
    if (res.search) url = url + `&search=${res.search}`;
    if (lang) url = url + `&lang=${lang}`;
    return this.request('POST', url, dto);
  }

  removeDeptComplaint(id, dto, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint/${id}/remove_dept`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('DELETE', url, dto);
  }

  createComplaint(dto) {
    let url = `${environment.api_image_upload}/api/complaint`;
    return this._http.post(url, dto, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}
