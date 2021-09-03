import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllVehiclesRoutingModule } from './all-vehicles-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AllVehiclesComponent } from './all-vehicles.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AllVehiclesComponent
  ],
  imports: [
    NgbModule,
    CommonModule,
    AllVehiclesRoutingModule,
    SharedModule
  ]
})
export class AllVehiclesModule { }
