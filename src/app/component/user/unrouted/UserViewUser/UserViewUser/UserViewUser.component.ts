import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.interface';

import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/User.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';


@Component({
  selector: 'app-UserViewUser',
  templateUrl: './UserViewUser.component.html',
  styleUrls: ['./UserViewUser.component.css']
})
export class UserViewUserComponent implements OnInit {
  id:number = 0;
  user: User = null;
  images!: string;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oUserService: UserService,
    public oLocation: Location
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
   }

  ngOnInit(): void {
    this.id = parseInt(sessionStorage.getItem("id"))
    this.oUserService.getOne(this.id)
    .subscribe({
      next: (resp: User) => {
        console.log(resp)
        this.user = resp;
        this.images = this.getURLimage(this.user.images)
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }

  getURLimage(images: string): string{
    let img = images.replace(/\\/g, "/");
    let src = img.substring(img.indexOf('/') +1,img.length)
    let result = 'http://localhost:4000' + src.substring(src.indexOf('/'), src.length)
    return result;

  }

}
