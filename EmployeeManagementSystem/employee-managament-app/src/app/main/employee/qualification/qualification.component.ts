import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, tap } from 'rxjs';
import { EmployeeServices } from '../employee.service';

@Component({
  selector: 'app-qualification',
  templateUrl: './qualification.component.html',
  styleUrls: ['./qualification.component.css']
})
export class QualificationComponent implements OnInit {

  public updateForm!: FormGroup;
  public categoryList: any[] = [];
  public departmentList: any[] = [];
  public employeeId: string | undefined;

  public apiError: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private readonly _location: Location,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _employeeService: EmployeeServices
  ) {
  }

  ngOnInit(): void {
    
    this.updateForm = this._formBuilder.group({
      degree: ['', Validators.required],
      marksObtained:  ['', Validators.required],
      totalMarks:   ['', Validators.required],
      isPositionHolder: [false],
      position: [, [Validators.max(3),Validators.min(1)]],
      dateStarted: [''],
      dateEnded: ['',Validators.required],
    });

    this._activatedRoute.params.pipe(
      filter(p => p?.['empId']),
      tap(p => this.getEmployeeDetails(p?.['empId']))
    ).subscribe();

  }

  getEmployeeDetails(empId: any){
    this.employeeId = empId;
    this._employeeService.getEmployeeQualification(empId).subscribe({
      next: (res: any) => this.patchFromValues(res[0]),
      error: (error: HttpErrorResponse) => this.apiError = error?.error
    });
  }

  patchFromValues(emp: any){
    this.updateForm.patchValue({
      degree: emp?.degree,
      marksObtained: emp?.marks,
      totalMarks: emp?.totalMarks,
      isPositionHolder: emp?.isPositionHolder,
      position: emp?.position,
      dateStarted: emp?.dateStart,
      dateEnded: emp?.dateEnd
    });
  }

  submit(){
    if(this.updateForm.invalid){
      return
    }
    else{
      let formObj = this.updateForm.value;
      formObj.marksObtained = parseFloat(formObj.marksObtained);
      formObj.totalMarks = parseFloat(formObj.totalMarks);
      if(this.employeeId) formObj.employeeId = parseInt(this.employeeId); 
      this._employeeService.addUpdateQualification(formObj).subscribe({
        next: (res: any) => this.back(),
        error: (error: HttpErrorResponse) => this.apiError = error?.message
      });
    }
  }

  back(){
    this._location.back();
}

}
