import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "src/app/services/base.service";

@Injectable({
    providedIn: 'root',
})


export class PayrollServices extends BaseService {

    constructor(_http: HttpClient){
        super(_http);
    }

    private path: string = 'https://localhost:44339';

    getPayrollList(reqObj: any){
        const url = `${this.path}/api/payroll`
        return this.post(url, reqObj);
    }

    getPayrollById(payrollId: number){
        const url = `${this.path}/api/payroll/details?payrollId=${payrollId}`
        return this.get(url);
    }

}