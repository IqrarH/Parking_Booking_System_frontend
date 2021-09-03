import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuardService } from 'src/app/core/services/admin-auth-guard.service';
import { AllBookingsComponent } from './all-bookings.component';

const routes: Routes = [
  {
    path:'', 
    component: AllBookingsComponent, 
    canActivate: [AdminAuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllBookingsRoutingModule { }
