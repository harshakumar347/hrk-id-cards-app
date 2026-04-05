import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { generateClient } from 'aws-amplify/data';

import { Schema } from '../../amplify/data/resource';
import { from, Observable } from 'rxjs';

const client = generateClient<Schema>();

@Injectable({
  providedIn: 'root'
 
})
export class UserService {


constructor(private http: HttpClient) {}

   getUser(usernm: string){
   
  console.log(`Fetching user with phone number: ${usernm}`);
return from(client.models.User.get({phonenumber: usernm }));
}

}
