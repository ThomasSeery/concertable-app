import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-header',
  standalone: false,
  templateUrl: './customer-header.component.html',
  styleUrl: './customer-header.component.scss'
})
export class CustomerHeaderComponent {
  constructor(public authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout().subscribe(() => this.router.navigateByUrl('/'));
  }
}
