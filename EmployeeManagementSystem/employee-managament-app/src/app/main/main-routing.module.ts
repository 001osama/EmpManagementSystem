import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main.component';

const routes: Routes = [
    {
        path: '', 
        component: MainComponent, 
        children: [ 
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard',
                loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
            },
            {
                path: 'employee',
                loadChildren: () => import('./employee/employee.module').then((m) => m.EmployeeModule)
            },
            {
                path: 'projects',
                loadChildren: () => import('./projects/projects.module').then((m) => m.ProjectsModule)
            },
            {
                path: 'leaves',
                loadChildren: () => import('./leaves/leaves.module').then((m) => m.LeavesModule)
            },
            {
                path: 'payroll',
                loadChildren: () => import('./payroll/payroll.module').then((m) => m.PayrollModule)
            },
            { path: '**', redirectTo: 'dashboard' }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
