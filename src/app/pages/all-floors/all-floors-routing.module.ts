import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuardService } from 'src/app/core/services/admin-auth-guard.service';
import { AllFloorsComponent } from './all-floors.component';

const routes: Routes = [
  {
    path:'', 
    component: AllFloorsComponent, 
    canActivate: [AdminAuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllFloorsRoutingModule { }
