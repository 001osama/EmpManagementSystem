import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeavesComponent } from './leaves.component';
import { LeavesRoutingModule } from './leaves-routing.module';
import { LeaveDetailsComponent } from './leave-details/leave-details.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LeavesComponent,
    LeaveDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LeavesRoutingModule
  ]
})
export class LeavesModule { }
