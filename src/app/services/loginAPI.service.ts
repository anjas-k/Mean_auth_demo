import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {  LoginResponse } from '../_models/loginAPIResponse';




@Injectable({
  providedIn: 'root'
})

export class LoginAPIService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

 
}
