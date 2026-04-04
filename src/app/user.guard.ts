import { inject, Inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { UserService } from './user.service';
import { of } from 'rxjs';

export const userGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
   const router = inject(Router);
  const username = route.params['username'];
  

return userService.getUser(username).pipe(

map(user => {

if(user){

return true;   // show UserDetailsComponent

}else{

router.navigate(['/register',username]);
return false;

}

}),

catchError(() => {

router.navigate(['/register',username]);
return of(false);

})

);
};
