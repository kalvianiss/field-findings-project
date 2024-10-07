import { AuthService } from 'src/app/shared-comp/service/auth.service';
import { IRequestCreateUserDTO } from './../../../model/user.model';
import { Component, OnInit } from '@angular/core';
import { RestUserService } from 'src/app/shared-comp/service/rest-user.service';
import { SnackbarService } from 'src/app/shared-comp/service/snackbar.service';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/shared-comp/service/image.service';
import { RemoveSperatorService } from 'src/app/shared-comp/service/remove-sperator.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { RestSettingFieldFindingService } from 'src/app/shared-comp/service/rest-setting-field-findings.service';
import { BaseRest } from 'src/app/shared-comp/base-model/base-rest-class';
import { RestCompanyProfileService } from 'src/app/shared-comp/service/rest-company-profile.service';

@Component({
  selector: 'app-print-field-findings',
  templateUrl: './print-field-findings.component.html',
  styleUrls: ['./print-field-findings.component.css']
})
export class PrintFieldFindingsComponent implements OnInit {
  dataDetail;
  name;
  date;
  userData: IRequestCreateUserDTO;
  buildingData: any = null;
  imageUrl;
  titleParamm;

  company;
  constructor(
    public authService: AuthService,
    private userService: RestUserService,
    private snackBar: SnackbarService,
    private route: Router,
    public imageService: ImageService,
    public removeString: RemoveSperatorService,
    private imageCompress: NgxImageCompressService, 
    private settingPrint : RestSettingFieldFindingService,
    private comproService: RestCompanyProfileService,
  ) {
    this.name = 'print-field-findings';
  }

  ngOnInit(): void {
    this.dataDetail = Object.assign(
      {},
      ...JSON.parse(localStorage.getItem('print-field-findings-custom'))
    );
    this.date = new Date().getTime() / 1000;

    BaseRest.build(this.settingPrint)
      .callRest('getInquiryReportSetting', (v) => {
        this.buildingData = v.content;
        console.log('bu', this.buildingData)
        this.loadUser();
      })
      .params();

      if (localStorage.getItem('token')) {
        BaseRest.build(this.comproService)
          .callRest('getCompanyProfile', (v) => {
            localStorage.setItem('buildN', v.content.buildingName);
            this.company = v.content.companyName;
          })
          .params();
      }
  }

  loadUser() {
    BaseRest.build(this.userService)
      .callRest('findUserById', (v) => {
        this.userData = v.content;
      })
      .params(this.authService.jwtDecode.id);
  }

  
  checkStatus(val) {
    let css = '';
    if (val === 'OPEN' || val === 'ON PROGRESS' || val === 'ON_PROGRESS') {
      css = 'box-status-warning';
    } else if (val === 'WAITING WORKING HOUR' || val === 'WAITING_CHIEF') {
      css = 'box-status-waiting';
    } else if (val === 'UPDATE INQUIRY ITEM') {
      css = 'box-status-update';
    } else if (
      val === 'PENDING' ||
      val === 'SET DEPARTMENT' ||
      val === 'SET_EMPLOYEE' ||
      val === 'WAITING MATERIAL' ||
      val === 'WAITING TENANT' ||
      val === 'WAITING CHIEF' ||
      val === 'WAITING TR' ||
      val === 'WAITING PAYMENT' ||
      val === 'ON_CHECK' ||
      val === 'ON CHECK'
    ) {
      css = 'box-status-warning';
    } else if (
      val === 'DECLINED' ||
      val === 'CLOSED' ||
      val === 'INQUIRY ITEM DECLINE'
    ) {
      css = 'box-status-red';
    } else if (val === 'FINISHED' || val === 'APPROVED WORKING HOUR') {
      css = 'box-status-success';
    }
    return css;
  }

  print() {
    window.print();
  }

  backPage() {
    localStorage.removeItem('print-field-findings-custom');
    window.close();
  }
  readImage(val) {
    return this.imageService.getImageByFilename(val);
  }

}
