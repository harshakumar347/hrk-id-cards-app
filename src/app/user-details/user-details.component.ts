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

const username = this.route.snapshot.paramMap.get('username');

this.userService.getUser(username!)
.subscribe((res: any)=>{
this.user = res;
});

await this.loadFiles(username!);

}

async loadFiles(username:string){

const result = await list({
path: `users/${username}/`
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
