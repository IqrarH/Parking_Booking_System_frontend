import { NgxPermissionsService } from 'ngx-permissions';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject, of } from 'rxjs';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { User } from '../models';
import { map ,  distinctUntilChanged, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService,
    private permissionsService: NgxPermissionsService,
  ) { }

  public get authenticated() {
    return this.isAuthenticatedSubject.value;
  }

  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      return this.apiService.get('/users')
      .pipe(map(
        (res:any) => {
              this.setAuth(res);
              return res;
            }

      ), catchError(e => {
        console.log(e);
        this.purgeAuth();
        return of(null)}))
    } else {
     return  of(null);
    }
  }

  updateUserContext() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
        this.apiService.get('/users').subscribe((res:any) => {
              this.setAuth(res.data.user);
            }, )
    }
  }

  setAuth(user: any) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user.data);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // flush permissions
    this.permissionsService.flushPermissions();
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type: boolean, credentials: any): Observable<User> {
    console.log('In Attempt Auth');
    const route = type ? '/login' : '/signup';
    return this.apiService.post('/users' + route, credentials)
      .pipe(map(
      (res:any) => {
        this.setAuth(res);
        return res;
      }
    ));
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  getAllUsers(path:string)
  {
    return this.apiService.get(path);
  }

  // Update the user on the server (email, pass, etc)
  update(user: User): Observable<User> {
    return this.apiService
    .put('/user', { user })
    .pipe(map((data:any) => {
      // Update the currentUser observable
      this.currentUserSubject.next(data.user);
      return data.user;
    }));
  }

}
