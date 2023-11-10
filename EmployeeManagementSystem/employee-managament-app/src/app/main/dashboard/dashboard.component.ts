import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmployeeServices } from '../employee/employee.service';
import { LeaveServices } from '../leaves/leaves.service';
import { PayrollServices } from '../payroll/payroll.service';
import { ProjectServices } from '../projects/projects.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  public projectList: any[] | undefined;
  public leaveCategory: any[] | undefined;
  public payrollList: any[] | undefined;
  public employeeList: any[] | undefined;
  public apiError: string = '';

  constructor(
    private readonly _leaveService: LeaveServices,
    private readonly _projectService: ProjectServices,
    private readonly _payrollService: PayrollServices,
    private readonly _employeeService: EmployeeServices
  ) { }

  ngOnInit(): void {
    this.getEmployeeList();
    this.getPayrollList();
    this.getprojectList();
    this.getLeaveCategory();
  }

  getEmployeeList(){
    this._employeeService.getEmployees().subscribe({
      next: (res: any) => this.employeeList = res.slice(0,3),
      error: (error: HttpErrorResponse) => this.apiError = error?.error
    });
  }

  getPayrollList(){
    const reqObj = {
      employeeId : 0,
      month : 0,
      year : 0
    }
    this._payrollService.getPayrollList(reqObj).subscribe({
      next: (res: any) => this.payrollList = res?.result.slice(0,3),
      error: (error: HttpErrorResponse) => this.apiError = error?.message
    });
  }

  getLeaveCategory(){
    this._leaveService.getLeaveCategory().subscribe({
      next: (res: any) => this.leaveCategory = res.result.slice(0,3),
      error: (error: HttpErrorResponse) => this.apiError = error?.error
    });
  }

  getprojectList(){
    this._projectService.getProjects().subscribe({
      next: (res: any) =>  this.projectList = res.result.slice(0,3),
      error: (error: HttpErrorResponse) => this.apiError = error?.message
    });
  }

}
