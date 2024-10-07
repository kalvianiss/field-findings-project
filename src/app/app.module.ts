import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { LoginComponent } from './container/auth/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { AppInitService, initConfig } from './shared-comp/service/appinit.service';
import { FieldFindingsComponent } from './container/field-findings/field-findings/field-findings.component';
import { InputComponent } from './shared-comp/input/input.component';
import { ErrorKeysPipe } from './utils/pipe/errorKeys.pipe';
import { FooterComponent } from './shared-comp/footer/footer.component';
import { HeaderComponent } from './shared-comp/header/header.component';
import {MatMenuModule} from '@angular/material/menu';
import { TableParamComponent } from './shared-comp/table-param/table-param.component';
import { TabComponent } from './shared-comp/tab/tab.component';
import { ButtonAddComponent } from './shared-comp/button/button-add/button-add.component';
import { ButtonFilterComponent } from './shared-comp/button/button-filter/button-filter.component';
import { ButtonMinusComponent } from './shared-comp/button/button-minus/button-minus.component';
import { ButtonPlusMinusComponent } from './shared-comp/button/button-plus-minus/button-plus-minus.component';
import { UnderDevelopmentDialogComponent } from './shared-dialog/under-development-dialog/under-development-dialog.component';
import { TablePagingComponent } from './shared-comp/table-paging/table-paging.component';
import { PreviewImageDialogComponent } from './dialog/preview-image-dialog/preview-image-dialog.component';
import { TableComponent } from './shared-comp/table/table.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TitleComponent } from './shared-comp/title/title.component';
import { FieldFindingsDetailComponent } from './container/field-findings-detail/field-findings-detail.component';
import { FilterFieldFindingsDialogComponent } from './dialog/filter-field-findings-dialog/filter-field-findings-dialog.component';
import { ButtonPlusComponent } from './shared-comp/button/button-plus/button-plus.component';
import { InputDateComponent } from './shared-comp/input-date/input-date.component';
import { InputDateMonthComponent } from './shared-comp/input-date-month/input-date-month.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ImageLoadingComponent } from './info/image-loading/image-loading.component';
import { FailedToLoadComponent } from './info/failed-to-load/failed-to-load.component';
import { ConnectionInterruptedComponent } from './info/connection-interrupted/connection-interrupted.component';
import { LoadingDataPageComponent } from './info/loading-data-page/loading-data-page.component';
import { NoDataComponent } from './info/no-data/no-data.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SettingsFieldFindingDialogComponent } from './dialog/settings-field-finding-dialog/settings-field-finding-dialog.component';
import { PrintFieldFindingsComponent } from './container/print/print-field-findings/print-field-findings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FieldFindingsComponent,
    InputComponent,
    ErrorKeysPipe,
    FooterComponent, 
    HeaderComponent,
    TableParamComponent,
    TabComponent,
    ButtonAddComponent,
    ButtonFilterComponent,
    ButtonMinusComponent,
    ButtonPlusMinusComponent,
    UnderDevelopmentDialogComponent,
    TablePagingComponent,
    PreviewImageDialogComponent,
    TableComponent,
    TitleComponent,
    FieldFindingsDetailComponent,
    FilterFieldFindingsDialogComponent,
    ButtonPlusMinusComponent,
    ButtonPlusComponent,
    InputDateComponent,
    InputDateMonthComponent, 
    ImageLoadingComponent, 
    FailedToLoadComponent, 
    ConnectionInterruptedComponent,
    LoadingDataPageComponent,
    NoDataComponent,
    SettingsFieldFindingDialogComponent,
    PrintFieldFindingsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatCardModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSortModule,
    MatPaginatorModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDividerModule,
    NgbModule,
    MatDialogModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatMenuModule,
    BrowserModule,
    AppRoutingModule,
    MatTooltipModule,
    NgxSkeletonLoaderModule,
    NgMultiSelectDropDownModule, 
    NgxDropzoneModule
  ],
  providers: [
    CookieService,
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppInitService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  static injector: Injector;
  constructor(injector: Injector) {
    AppModule.injector = injector;
  }
}
