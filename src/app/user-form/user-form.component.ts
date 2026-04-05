import { Component, OnInit } from '@angular/core';
import { uploadData, UploadDataWithPathOutput } from 'aws-amplify/storage';
import { FormsModule } from '@angular/forms'; 
import { generateClient } from 'aws-amplify/data';
import { Schema } from '../../../amplify/data/resource';
import { userGuard } from '../user.guard';

const client = generateClient<Schema>();

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  ngOnInit(): void {
   
  }
    username: string = '';
    dob: string = '';
    files: File[] = [];

  onFileSelected(event: any) {
    this.files = Array.from(event.target.files);
  }

  async submitForm() {

    if (!this.username) {
      alert("Username required");
      return;
    }else{
      const { data: user , errors } = await client.models.User.create({
        username: this.username,
        dob: this.dob,
        files: this.files.map(file => file.name)
});

      errors?alert(`Error creating user: ${errors[0].message}`):alert
      const realuser = user?.username

    }

    for (let file of this.files) {

      const path = `${this.username}/${file.name}`;

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
    
  }

}
