import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { AllFloorsRoutingModule } from './all-floors-routing.module';
import { AllFloorsComponent } from './all-floors.component';



@NgModule({
  declarations: [
    AllFloorsComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    AllFloorsRoutingModule,
    SharedModule
  ]
})
export class AllFloorsModule { }
