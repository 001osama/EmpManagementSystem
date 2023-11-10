import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayrollDetailsComponent } from './payroll-details/payroll-details.component';
import { PayrollListComponent } from './payroll-list/payroll-list.component';

const routes: Routes = [
  {
    path: '',
    component: PayrollListComponent
  },
  {
    path: 'details/:payrollId',
    component: PayrollDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
