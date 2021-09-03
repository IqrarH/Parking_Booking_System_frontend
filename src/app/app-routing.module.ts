import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService, NoAuthGuardService, UserType } from './core';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [NoAuthGuardService]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/users/users.module').then((m) => m.UsersModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then((m) => m.CheckoutModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'booking',
    loadChildren: () => import('./pages/booking/booking.module').then((m) => m.BookingModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'allBookings',
    loadChildren: () => import('./pages/all-bookings/all-bookings.module').then((m) => m.AllBookingsModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'allVehicles',
    loadChildren: () => import('./pages/all-vehicles/all-vehicles.module').then((m) => m.AllVehiclesModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'allFloors',
    loadChildren: () => import('./pages/all-floors/all-floors.module').then((m) => m.AllFloorsModule),
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
