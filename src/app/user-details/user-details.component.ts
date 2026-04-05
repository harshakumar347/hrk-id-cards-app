import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { OnInit } from '@angular/core';
import { list, getUrl } from 'aws-amplify/storage';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
user:any;
files:any[]=[];

constructor(
private route:ActivatedRoute,
private userService:UserService
){}

async ngOnInit(){

const phonenumber = this.route.snapshot.paramMap.get('phonenumber');
console.log('Phone number from route in user details:', phonenumber);
this.userService.getUser(phonenumber!)
.subscribe({ next: (res: any) => {
    console.log('User data received:', res);
    this.user = res.data; // Assuming the user data is in res.data
  }}
 
);

console.log(this.user);
await this.loadFiles(phonenumber!);

}

async loadFiles(phonenumber:string){

const result = await list({
path: `users/${phonenumber}/`
});

for(const item of result.items){

const urlResult = await getUrl({
path: item.path
});

this.files.push({
name: item.path.split('/').pop(),
url: urlResult.url
});

}
}
}
