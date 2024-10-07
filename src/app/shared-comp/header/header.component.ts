import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';
// import { ChangePasswordDialogComponent } from 'src/app/dialog/change-password-dialog/change-password-dialog.component';
// import { ErrorUnderdevelopmentDialog } from 'src/app/info/error-page-class';
import { IRequestCreateUserDTO } from 'src/app/model/user.model';
import { BaseRest } from '../base-model/base-rest-class';
import { AuthService } from '../service/auth.service';
import { LangList, LangService } from '../service/langservice.service';
import { RestUserService } from '../service/rest-user.service';
import { HeaderClass } from './header-class';
import { CookieService } from 'ngx-cookie-service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { environment } from 'src/environments/environment';
import { FormControl } from '@angular/forms';
import { ImageService } from '../service/image.service';
import * as moment from 'moment';
import { AppModule } from 'src/app/app.module';
import { ErrorUnderdevelopmentDialog } from 'src/app/info/error-page-class';
import { SettingsFieldFindingDialogComponent } from 'src/app/dialog/settings-field-finding-dialog/settings-field-finding-dialog.component';
import { SettingService } from '../service/setting.service';
import { RestSettingFieldFindingService } from '../service/rest-setting-field-findings.service';
import { SnackbarService } from '../service/snackbar.service';
declare var SockJS;
declare var Stomp;
var stompClient;
let name;
var clazz;
let buildingId;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Output() toggleClick = new EventEmitter<any>();
  @Output() closeSidebar = new EventEmitter<any>();
  @Output() selectBuilding = new EventEmitter<any>();
  @Output() helpCenter = new EventEmitter<any>();
  @Output() hideSidebar = new EventEmitter();
  @Input() building: string;
  @Input('_drawer') drawer: MatSidenav;
  @Input('_isHandset') isHandset: boolean;
  @ViewChild('notifScroll') notifScroll: CdkVirtualScrollViewport;
  bmNotifUnreadCount = 0;
  dropdown: HeaderClass[] = [
    new HeaderClass('settings', 'Settings', 'icon-logout'),
    new HeaderClass('logout', 'Log Out', 'icon-logout'),
  ];
  @Input() userData: IRequestCreateUserDTO;
  @Input() nameBuilding: string;
  listHo: any = [];
  buildForm = new FormControl();
  selectedItems = [];
  selectedItemsStatus = [];
  dropDownSelect = false;
  hoActive: boolean;
  buildingList = [];
  onclick = 0;
  warningNotifCount = 0;
  keyList = [];
  arrWarningList: any = [];

  settingsData:any = [];
  constructor(
    public langService: LangService,
    // public translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    private userService: RestUserService,
    private matDialog: MatDialog,
    private cookieService: CookieService,
    private imageService: ImageService,
    private settingRest : RestSettingFieldFindingService,
    private snackbarService: SnackbarService
  ) {
    // this.translate.addLangs(['en', 'id']);
    // this.translate.setDefaultLang(this.langService.lang);
    // if (localStorage.getItem('tokenHo')) {
    //   this.buildForm.setValue(localStorage.getItem('tokenHo'));
    // }
  }

  ngAfterViewInit(): void {}
  ngOnInit(): void {
    clazz = this;
    BaseRest.build(this.userService)
      .callRest('findUserById', (v) => {
        this.userData = v.content;
        localStorage.setItem('modul', JSON.stringify(v.content.moduleTypes));
        buildingId = v.content.buildingId;
        // this.connectWs();
      })
      .params(this.authService.jwtDecode.id);
  }
  onItemSelect(item: any) {
    let d = document.querySelector('.dropdown-list') as HTMLElement;
    d.style.display = 'none';
  }
  onDeSelect(item: any) {
    let d = document.querySelector('.dropdown-list') as HTMLElement;
    d.style.display = 'block';
  }
  onDropDownClose(item: any) {
    let d = document.querySelector('.dropdown-list') as HTMLElement;
    d.style.display = 'block';
  }
  onFilterChange(item: any) {
    this.buildForm.setValue(item);
  }

  callFunc(key: string) {
    try {
      this[key]();
    } catch (e) {
      if (e instanceof TypeError) {
        new ErrorUnderdevelopmentDialog();
      }
    }
  }

  btnReset() {}
  connectWs() {
    let socket = new SockJS(environment.bmweb_ws);

    stompClient = Stomp.over(socket);
    stompClient.debug = () => {};

    stompClient.reconnect_delay = 5000;
    stompClient.connect(
      { name: name, buildingId: buildingId },
      this.onConnected,
      this.onFailure
    );
  }

  disconnectWs() {
    if (stompClient !== null) {
      stompClient.disconnect();
    }
  }

  onFailure(data) {
    setTimeout(() => {
      clazz.connectWs();
    }, 5000);
  }

  onConnected(data) {
    stompClient.subscribe(`/notif/group-${buildingId}`, function (callback) {
      let x = JSON.parse(callback.body);
      if (x?.type === '1') {
        clazz.fnBmWebWs();
      }
    });
  }

 
  logout() {
    this.cookieService.delete('fbidtemp');
    this.authService.token = null;
    this.router.navigateByUrl('/');
    this.authService.removeAuthenticate();
  }

  settings(){
        this.matDialog
        .open(SettingsFieldFindingDialogComponent, {
          width: '850px',
          data: null,
        })
        .afterClosed()
        .subscribe((res) => {
          if(res.success){
            this.snackbarService.createSuccess(res.message);
          }
          console.log('result', res);
        });
  }

  hide() {
    let w: any = window;
    setTimeout(() => {
      try {
        w.Tawk_API.hideWidget();
      } catch {
        this.hide();
      }
    }, 200);
  }

 
  burger() {
    this.toggleClick.emit();
  }

  goBack(){
    this.router.navigateByUrl('/field-findings');
  }
}
