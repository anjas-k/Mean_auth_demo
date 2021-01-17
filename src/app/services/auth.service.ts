import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { LoginResponseData } from '../_models/loginAPIResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { tokenGetter } from '../app.module';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  token: any;
  user!: String;

  constructor(private http: HttpClient,private jwthelper:JwtHelperService) {
 // Change to false before deployment
      }
      baseUrl = environment.baseUrl;
      
  registerUser(user:string):Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<any>(this.baseUrl+'users/register', user, {headers: headers})
  }

  authenticateUser(user:string):Observable<LoginResponseData > {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<LoginResponseData >(this.baseUrl+'users/authenticate', user, {headers: headers});
  }

  getProfile():Observable<any> {
    let headers = new HttpHeaders();
    //this.token = this.loadToken();
    this.loadToken();
    headers.append('Authorization', this.token);
    headers.append('Content-Type', 'application/json');
    return this.http.get<any>(this.baseUrl+'users/profile', {headers: headers});
  }

  storeUserData(token:string, user:string) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('access_token');
    this.token = token;
  }

  loggedIn() {
    const refreshToken:any = tokenGetter();
    return this.jwthelper.isTokenExpired(refreshToken);
    /*
    const Token = localStorage.getItem('access_token');
     return Token;*/
  }
  
  logout() {
    this.token = null;
    this.user = '';
    localStorage.clear();
  }


}
