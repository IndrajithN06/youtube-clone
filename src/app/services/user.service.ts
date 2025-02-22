import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RegisterUserDto } from '../dto/register-user-dto';
import { LoginUserDto } from '../dto/login-user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:7052/api/user';

  constructor(private http: HttpClient) {}

  registerUser(user: RegisterUserDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user)
      .pipe(
        catchError(error => {
          return throwError(error); // Re-throw the error for handling in the component
        })
      );
  }

  loginUser(login: LoginUserDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, login)
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }
}