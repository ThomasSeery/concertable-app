import { HttpClient, HttpParams } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { LoginRequest } from '../../models/login-request';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LoginResponse } from '../../models/login-response';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';
import { RegisterRequest } from '../../models/register-request';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  apiUrl = `${environment.apiUrl}/account`
  currentUser = signal<User | null>(null);

  isAdmin = computed(() => {
    const role = this.currentUser()?.role;
    return role === "Admin";
  });

  login(credentials: LoginRequest) : Observable<any> {
    let params = new HttpParams();
    params = params.append('useCookies', true);
    return this.http.post<any>(`${environment.apiUrl}/login`, credentials, { params });
  }

  logout() : Observable<void> {
    console.log(`${this.apiUrl}/logout`);
    return this.http.post<void>(`${this.apiUrl}/logout`, {})
  }

  register(credentials: RegisterRequest) : Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, credentials);
  }

  getCurrentUser() : Observable<User> {
    console.log("withcreds");
    return this.http.get<User>(`${this.apiUrl}/current-user`).pipe(
      map(user => {
        return user;
      })
    )
  }

  navigateToUrl() : void {
    console.log("123")
    this.getCurrentUser().subscribe((user) => {
      console.log(user);
      const role = user.role;
      if(role === "VenueOwner") {
        this.router.navigateByUrl('/venues');
      }
    })
  }
}
