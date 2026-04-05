import { Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserFormComponent } from './user-form/user-form.component';
import { userGuard } from './user.guard';
import { TodosComponent } from './todos/todos.component';

export const routes: Routes = [


    {
path: 'user/:phonenumber',
canActivate: [userGuard],
component: UserDetailsComponent
},

{
path: 'register/:phonenumber',
component: UserFormComponent
}

];
