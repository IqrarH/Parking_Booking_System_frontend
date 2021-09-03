import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { JwtService } from '../core/services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req:any, next:any){
    let authService = this.injector.get(JwtService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Token ${authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq);
  }
}
