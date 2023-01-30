import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/model/auth-response.interface';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor (
    private oAuthService: AuthService,
    private oFormBuilder: FormBuilder,
    private oRouter: Router
  ) {}

  loginUser: FormGroup = this.oFormBuilder.group({
    email: ["", [Validators.required]],
    password: ["", Validators.required]
  });

  logged: boolean = false;
  error:boolean = false;

  ngOnInit(): void {

  }

  login(){
    if(this.loginUser.valid){
      this.oAuthService.login(this.loginUser.value.email, this.loginUser.value.password)
      .subscribe({
        next: (resp: AuthResponse) => {
          this.logged = resp.ok;
          console.log(resp);
          if(resp.ok){
            console.log(resp.imagen)
            sessionStorage.setItem("imagen", JSON.stringify(this.getURLimage(resp.imagen)));
            sessionStorage.setItem("token", resp.token);
            this.oAuthService.stateLogin.next(true);
            this.error = false;
            this.oRouter.navigateByUrl('/home');
          } else{
              this.error = true;
          }
        },
        error: (err: HttpErrorResponse) => {
          this.error = true;
          console.log(err);
        }
      });
    } else {
      this.loginUser.markAllAsTouched();
    }
  }

  getURLimage(images: string): string{
    let img = images.replace(/\\/g, "/");
    let src = img.substring(img.indexOf('/') +1,img.length)
    let result = 'http://localhost:4000' + src.substring(src.indexOf('/'), src.length)
    return result;
  }

  

  
  

  CampoNoValido(campo: string) {
    return (
      this.loginUser.controls[campo].errors &&
      this.loginUser.controls[campo].touched
    );
  }

  touched( campo: string ): boolean{
    return this.loginUser.controls[campo].touched
  }

}
