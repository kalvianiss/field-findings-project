import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudInterfaceService } from './basecrud.service';
import { ImageService } from './image.service';

@Injectable({
  providedIn: 'root',
})
export class RestAddOnService extends CrudInterfaceService {
  constructor(http: HttpClient) {
    super(http);
  }

  convertSingle(b: any, methodName: string) {
    return b;
  }

  getAddOnList(lang?: string) {
    let url = `${environment.api_cloud}/api/add-on/get-add-on-list`;
    if (lang) url = url + `&lang=${lang}`;
    return this.request('GET', url);
  }

}
