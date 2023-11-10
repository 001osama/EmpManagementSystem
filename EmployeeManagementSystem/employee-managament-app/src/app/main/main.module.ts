import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { GeneralModule } from '../shared/general/general.module';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    GeneralModule,
    MainRoutingModule
  ]
})
export class MainModule { }
