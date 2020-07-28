import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersProfileComponent } from './user-profile/users-profile.component';

const routes: Routes = [
    {
        path: 'profile',
        component: UserProfileComponent
    },
    {
      path: 'user-profile',
      component: UsersProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
