import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProjectServices } from '../projects.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  public projectList: any[] = [];
  public apiError: string = '';

  constructor(
    private readonly _projectService: ProjectServices
  ) { }

  ngOnInit(): void {
    this.getprojectList()
  }

  getprojectList(){
    this._projectService.getProjects().subscribe({
      next: (res: any) =>  this.projectList = res.result,
      error: (error: HttpErrorResponse) => this.apiError = error?.message
    });
  }

}
