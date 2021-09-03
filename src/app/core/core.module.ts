import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApiService,
  AuthGuardService,
  JwtService,
  NoAuthGuardService,
  UserService
} from './services';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
  declarations: [],
  providers: [
    ApiService,
    AuthGuardService,
    JwtService,
    UserService,
    NoAuthGuardService,
    NgxPermissionsModule
  ],
  imports: [
    CommonModule,
    NgxPermissionsModule
  ]
})
export class CoreModule { }
