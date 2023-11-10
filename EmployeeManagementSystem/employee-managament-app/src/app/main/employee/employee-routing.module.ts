import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeComponent } from './employee.component';
import { QualificationComponent } from './qualification/qualification.component';

const routes: Routes = [
    {
        path: '', 
        component: EmployeeComponent, 
        children: [ 
            { path: '', redirectTo: 'list', pathMatch: 'full'},
            {
                path: 'list',
                component: EmployeeListComponent
            },
            {
                path: 'add',
                component: AddEmployeeComponent
            },
            {
                path: 'edit/:empId',
                component: AddEmployeeComponent
            },
            {
                path: 'details/:empId',
                component: EmployeeDetailsComponent
            },
            {
                path: 'qualification/:empId',
                component: QualificationComponent
            },
            {
                path: '**',
                redirectTo: 'list'    
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }