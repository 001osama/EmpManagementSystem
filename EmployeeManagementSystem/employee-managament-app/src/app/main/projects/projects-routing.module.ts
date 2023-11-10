import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectsComponent } from './add-projects/add-projects.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  {
    path: '', 
    component: ProjectsComponent, 
    children: [ 
      {
          path: '',
          component: ProjectListComponent
      },
      {
          path: 'detail/:projectId',
          component: ProjectDetailsComponent
      },
      {
        path: 'add',
        component: AddProjectsComponent
      },
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
export class ProjectsRoutingModule { }
