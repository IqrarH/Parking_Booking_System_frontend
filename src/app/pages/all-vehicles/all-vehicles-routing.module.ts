import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuardService } from 'src/app/core/services/admin-auth-guard.service';
import { AllVehiclesComponent } from './all-vehicles.component';

const routes: Routes = [  
  {
    path:'', 
    component: AllVehiclesComponent, 
    canActivate: [AdminAuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllVehiclesRoutingModule { }
