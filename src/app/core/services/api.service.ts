import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  postVehicle(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, body, {withCredentials: true})
    .pipe(catchError(this.formatErrors));
  }

  postBooking(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, body, {withCredentials: true})
    .pipe(catchError(this.formatErrors));
  }

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    console.log('In POST');
    console.log(`${environment.api_url}${path}`);
    
    return this.http.post(
      `${environment.api_url}${path}`,body, {withCredentials: true})
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      body
    ).pipe(catchError(this.formatErrors));
  }

  delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.delete(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

}
