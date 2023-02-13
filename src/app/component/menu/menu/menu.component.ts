import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private oAuthService: AuthService
  ) {}

  logged = false;
  images!: string;
  tipousuario: string
  idUsuarioSesion: string

  ngOnInit(): void {
    this.oAuthService.stateLogin
    .subscribe({
      next: (resp : boolean) => {
        this.logged = resp;
        if(resp) {
          this.images =  sessionStorage.getItem("imagen")?.replaceAll('"', '') + '';
          this.tipousuario = sessionStorage.getItem("tipousuario")
          this.idUsuarioSesion = sessionStorage.getItem("id")
        }else{
          this.images = '';
          this.tipousuario = '';
          this.idUsuarioSesion = '';
        }
      }
    });
    this.oAuthService.checkToken();
  }
  logout(){
    this.oAuthService.logOut();
  }

}
