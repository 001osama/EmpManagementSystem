import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, tap } from 'rxjs';
import { PayrollServices } from '../payroll.service';

@Component({
  selector: 'app-payroll-details',
  templateUrl: './payroll-details.component.html',
  styleUrls: ['./payroll-details.component.css']
})
export class PayrollDetailsComponent implements OnInit {

  public apiError: string = '';
  public details: any = {};

  constructor(
    private readonly _location: Location,
    private readonly _payrollService: PayrollServices,
    private readonly _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this._activatedRoute.params.pipe(
      filter(p => p?.['payrollId']),
      tap(p => this.getPayrollById(p?.['payrollId']))
    ).subscribe();
  }

  getPayrollById(payrollId: any){
    this._payrollService.getPayrollById(payrollId).subscribe({
      next: (res: any) => {
        this.details = res.result[0]; 
        this.details.total = this.total(res.result[0]);
        console.log(res.result[0])
      },
      error: (error: HttpErrorResponse) => this.apiError = error?.message
    });
    
  }

  total(detail: any){
    return detail.basicSalary + detail.otherAllowance + detail.utilityAllowance + detail.adtionalAmount - detail.deductions
  }

  back(){
    this._location.back()
  }

}
