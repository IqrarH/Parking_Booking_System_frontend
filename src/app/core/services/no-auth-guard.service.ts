import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserType } from '..';
import { JwtService } from './jwt.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuardService implements CanActivate{

  constructor(
    private router: Router,
    private jwtService: JwtService,
    private userService: UserService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean {

    if(this.jwtService.getToken()){
      return false;
    }else{
      return true;
    }
  }
}
