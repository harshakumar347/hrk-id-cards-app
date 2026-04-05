import { inject, Inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { UserService } from './user.service';
import { of } from 'rxjs';

export const userGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
   const router = inject(Router);
  const phonenumber = route.params['phonenumber'];
  

return userService.getUser(phonenumber).pipe(

map(user => {

if(user){

return true;   // show UserDetailsComponent

}else{

router.navigate(['/register',phonenumber]);
return false;

}

}),

catchError(() => {

router.navigate(['/register',phonenumber]);
return of(false);

})

);
};
