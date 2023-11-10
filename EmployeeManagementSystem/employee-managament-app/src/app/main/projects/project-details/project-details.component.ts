import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, tap } from 'rxjs';
import { EmployeeServices } from '../../employee/employee.service';
import { ProjectServices } from '../projects.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  public project: any;
  public apiError: string = '';

  public addForm!: FormGroup;
  public employeeList: any[] = [];

  constructor(
    private readonly _location: Location,
    private readonly _formBuilder: FormBuilder,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _projectService: ProjectServices,
    private readonly _employeeService: EmployeeServices
  ) { }

  ngOnInit(): void {    
    this._activatedRoute.params.pipe(
      filter(p => p?.['projectId']),
      tap(p => this.getProjectDetails(p?.['projectId']))
    ).subscribe();

    this.addForm = this._formBuilder.group({
      employeeId: [0, [Validators.required,Validators.min(1)]],
      isManager: [false],
    })

  }

  getProjectDetails(projectId: any){
    this._projectService.getProjectDetails(projectId).subscribe({
      next: (res: any) =>  {
        this.project = res.result;
        this.getEmployeeList(res.result?.projectEmployees);
      },
      error: (error: HttpErrorResponse) => this.apiError = error?.message
    });
  }

  getEmployeeList(list: any){
    this._employeeService.getEmployees().subscribe({
      next: (res: any) => {
        // this.employeeList = res.filter((x: any) => list.(x) == -1);
        this.employeeList = res.filter((r: any) => {
          return list.filter(function (l: any) {
              return l.employeeId !== r.employeeId && r; // return the ones with equal id
         });
      });
      },
      error: (error: HttpErrorResponse) => this.apiError = error?.error
    });
  }

  removeEmpFromProject(employeeId: any){
    this._projectService.removeEmpFromProject(this.project?.projectId, employeeId).subscribe({
      next: (res: any) =>  this.getProjectDetails(this.project?.projectId),
      error: (error: HttpErrorResponse) => this.apiError = error?.message
    });
  }

  addUpdateProjectEmployee(projectId?: any, employeeId?: any, isManager?: boolean){
    let reqObject: any;
    if(projectId && employeeId){
      reqObject = {
        projectId: this.project?.projectId,
        employeeId: employeeId,
        isManager: isManager
      }
    }
    else{
      const form = this.addForm.value;
      reqObject = {
        projectId: this.project?.projectId,
        employeeId: parseInt(form.employeeId),
        isManager: form.isManager
      }
    }
    this._projectService.addUpdateProjectEmployee(reqObject).subscribe({
      next: (res: any) =>  {
        if(res.isSuccess) this.getProjectDetails(this.project?.projectId)
        else {
          this.apiError = res?.result
        }
      },
      error: (error: HttpErrorResponse) => this.apiError = error?.message
    });
  }


  back(){
    this._location.back()
  }

}
