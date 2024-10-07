import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudInterfaceService } from './basecrud.service';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root',
})
export class RestCompanyProfileService extends CrudInterfaceService {
  constructor(http: HttpClient, private imageService: ImageService) {
    super(http);
  }

  convertSingle(b: any, methodName: string) {
    return b;
  }

  getCompanyProfile(lang?: string) {
    let url = `${environment.api_cloud}/api/company`;
    if (lang) url = url + `&lang=${lang}`;
    return this.request('GET', url);
  }

}
