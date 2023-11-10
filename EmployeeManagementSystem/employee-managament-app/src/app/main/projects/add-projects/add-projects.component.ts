import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-projects',
  templateUrl: './add-projects.component.html',
  
})
export class AddProjectsComponent implements OnInit {
  public addForm!: FormGroup;

  constructor(
    private _location: Location,
    private _formbuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.addForm = this._formbuilder.group({
      projectName: [''],
      startDate: [''],
      estimatedEndDate: [''],
      description: ['']
    })
  }

  submit(){

  }

  back(){
    this._location.back();
  }

}
