import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { EmployeeServices } from '../employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  public employee: any = {};
  public apiError: string = '';

  constructor(
    private readonly _location: Location,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _employeeService: EmployeeServices
  ) { }

  ngOnInit(): void {
    this._activatedRoute.params.pipe(
      tap(p => this.getEmployeeDetails(p?.['empId']))
    ).subscribe();
  }

  getEmployeeDetails(empId: any){
    this._employeeService.getEmployeeDetails(empId).subscribe({
      next: (res: any) => this.employee = res[0],
      error: (error: HttpErrorResponse) => this.apiError = error?.error
    });
  }

  back(){
    this._location.back()
  }

}
