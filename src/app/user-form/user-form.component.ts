import { Component, OnInit } from '@angular/core';
import { uploadData } from 'aws-amplify/storage';
import { FormsModule } from '@angular/forms'; 
import { generateClient } from 'aws-amplify/data';
import { UserSchema } from '../../../amplify/data/resource';

const client = generateClient<UserSchema>();

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
     const { errors, data: user } = await client.models.User.create({
        id: this.username,
        username: this.username,
        dob: this.dob,
        files: this.files.map(file => file.name)
});
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
