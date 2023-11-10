import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, tap } from 'rxjs';
import { EmployeeServices } from '../../employee/employee.service';
import { LeaveServices } from '../leaves.service';

@Component({
  selector: 'app-leave-details',
  templateUrl: './leave-details.component.html',
  styleUrls: ['./leave-details.component.css']
})
export class LeaveDetailsComponent implements OnInit {

  public apiError: string = '';
  public leaveCategory: any[] | undefined;
  public employees: any[] | undefined;
  public details: any | undefined;

  public searchForm!: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _leaveService: LeaveServices,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _employeeService: EmployeeServices
  ) {

    // this.searchForm = this._formBuilder.group({
    //   employeeId: [0, [Validators.required, Validators.min(1)]]
    // }); 
  }

  ngOnInit(): void {
    this.getLeaveCategory();
    this.getEmployeeList();

    this.searchForm = this._formBuilder.group({
      employeeId: [0, [Validators.required, Validators.min(1)]]
    });

    this._activatedRoute.params.pipe(
      filter(p => p?.['empId']),
      tap(p => {
        this.searchForm.controls['employeeId'].setValue(p?.['empId']);
        this.submit()
      })
    ).subscribe();

  }

  getLeaveCategory(){
    this._leaveService.getLeaveCategory().subscribe({
      next: (res: any) => this.leaveCategory = res.result,
      error: (error: HttpErrorResponse) => this.apiError = error?.error
    });
  }

  getEmployeeList(){
    this._employeeService.getEmployees().subscribe({
      next: (res: any) => this.employees = res,
      error: (error: HttpErrorResponse) => this.apiError = error?.error
    });
  }

  submit(){
    if(this.searchForm.invalid) {
      console.log(this.searchForm.value);
      alert('Please select an employee')
      return
    }
    this._leaveService.getEmployeeLeaveDetails(this.searchForm.value.employeeId).subscribe({
      next: (res: any) => this.details = res.result,
      error: (error: HttpErrorResponse) => this.apiError = error?.error
    });
  }

}
