import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Get token
  getToken() {
    return this.token;
  }

  // Get auth
  getIsAuth() {
    return this.isAuthenticated;
  }

  // Get current user's id
  getUserId() {
    return this.userId;
  }

  // Get auth status
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // Create user
  createUser(lastname: string, firstname: string, email: string, password: string) {
    const authData: AuthData = {lastname, firstname, email, password};
    this.http.post('http://localhost:3000/api/user/signup', authData)
    .subscribe(response => {
      if (response) {
        this.router.navigate(['/']);
      }
    });
  }

  // Login
  login(lastname: string, firstname: string, email: string, password: string) {
    const authData: AuthData = {lastname, firstname, email, password};
    this.http.post<{token: string, expiresIn: number, userId: string}>('http://localhost:3000/api/user/login', authData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      if (token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.userId = response.userId;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        console.log(expirationDate);
        this.saveAuthData(token, expirationDate, this.userId);
        this.router.navigate(['/map']);
      }
    });
  }

  // Check current user
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  // Logout
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  // Get current user's id
  getCurrentUser(userId): Observable<any> {
    return this.http.get('http://localhost:3000/api/user/' + userId);
  }

  // Update user's infos
  updateUserInfos(userId, lastname: string, firstname: string, password: string) {
    const body = {
      lastname: lastname,
      firstname: firstname,
      password: password
    }
    this.http.put<any>('http://localhost:3000/api/user/' + userId, body)
    .subscribe(data => {});
  }

  // Delete user
  deleteUser(userId) {
    this.http.delete<any>('http://localhost:3000/api/user/' + userId)
    .subscribe(data => {});
  }

  // Set auth timer
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  // Save auth data to local storage
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  // Clear auth data from local storage
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  // Get auth data from local storage
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId')
    if (!token && expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }
}

