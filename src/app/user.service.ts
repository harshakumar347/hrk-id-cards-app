import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
 
})
export class UserService {
apiUrl = "https://your-api-id.execute-api.region.amazonaws.com/dev/users";

constructor(private http: HttpClient) {}

getUser(username: string){
  console.log(`Fetching user with username: ${username}`);
return this.http.get<any>(`${this.apiUrl}/${username}`);
}

}
