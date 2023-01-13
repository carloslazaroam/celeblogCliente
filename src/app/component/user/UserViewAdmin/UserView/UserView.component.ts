import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user.interface';
import { UserService } from 'src/app/service/User.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-UserView',
  templateUrl: './UserView.component.html',
  styleUrls: ['./UserView.component.css']
})
export class UserViewComponent implements OnInit {


  id:number = 0;
  user: User = null;
  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oUserService: UserService,
    public oLocation: Location
  ) { 
    this.id = oActivatedRoute.snapshot.params['id'];
  }

  ngOnInit(
  ): void {
    this.oUserService.getOne(this.id)
    .subscribe({
      next: (resp: User) => {
        console.log(resp)
        this.user = resp;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }

}
