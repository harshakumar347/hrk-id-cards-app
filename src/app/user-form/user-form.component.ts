import { Component, inject, OnInit } from '@angular/core';
import { uploadData, UploadDataWithPathOutput } from 'aws-amplify/storage';
import { FormsModule } from '@angular/forms'; 
import { generateClient } from 'aws-amplify/data';
import { Schema } from '../../../amplify/data/resource';
import { userGuard } from '../user.guard';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

const client = generateClient<Schema>();

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {

  constructor(
  private route:ActivatedRoute,
  private userService:UserService
  ){}
  
  router = inject(Router);
  ngOnInit(): void {
   
  }

    phonenumber = this.route.snapshot.paramMap.get('phonenumber');
    
    username: string = '';
    dob: string = '';
    files: File[] = [];

  onFileSelected(event: any) {
    this.files = Array.from(event.target.files);
  }

  async submitForm() {

    if (!this.phonenumber) {
      alert("Phone number required");
      return;
    }else if(!this.username){
      alert("Username required");
      return;
    }else{
      const { data: user , errors } = await client.models.User.create({
        phonenumber: this.phonenumber,
        username: this.username,
        dob: this.dob,
        files: this.files.map(file => file.name)
});

      errors?alert(`Error creating user: ${errors[0].message}`):alert
      const realuser = user?.username

    }

    for (let file of this.files) {

      const path = `users/${this.phonenumber}/${file.name}`;

       const  filesuploaded:UploadDataWithPathOutput =    await uploadData({
        
        path: path,
        data: file,
        options: {
                bucket: 'users'
                
                 }
        
      });

     
      filesuploaded.result.then(() => {
        alert(`File ${file.name} uploaded successfully`);
       
      
      }).catch((error) => {        alert(`Error uploading file ${file.name}: ${error.message}`);
      });
     
     
    }

     this.router.navigate(['/user',this.phonenumber]);
    
  }

}
