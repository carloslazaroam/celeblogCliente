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

  ngOnInit(): void {
    this.oAuthService.stateLogin
    .subscribe({
      next: (resp : boolean) => {
        this.logged = resp;
        if(resp) {
          this.images =  sessionStorage.getItem("imagen")?.replaceAll('"', '') + '';
        }else{
          this.images = '';
        }
      }
    });
    this.oAuthService.checkToken();
  }
  logout(){
    this.oAuthService.logOut();
  }

}
