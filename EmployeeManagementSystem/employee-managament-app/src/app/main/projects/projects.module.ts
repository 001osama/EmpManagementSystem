import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProjectsComponent } from './add-projects/add-projects.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectListComponent,
    ProjectDetailsComponent,
    AddProjectsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProjectsRoutingModule
  ]
})
export class ProjectsModule { }
