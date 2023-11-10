import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServices } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public apiError: string = '';
  public loginForm!: FormGroup;

  constructor(
    private readonly _router: Router,
    private readonly _formBuiler: FormBuilder,
    private readonly _authServices: AuthServices
  ) { }

  ngOnInit(): void {
    this.loginForm = this._formBuiler.group({
      userName: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  submit(){
    if(this.loginForm.invalid) {alert('Username or password invalid'); return}
    const user = this.loginForm.value;
    this._authServices.login(user).subscribe({
      next: (res: any) => {
        if(res.isSuccess) this._router.navigate(['/dashboard']) 
        else alert('Username or password invalid')
      },
      error: (error: HttpErrorResponse) => this.apiError = error?.error
    })
  }

}
