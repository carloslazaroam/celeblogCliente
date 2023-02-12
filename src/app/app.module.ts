import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenuComponent } from './component/menu/menu/menu.component';
import { HomecomponentComponent } from './component/home/homecomponent/homecomponent.component';
import { UserPlistcomponentComponent } from './component/user/UserPlistAdmin/UserPlistcomponent/UserPlistcomponent/UserPlistcomponent.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchUnroutedComponent } from './component/shared/search-unrouted/search-unrouted.component';
import { DropdownRegisterPageComponent } from './component/shared/dropdown-register-page/dropdown-register-page.component';
import { PaginationUnroutedComponent } from './component/shared/pagination-unrouted/pagination-unrouted.component';
import { PaginationService } from './service/pagination.service';
import { UserViewComponent } from './component/user/UserViewAdmin/UserView/UserView.component';
import { UserDeleteComponent } from './component/user/UserDeleteAdmin/UserDelete/UserDelete.component';
import { UserNewComponent } from './component/user/UserNewAdmin/UserNew/UserNew.component';
import { UserEditComponent } from './component/user/UserEditAdmin/UserEdit/UserEdit.component';
import { LoginComponent } from './component/login/login.component';
import { GenerateUsuarioComponent } from './component/user/generate-usuario/generate-usuario.component';
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
import { UserViewUserComponent } from './component/user/unrouted/UserViewUser/UserViewUser/UserViewUser.component';
import { PostNewUserComponent } from './component/post/unrouted/PostNewUser/PostNewUser/PostNewUser.component';
import { PostEditUserComponent } from './component/post/unrouted/PostEditUser/PostEditUser/PostEditUser.component';





@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        HomecomponentComponent,
        SearchUnroutedComponent,
        DropdownRegisterPageComponent,
        PaginationUnroutedComponent,
        LoginComponent,

        UserPlistcomponentComponent,
        UserDeleteComponent,
        UserNewComponent,
        UserEditComponent,
        UserViewComponent,
        GenerateUsuarioComponent,

        UserNewUserComponent,
        UserViewUserComponent,

        PostPlistComponent,
        PostViewAdminComponent,
        PostNewAdminComponent,
        PostEditAdminComponent,
        PostDeleteAdminComponent,


        PostPlistUserComponent,
        PostViewUserComponent,
        PostNewUserComponent,
        PostEditUserComponent,

        ComentarioPlistAdminComponent,
        ComentarioViewAdminComponent,
        ComentarioDeleteAdminComponent,
        ComentarioNewAdminComponent,
        ComentarioEditAdminComponent,

        CategoriaPlistAdminComponent,
        CategoriaDeleteAdminComponent,
        CategoriaNewAdminComponent
        
       
        
        /*SearchUnroutedComponent,
        DropdownRegisterPageComponent,
        PaginationUnroutedComponent
        */
    ],
    providers: [
        PaginationService
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AppModule { }
