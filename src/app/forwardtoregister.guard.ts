import { CanActivateFn } from '@angular/router';
import { UserService } from './user.service';
import { inject } from '@angular/core';
import { map, of, catchError } from 'rxjs';

export const forwardtoregisterGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const phonenumber = route.params['phonenumber'];
  return userService.getUser(phonenumber).pipe(
    map((user: any) => {
      if (user) {
        return true;   // show UserDetailsComponent
      } else {
        return false;  // show UserFormComponent
      }
    }),
    catchError(() => of(false))
  );


};
