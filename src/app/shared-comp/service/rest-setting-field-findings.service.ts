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
export class RestSettingFieldFindingService extends CrudInterfaceService {
  constructor(
    http: HttpClient,
    private removeString: RemoveSperatorService,
    private imageService: ImageService
  ) {
    super(http);
  }
  convertSingle(b: any, methodName: string) {
    return b;
  }

  getInquiryReportSetting() {
    let url = `${environment.api_cloud}/api/inquiry-report/setting`;
    return this.request('GET', url);
  }

  
  changeSetting(dto){
    let url = `${environment.api_image_upload}/api/inquiry-report/setting`;
    return this._http.post(url, dto, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}
