import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmployeeServices } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  public employeeList: any[] | undefined;
  public apiError: string = '';

  constructor(
    private readonly _employeeService: EmployeeServices
  ) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList(){
    this._employeeService.getEmployees().subscribe({
      next: (res: any) => this.employeeList = res,
      error: (error: HttpErrorResponse) => this.apiError = error?.error
    });
  }

}
