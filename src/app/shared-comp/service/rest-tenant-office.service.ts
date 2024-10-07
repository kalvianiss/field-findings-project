import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudInterfaceService } from './basecrud.service';

@Injectable({
  providedIn: 'root',
})
export class RestTenantOfficeService extends CrudInterfaceService {
  constructor(http: HttpClient) {
    super(http, 'api/tenant-office', 'api/tenant-office/paging');
  }
  convertSingle(b: any, methodName: string) {
    b.name = b.namaPt;
    return b;
  }
}
