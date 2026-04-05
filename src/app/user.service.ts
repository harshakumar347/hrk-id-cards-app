import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { generateClient } from 'aws-amplify/data';

import { UserSchema } from '../../amplify/data/resource';
import { from, Observable } from 'rxjs';

const client = generateClient<UserSchema>();

@Injectable({
  providedIn: 'root'
 
})
export class UserService {


constructor(private http: HttpClient) {}

   getUser(username: string){
   
  console.log(`Fetching user with username: ${username}`);
return from(client.models.User.get({id: username }));
}

}
