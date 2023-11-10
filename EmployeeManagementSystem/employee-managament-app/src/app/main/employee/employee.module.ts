import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QualificationComponent } from './qualification/qualification.component';
// import { NgbModule } from  '@ng-bootstrap/ng-bootstrap'



@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeDetailsComponent,
    AddEmployeeComponent,
    EmployeeListComponent,
    QualificationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
