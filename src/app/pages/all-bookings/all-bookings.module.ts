import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllBookingsRoutingModule } from './all-bookings-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { AllBookingsComponent } from './all-bookings.component';


@NgModule({
  declarations: [
    AllBookingsComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    AllBookingsRoutingModule,
    SharedModule
  ]
})
export class AllBookingsModule { }
