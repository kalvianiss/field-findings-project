import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { SettingService } from './setting.service';
import { environment } from 'src/environments/environment';
const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root',
})
export class ExportExcelService {
  exportType: 'ABSENCE';
  elementId: string = '';
  titleReport: string;
  constructor(private settingService: SettingService) {}
  exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(json);
  }
  saveFile(blob: Blob, type: string, lengthText?: any, ext?: boolean) {
    const file = new File(
      [blob],
      ext ? `${lengthText}.csv` : `${lengthText}.xlsx`,
      { type: type }
    );
    // `${this.settingService.randomFileName(lengthText)}.xlsx`,
    FileSaver.saveAs(file);
  }
  saveFilePdf(blob: Blob, type: string, lengthText: any, ext?: boolean) {
    const file = new File([blob], `${lengthText}.pdf`, { type: type });
    FileSaver.saveAs(file);
  }

  save(blob: Blob, filename: string) {
    const file = new File([blob], `${filename}`);
    FileSaver.saveAs(file);
  }

  exportReportExcel(value, byId) {
    switch ((this.exportType = value)) {
      case 'ABSENCE':
        this.elementId = byId;
        this.titleReport = 'Attendance_Report';
        break;
      case 'LWBP':
        this.elementId = byId;
        this.titleReport = 'WBP_LWBP_Report';
        break;
      case 'REPORT_CHECKLIST_TABLE':
        this.elementId = byId;
        this.titleReport = 'CHECKLIST_TABLE_REPORT';
        break;
      case 'SCHEDULE':
        this.elementId = byId;
        this.titleReport = 'SCHEDULE REPORT';
        break;
      case 'PAYROLL':
        this.elementId = byId;
        this.titleReport = 'PAYROLL REPORT';
        break;
      case 'EVALUATION_PERFOMANCE':
        this.elementId = byId;
        this.titleReport = 'EVALUATION PERFOMANCE';
        break;
      case 'ATTENDANCE_REPORT':
        this.elementId = byId;
        this.titleReport = 'ATTENDACE REPORT';
        break;
      case 'ATTENDANCE_REPORT_EMPLOYEE':
        this.elementId = byId;
        this.titleReport = 'ATTENDACE REPORT EMPLOYEE';
        break;
      case 'BPJSKES':
        this.elementId = byId;
        this.titleReport = 'Report BPJS Kesehatan';
        break;
      case 'BPJSTK':
        this.elementId = byId;
        this.titleReport = 'Report BPJS Ketenagakerjaan';
        break;

      default:
        break;
    }
    let column = [{ wpx: 120 }, { wpx: 120 }, { wpx: 120 }, { wpx: 120 }];
    let rows = [{ hpx: 35 }, { hpx: 35 }];
    let data = document.getElementById(this.elementId);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    ws['!cols'] = column;
    ws['!rows'] = rows;
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.titleReport + EXCEL_EXTENSION);
  }
}
