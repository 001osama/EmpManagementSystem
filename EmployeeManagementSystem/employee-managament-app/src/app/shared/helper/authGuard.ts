import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthServices } from '../../auth/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _auth: AuthServices
    ){ }
    
    canActivate() {
        if(this._auth.isLoggedIn()) {
            return true;
        }
        alert("You have not logged in")
        this._router.navigate(['auth'])
        return false;
    }

    // canLoad(): boolean{
    //     return this.canActivate();
    // }

}