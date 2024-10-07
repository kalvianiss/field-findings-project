import { ImageService } from './../../shared-comp/service/image.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataUrl, DOC_ORIENTATION, NgxImageCompressService } from 'ngx-image-compress';
import { IdataSignatureForm, IRequestSettingFieldFindingForm } from 'src/app/model/settings.model';
import { BaseRest } from 'src/app/shared-comp/base-model/base-rest-class';
import { RestSettingFieldFindingService } from 'src/app/shared-comp/service/rest-setting-field-findings.service';
import { SnackbarService } from 'src/app/shared-comp/service/snackbar.service';

@Component({
  selector: 'app-settings-field-finding-dialog',
  templateUrl: './settings-field-finding-dialog.component.html',
  styleUrls: ['./settings-field-finding-dialog.component.css']
})
export class SettingsFieldFindingDialogComponent implements OnInit {
  form : IRequestSettingFieldFindingForm = new IRequestSettingFieldFindingForm();
  file: File;
  file2: File;
  settingsData;
  signatureListData;
  constructor(   
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<SettingsFieldFindingDialogComponent>,
  private dialog: MatDialog,
  private imageCompress: NgxImageCompressService, 
  private settingRest: RestSettingFieldFindingService, 
  private snackbarService: SnackbarService, 
  private imageService: ImageService
) { }

  ngOnInit(): void {
    BaseRest.build(this.settingRest)
    .callRest('getInquiryReportSetting', (v) => {
      this.form = new IRequestSettingFieldFindingForm(v.content);
      if(this.form.logo1.value !== null){
      this.imageService
      .restToFile(
        this.imageService.getImageByFilename(
          this.form.logo1.value
        )
      )
      .then((e) => {
        this.file = e;
      });
    }

      if(this.form.logo2.value !== null){
      this.imageService
        .restToFile(
          this.imageService.getImageByFilename(
            this.form.logo2.value
          )
        )
        .then((e) => {
          this.file2 = e;
        });
      }
    })
    .params();

    
  }

  updateUserImage(event, type) {
    if (event.addedFiles) {
      let imageInput: File = event.addedFiles[0];
      const reader = new FileReader();
      reader.onload = (c: any) => {
        if (type === 'logo1') {
          this.imageCompress
            .compressFile(c.target.result, DOC_ORIENTATION['Up'], 300, 300)
            .then((result: DataUrl) => {
              this.form.logo1.setValue(result);
            });
          this.file = imageInput;
        } else {
          this.imageCompress
            .compressFile(c.target.result, DOC_ORIENTATION['Up'], 300, 300)
            .then((result: DataUrl) => {
              this.form.logo2.setValue(result);
            });
          this.file2 = imageInput;
        }
      };
      reader.readAsDataURL(imageInput);
    }
  }

  onRemoveUserImage(type) {
    if (type === 'logo1') {
      this.form.logo1.setValue(null);
      this.file = null;
      return;
    }
    this.form.logo2.setValue(null);
    this.file2 = null;
  }

  splitStringToArray(str) {
    return str.split('').reduce((acc, char) => {
        if (char === ',') {
            acc.push('');
        } else {
            acc[acc.length - 1] += char;
        }
        return acc;
    }, ['']);
}

  submit(){
    let split = this.form.signatureList.value.toString().split(',');
    this.form.signatureList.setValue(split);
    if(this.form.signatureList.value.length > 4){
      this.snackbarService.createInfo('max 4 name of signature');
    }
    
    BaseRest.build(this.settingRest)
    .callRest('changeSetting', (v) => {
      console.log('result',v)
      this.dialogRef.close(v)
    })
    .params(this.form.getRawValue());
  }

}
