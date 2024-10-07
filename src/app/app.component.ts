import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Router } from '@angular/router';
import { iconRegistry } from './utils/icon-registry';
import * as moment from 'moment';
import { AuthService } from './shared-comp/service/auth.service';
import { SnackbarService } from './shared-comp/service/snackbar.service';
import { BaseRest } from './shared-comp/base-model/base-rest-class';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'field-findings-project';
  datelog = new Date().getTime();
  iconRegistry: string[] = iconRegistry;
  isLoading = true;
  pagePrint: boolean;
  bypass;
  date = moment();
  closebtn: boolean = true;

  hide;
  listHo: any = [];
  building;
  headOfficeName;
  buildName;
  titleName;
  hoAcive: boolean;
  talkTo: boolean;
  gapTalkTo;
  index = 0;
  showSidebar = false;
  showWidget: boolean = false;
  constructor(
    private readonly matIconRegistry: MatIconRegistry,
    private readonly sanitizer: DomSanitizer,
    private router: Router,
    public authService: AuthService,
    private snacbarService: SnackbarService,
    private matDialog :MatDialog
  ) {
    this.iconRegistry.forEach((v) => {
      this.matIconRegistry.addSvgIcon(
        `${v}`,
        this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${v}.svg`)
      );
    });
    if (!this.bypass) {
      if (!this.authService.token) {
        this.router.navigateByUrl('/');
        this.authService.token = null;
      }
    }
  }
  setWaktu() {
    this.date = moment();
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.loadRefreshToken();
    this.isLoading = false;
    let r = document.querySelector(':root');
    var rs = getComputedStyle(r);
  }

  loadRefreshToken() {
    if (this.bypass) return;
    if (this.authService.token) {
      BaseRest.build(this.authService)
        .callRest(
          'refreshAndGetAuthenticationToken',
          (v) => {
            this.authService.token = v.content.token;
          },
          (err) => {
            this.snacbarService.createInfo('Please Sign In');
          }
        )
        .params();
    }
  }

  onRouterOutletActivate(event: any) {
    if (!event.name) return;
    this.pagePrint = true;
  }

  checkSidebar() {
    let state: boolean;
    if (!this.authService.token) {
      state = false;
    } else if (this.authService.token) {
      state = true;
    } 

    return state;
  }
  

  goBack(){
    this.router.navigateByUrl('/field-findings');
  }

  async wait(ms: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }

  @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
    this.disableScroll(event);
  }

  @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
    this.disableScroll(event);
  }

  @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {
    this.disableScroll(event);
  }

  disableScroll(event: any) {
    if (event.srcElement.type === 'number') event.preventDefault();
  }
}
