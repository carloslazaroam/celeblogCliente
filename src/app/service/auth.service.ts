import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, CheckTokenResponse } from '../model/auth-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private oHttp: HttpClient
  ) { }

  stateLogin = new BehaviorSubject(false);
  loginStatus = this.stateLogin.asObservable();
  authURL = 'auth'

  login(email: string, password: string): Observable<AuthResponse>{
    const url = `${environment.baseURL}/${this.authURL}/login`;
    const body = JSON.stringify({
      email,
      password
    });
    return this.oHttp.post<AuthResponse>(url,body, {headers: environment.headers});
  }

  sendEmail(email: string): Observable<string>{
    const url = `${environment.baseURL}/${this.authURL}/forgot-password`;
    const body = JSON.stringify({
      email
    });
    return this.oHttp.post<string>(url, body, {headers: environment.headers});
  }

  

  checkToken(){
    const url = `${environment.baseURL}/${this.authURL}/checktoken`;
    const headers = {
      'content-type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("token")?.replaceAll('"', '')}`,
    }
    this.oHttp.get<CheckTokenResponse>(url, {headers})
    .subscribe({
      next: (resp: CheckTokenResponse) => {
        if(resp.ok) {
          this.stateLogin.next(true);
        } else {
          this.stateLogin.next(false);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.stateLogin.next(false);
      }
    });;
  }

  logOut(){
    if(sessionStorage.getItem("token") != null){
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("imagen");
        this.stateLogin.next(false);
    }
  }
}
