import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveDetailsComponent } from './leave-details/leave-details.component';
import { LeavesComponent } from './leaves.component';

const routes: Routes = [
    {
        path: '', 
        component: LeavesComponent, 
        children: [ 
            {
                path: '',
                component: LeaveDetailsComponent
            },
            {
                path: 'search/:empId',
                component: LeaveDetailsComponent
            },
            // {
            //     path: 'details/:empId',
            //     component: EmployeeDetailsComponent
            // },
            {
                path: '**',
                redirectTo: ''    
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeavesRoutingModule { }