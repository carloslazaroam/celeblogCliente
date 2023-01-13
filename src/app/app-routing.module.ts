import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomecomponentComponent } from './component/home/homecomponent/homecomponent.component';
import { UserPlistcomponentComponent } from './component/user/UserPlistAdmin/UserPlistcomponent/UserPlistcomponent/UserPlistcomponent.component';
import { UserViewComponent } from './component/user/UserViewAdmin/UserView/UserView.component';
import { UserDeleteComponent } from './component/user/UserDeleteAdmin/UserDelete/UserDelete.component';
import { UserEditComponent } from './component/user/UserEditAdmin/UserEdit/UserEdit.component';
import { UserNewComponent } from './component/user/UserNewAdmin/UserNew/UserNew.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user.guard';



const routes: Routes = [
  { path: '', component: HomecomponentComponent},
  { path: 'home', component: HomecomponentComponent},
  { path: 'usuario', component: UserPlistcomponentComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'admin/user/view/:id', component: UserViewComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'admin/user/delete/:id', component: UserDeleteComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'admin/user/edit/:id', component: UserEditComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'admin/user/new', component: UserNewComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]},
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
