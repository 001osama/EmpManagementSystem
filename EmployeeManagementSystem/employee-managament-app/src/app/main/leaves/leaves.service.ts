import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "src/app/services/base.service";

@Injectable({
    providedIn: 'root',
})


export class LeaveServices extends BaseService {

    constructor(_http: HttpClient){
        super(_http);
    }

    private path: string = 'https://localhost:44339';

    getLeaveCategory(){
        const url = `${this.path}/api/leave`
        return this.get(url);
    }

    getEmployeeLeaveDetails(empId: number){
        const url = `${this.path}/api/leave/employeeLeaves/${empId}`
        return this.get(url);
    }

}