import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';




Amplify.configure(outputs);

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, CommonModule, HttpClientModule]
})
export class AppComponent {
  title = 'amplify-angular-template';
}
