import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(): boolean{
    const user = this.userService.getCurrentUser();
    if(user.role === 0){
      return true;
    }else{
      this.router.navigate(['/main']);
      return false;
    }
  }
}
