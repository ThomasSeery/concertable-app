import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const role = route.data['role'];

  console.log("call1")
  return authService.getCurrentUser().pipe(
    map(currentUser => {
      if(["Admin", role].includes(currentUser.role)){
        return true;
      } else {
        router.navigateByUrl('/unauthorized');
        return false;
      }
    }),
    catchError(() => {
      return of(false);
    })
  )
  
};