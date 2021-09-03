import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPermissionsModule, NgxPermissionsService } from 'ngx-permissions';
import { map } from 'rxjs/operators';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoAuthGuardService, UserService } from './core';
import { HomeComponent } from './home/home.component';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
import { AllBookingsComponent } from './pages/all-bookings/all-bookings.component';
import { AllVehiclesComponent } from './pages/all-vehicles/all-vehicles.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    NgbModule,
    NgSelectModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot()
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (
        us: UserService,
        ps: NgxPermissionsService
      ) =>
        function () {
          return us.populate().pipe(
            map((user:any) => {
              if (user) {
                ps.loadPermissions([user.role]);
              }
            })
          );
        },
      deps: [UserService, NgxPermissionsService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent, NoAuthGuardService]
})
export class AppModule { }
