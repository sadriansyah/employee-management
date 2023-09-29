import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  const toast = inject(ToastrService);

  if(auth.isAuthenticated) {
    return true;
  } else {
    router.navigate(['']);
    toast.warning('You need to login first, to access this page!');
    return false;
  }
};
