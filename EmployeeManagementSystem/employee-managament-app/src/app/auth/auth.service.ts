import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, map, Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})

export class AuthServices {

    constructor(
        private http: HttpClient,
        private readonly _router: Router
    ) { }
    
    private path: string = 'https://localhost:44339/api';

    isLoggedIn(){
        return localStorage.getItem('user');
    }

    login(user: any) {
        const url = `${this.path}/user/login`
        return this.http.post<any>(url, user)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.isSuccess) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(user?.result));
                    // this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        localStorage.removeItem('user');
        this._router.navigate(['auth']);
    }
}