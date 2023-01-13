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

        PostPlistComponent
       
        
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
        ReactiveFormsModule,
        
    ]
})
export class AppModule { }
