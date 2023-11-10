import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollRoutingModule } from './payroll-routing.module';
import { PayrollDetailsComponent } from './payroll-details/payroll-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PayrollListComponent } from './payroll-list/payroll-list.component';


@NgModule({
  declarations: [
    PayrollDetailsComponent,
    PayrollListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PayrollRoutingModule
  ]
})
export class PayrollModule { }
