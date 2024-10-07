import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudInterfaceService } from './basecrud.service';

@Injectable({
  providedIn: 'root',
})
export class RestComplaintSubcategoryService extends CrudInterfaceService {
  constructor(http: HttpClient) {
    super(
      http,
      'api/complaint-sub-category',
      'api/complaint-sub-category/paging'
    );
  }
  convertSingle(b: any, methodName: string) {
    b.isActive = b.active;
    return b;
  }

  createComplaintSubCategory(dto, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint-sub-category/create`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('POST', url, dto);
  }
  updateComplaintSubCategory(dto, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint-sub-category/update/${dto.id}`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('PUT', url, dto);
  }
  setActiveSubCategory(dto, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint-sub-category/set-active/${dto.id}?subCategoryActive=${dto.subCategoryActive}`;
    if (lang) url = url + `&lang=${lang}`;
    return this.request('PUT', url);
  }
  findByCategory(category, lang?: string) {
    let url = `${environment.api_cloud}/api/complaint-sub-category/${category}`;
    if (lang) url = url + `?lang=${lang}`;
    return this.request('GET', url);
  }
}
