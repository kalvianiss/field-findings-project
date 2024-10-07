import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './container/auth/login/login.component';
import { FieldFindingsComponent } from './container/field-findings/field-findings/field-findings.component';
import { FieldFindingsDetailComponent } from './container/field-findings-detail/field-findings-detail.component';
import { PrintFieldFindingsComponent } from './container/print/print-field-findings/print-field-findings.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'field-findings',
    component: FieldFindingsComponent,
  },
  {
    path: 'field-findings/detail',
    component: FieldFindingsDetailComponent,
  },
  {
    path: 'field-findings/detail',
    component: FieldFindingsDetailComponent,
  },
  {
    path: 'print',
    children: [
      { path: 'print-field-findings', component: PrintFieldFindingsComponent },
    ]
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
