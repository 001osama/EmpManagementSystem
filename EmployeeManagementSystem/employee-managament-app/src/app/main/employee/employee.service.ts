import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "src/app/services/base.service";

@Injectable({
    providedIn: 'root',
})


export class EmployeeServices extends BaseService {

    constructor(_http: HttpClient){
        super(_http);
    }

    private path: string = 'https://localhost:44339';

    getEmployees(){
        const url = `${this.path}/api/employee`
        return this.get(url);
    }

    getEmployeeDetails(empId: string){
        const url = `${this.path}/api/employee/details/${empId}`
        return this.get(url);
    }

    getDepartmentList(){
        const url = `${this.path}/api/employee/departments`
        return this.get(url);
    }

    getCategoryList(){
        const url = `${this.path}/api/employee/categories`
        return this.get(url);
    }

    addUpdateEmployee(reqObject: any){
        const url = `${this.path}/api/employee`
        return reqObject?.employeeId && this.put(url, reqObject) || this.post(url, reqObject);
    }


    getEmployeeQualification(empId: string){
        const url = `${this.path}/api/employee/qualification/${empId}`
        return this.get(url);
    }

    addUpdateQualification(obj: any){
        const url = `${this.path}/api/employee/qualification`
        return this.post(url, obj);

    }

}