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
import { CategoriaDeleteAdminComponent } from './component/categoria/CategoriaDeleteAdmin/CategoriaDeleteAdmin/CategoriaDeleteAdmin.component';
import { ComentarioNewAdminComponent } from './component/comentario/ComentarioNewAdmin/ComentarioNewAdmin/ComentarioNewAdmin.component';
import { CategoriaNewAdminComponent } from './component/categoria/CategoriaNewAdmin/CategoriaNewAdmin/CategoriaNewAdmin.component';
import { ComentarioEditAdminComponent } from './component/comentario/ComentarioEditAdmin/ComentarioEditAdmin/ComentarioEditAdmin.component';
import { PostPlistUserComponent } from './component/post/unrouted/PostPlistUser/PostPlistUser/PostPlistUser.component';
import { PostViewUserComponent } from './component/post/unrouted/PostViewUser/PostViewUser/PostViewUser.component';
import { UserNewUserComponent } from './component/user/unrouted/UserNewUser/UserNewUser/UserNewUser.component';
import { PostNewUserComponent } from './component/post/unrouted/PostNewUser/PostNewUser/PostNewUser.component';
import { PostEditUserComponent } from './component/post/unrouted/PostEditUser/PostEditUser/PostEditUser.component';



const routes: Routes = [
  { path: '', component: HomecomponentComponent},
  { path: 'home', component: HomecomponentComponent},
  { path: 'usuario', component: UserPlistcomponentComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'admin/user/view/:id', component: UserViewComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'admin/user/delete/:id', component: UserDeleteComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'admin/user/edit/:id', component: UserEditComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'admin/user/new', component: UserNewComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]},

  { path: 'usuari/user/new', component: UserNewUserComponent},
  { path: 'user/usuari/view/:id', component: UserViewComponent},

  { path: 'post', component: PostPlistComponent},
  { path: 'admin/post/view/:id', component: PostViewAdminComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'admin/post/new', component: PostNewAdminComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'admin/post/edit/:id', component: PostEditAdminComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'admin/post/delete/:id', component: PostDeleteAdminComponent, canActivate: [UserGuard], canLoad: [UserGuard]},

  { path: 'postuser', component: PostPlistUserComponent},
  { path: 'user/post/view/:id', component: PostViewUserComponent},
  { path: 'user/post/new', component: PostNewUserComponent},
  { path: 'user/post/edit/:id', component: PostEditUserComponent},
  
  
  

  { path: 'comentario', component: ComentarioPlistAdminComponent},
  { path: 'admin/comentario/view/:id', component: ComentarioViewAdminComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'admin/comentario/delete/:id', component: ComentarioDeleteAdminComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'admin/comentario/new', component: ComentarioNewAdminComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'admin/comentario/edit/:id', component: ComentarioEditAdminComponent, canActivate: [UserGuard], canLoad: [UserGuard]},

  { path: 'categoria', component: CategoriaPlistAdminComponent},
  { path: 'admin/categoria/delete/:id', component: CategoriaDeleteAdminComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  { path: 'admin/categoria/new', component: CategoriaNewAdminComponent, canActivate: [UserGuard], canLoad: [UserGuard]},
  
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
