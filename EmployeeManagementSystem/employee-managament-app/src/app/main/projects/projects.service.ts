import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseService } from "src/app/services/base.service";

@Injectable({
    providedIn: 'root',
})


export class ProjectServices extends BaseService {

    constructor(_http: HttpClient){
        super(_http);
    }

    private path: string = 'https://localhost:44339';

    getProjects(){
        const url = `${this.path}/api/projects`
        return this.get(url);
    }

    getProjectDetails(projectId: string){
        const url = `${this.path}/api/projects/details/${projectId}`
        return this.get(url);
    }

    removeEmpFromProject(projectId: string, employeeId: string){
        const url = `${this.path}/api/projects/${projectId}/${employeeId}`
        return this.delete(url);
    }

    addUpdateProjectEmployee(reObj: any){
        const url = `${this.path}/api/projects/employee`
        return this.post(url, reObj);
    }

}