import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MONTHS, YEARS } from 'src/constants/lib';
import { EmployeeServices } from '../../employee/employee.service';
import { PayrollServices } from '../payroll.service';

@Component({
  selector: 'app-payroll-list',
  templateUrl: './payroll-list.component.html',
  styleUrls: ['./payroll-list.component.css']
})
export class PayrollListComponent implements OnInit {

  public apiError: string = '';
  public months: any[] = MONTHS;
  public years: any[] = YEARS;
  public employees: any[] | undefined;
  public list: any[] | undefined;

  public searchForm!: FormGroup;

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _payrollService: PayrollServices,
    private readonly _employeeService: EmployeeServices
  ) { }

  ngOnInit(): void {

    this.searchForm = this._formBuilder.group({
      employeeId: [0],
      month: [0],
      year: [0]
    })

    this.getEmployees();
    this.getPayrollList();
  }

  getEmployees(){
    this._employeeService.getEmployees().subscribe({
      next: (res: any) => this.employees = res,
      error: (error: HttpErrorResponse) => this.apiError = error?.message
    });
    
  }

  getPayrollList(){
    const form = this.searchForm.value;
    const reqObj = {
      employeeId : parseInt(form.employeeId),
      month : parseInt(form.month),
      year : parseInt(form.year)
    }
    this._payrollService.getPayrollList(reqObj).subscribe({
      next: (res: any) => this.list = res?.result,
      error: (error: HttpErrorResponse) => this.apiError = error?.message
    });
  }

}
