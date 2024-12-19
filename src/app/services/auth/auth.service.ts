import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { LoginRequest } from '../../models/login-request';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LoginResponse } from '../../models/login-response';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';
import { RegisterRequest } from '../../models/register-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  apiUrl = `${environment.apiUrl}/account`
  currentUser = signal<User | null>(null);

  isAdmin = computed(() => {
    const role = this.currentUser()?.role;
    return role === "Admin";
  });

  login(credentials: LoginRequest) : Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/login`, credentials)
      .pipe(map(response => {
        localStorage.setItem('accessToken', response.accessToken);
        document.cookie = `refreshToken=${response.refreshToken};`;
        return response;
      }));
  }

  logout() : Observable<void> {
    localStorage.removeItem('accessToken');
    return this.http.post<void>(`${environment.apiUrl}/logout`, {});
  }

  register(credentials: RegisterRequest) : Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, credentials);
  }

  refreshToken() : Observable<LoginResponse> {
    const refreshToken = this.getRefreshTokenFromCookie();

    return this.http.post<LoginResponse>(`${environment.apiUrl}/refresh`, { refreshToken})
      .pipe(map(response => {
        localStorage.setItem('accessToken', response.accessToken);
        document.cookie = `refreshToken=${response.refreshToken};`;
        return response;
      }))
  }

  private getRefreshTokenFromCookie(): string | null {
    const cookieString = document.cookie;
    const cookieArray = cookieString.split('; ');

    for (const cookie of cookieArray) {
      const [name, value] = cookie.split('=');

      if (name == 'refreshToken') {
        return value;
      }
    }

    return null;
  }

  getCurrentUser() : Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/current-user`).pipe(
      map(user => {
        return user;
      })
    )
  }
}
