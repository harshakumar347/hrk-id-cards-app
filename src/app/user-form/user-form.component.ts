import { Component, OnInit } from '@angular/core';
import { uploadData } from 'aws-amplify/storage';
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
    throw new Error('Method not implemented.');
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
       const result = await client.models.User.create({
      
        username: this.username,
        dob: this.dob,
        files: this.files.map(file => file.name)
});

   const user = result.data;

    }

    for (let file of this.files) {

      const path = `users/${this.username}/${file.name}`;

      await uploadData({
        path: path,
        data: file
      });

    }

    alert("Files uploaded successfully");
  }

}
