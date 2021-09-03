import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private router: Router) { }

  getToken() {
    return localStorage.getItem('token');
  }

  saveToken(token: any) {
    localStorage.setItem('token', token);
  }

  destroyToken() {
    localStorage.removeItem('token');
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
