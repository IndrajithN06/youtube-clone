import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Create a BehaviorSubject to track login status, default is false (logged out)
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  // Expose this as an observable for other components to subscribe to
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    // Check if there's a token in localStorage, which means the user is logged in
    const token = localStorage.getItem('authToken');
    if (token) {
      this.isLoggedInSubject.next(true);
    }
  }

  login(token: string): void {
    // Store token in localStorage and update the login status
    localStorage.setItem('authToken', token);
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    // Remove token from localStorage and update the login status
    localStorage.removeItem('authToken');
    this.isLoggedInSubject.next(false);
  }
}
