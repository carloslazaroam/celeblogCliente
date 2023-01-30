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
import { PostPlistComponent } from './component/post/PostPlistAdmin/PostPlist/PostPlist.component';
import { PostViewAdminComponent } from './component/post/PostViewAdmin/PostViewAdmin/PostViewAdmin.component';
import { PostNewAdminComponent } from './component/post/PostNewAdmin/PostNewAdmin/PostNewAdmin.component';
import { PostEditAdminComponent } from './component/post/PostEditAdmin/PostEditAdmin/PostEditAdmin.component';
import { PostDeleteAdminComponent } from './component/post/PostDeleteAdmin/PostDeleteAdmin/PostDeleteAdmin.component';
import { ComentarioPlistAdminComponent } from './component/comentario/ComentarioPlistAdmin/ComentarioPlistAdmin/ComentarioPlistAdmin.component';
import { ComentarioViewAdminComponent } from './component/comentario/ComentarioViewAdmin/ComentarioViewAdmin/ComentarioViewAdmin.component';
import { ComentarioDeleteAdminComponent } from './component/comentario/ComentarioDeleteAdmin/ComentarioDeleteAdmin/ComentarioDeleteAdmin.component';
import { CategoriaPlistAdminComponent } from './component/categoria/CategoriaPlistAdmin/CategoriaPlistAdmin/CategoriaPlistAdmin.component';



const routes: Routes = [
  { path: '', component: HomecomponentComponent},
  { path: 'home', component: HomecomponentComponent},
  { path: 'usuario', component: UserPlistcomponentComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'admin/user/view/:id', component: UserViewComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'admin/user/delete/:id', component: UserDeleteComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'admin/user/edit/:id', component: UserEditComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'admin/user/new', component: UserNewComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]},

  { path: 'post', component: PostPlistComponent},
  { path: 'admin/post/view/:id', component: PostViewAdminComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'admin/post/new', component: PostNewAdminComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'admin/post/edit/:id', component: PostEditAdminComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'admin/post/delete/:id', component: PostDeleteAdminComponent, canActivate: [UserGuard], canLoad: [UserGuard]},

  { path: 'comentario', component: ComentarioPlistAdminComponent},
  { path: 'admin/comentario/view/:id', component: ComentarioViewAdminComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'admin/comentario/delete/:id', component: ComentarioDeleteAdminComponent, canActivate: [UserGuard], canLoad: [UserGuard]},

  { path: 'categoria', component: CategoriaPlistAdminComponent},
  
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
