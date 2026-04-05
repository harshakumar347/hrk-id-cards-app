import { Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserFormComponent } from './user-form/user-form.component';
import { userGuard } from './user.guard';
import { TodosComponent } from './todos/todos.component';
import { forwardtoregisterGuard } from './forwardtoregister.guard';

export const routes: Routes = [


    {
path: 'user/:phonenumber',
canMatch: [forwardtoregisterGuard],
component: UserDetailsComponent
},

{
path: 'user/:phonenumber',
component: UserFormComponent
}

];
