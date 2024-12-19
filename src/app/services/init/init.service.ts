import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitService {

  constructor(private authService: AuthService) { }

  init() {
    console.log("fork");
    return this.authService.getCurrentUser().subscribe();
  }
}
