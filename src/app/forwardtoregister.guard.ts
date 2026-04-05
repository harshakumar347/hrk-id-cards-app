import { CanMatchFn } from '@angular/router';
import { UserService } from './user.service';
import { inject } from '@angular/core';
import { map, of, catchError } from 'rxjs';

export const forwardtoregisterGuard: CanMatchFn = (route, state) => {
  const userService = inject(UserService);
  console.log('Guard executed with route:', route);
  const phonenumber =  state[1]?.path; 
  return userService.getUser(phonenumber).pipe(
    map((user: any) => {
      if (user.data) {
        
        return true;   // show UserDetailsComponent
      } else {
        return false;  // show UserFormComponent
      }
    }),
    catchError(() => of(false))
  );


};
