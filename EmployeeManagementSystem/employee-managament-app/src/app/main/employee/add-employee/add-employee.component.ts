import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, of, tap } from 'rxjs';
import { EmployeeServices } from '../employee.service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  public addForm!: FormGroup;
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
    
    this.addForm = this._formBuilder.group({
      firstName: ['',Validators.required],
      lastName:  ['',Validators.required],
      address:   ['',Validators.required],
      email: ['',Validators.required],
      phoneNumber: ['', [Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      dateOfBirth: [''],
      departmentId: ['',Validators.required],
      categoryId: ['',Validators.required]
    });

    this.getDeptList();
    this.getCategoryList();

    this._activatedRoute.params.pipe(
      filter(p => p?.['empId']),
      tap(p => this.getEmployeeDetails(p?.['empId']))
    ).subscribe();

  }

  getDeptList(){
    this._employeeService.getDepartmentList().subscribe({
      next: (res: any) => this.departmentList = res,
      error: (error: HttpErrorResponse) => this.apiError = error?.message
    });
    
  }

  getCategoryList(){
    this._employeeService.getCategoryList().subscribe({
      next: (res: any) => this.categoryList = res,
      error: (error: HttpErrorResponse) => this.apiError = error?.message
    });
  }

  getEmployeeDetails(empId: any){
    this.employeeId = empId;
    this._employeeService.getEmployeeDetails(empId).subscribe({
      next: (res: any) => this.patchFromValues(res[0]),
      error: (error: HttpErrorResponse) => this.apiError = error?.error
    });
  }

  patchFromValues(emp: any){
    this.addForm.patchValue({
      firstName: emp?.firstName,
      lastName: emp?.lastName,
      address: emp?.address,
      email: emp?.email,
      phoneNumber: emp?.phoneNumber,
      dateOfBirth: emp?.dateOfBirth,
      departmentId: emp?.departmentId,
      categoryId: emp?.categoryId
    });
  }

  submit(){
    if(this.addForm.invalid){
      return
    }
    else{
      let formObj = this.addForm.value;
      formObj.departmentId = parseInt(formObj.departmentId)
      formObj.categoryId = parseInt(formObj.categoryId)
      if(this.employeeId) formObj.employeeId = parseInt(this.employeeId); 
      this._employeeService.addUpdateEmployee(formObj).subscribe({
        next: (res: any) => this.back(),
        error: (error: HttpErrorResponse) => this.apiError = error?.message
      });
    }
  }

  back(){
    this._location.back();
  }

}
