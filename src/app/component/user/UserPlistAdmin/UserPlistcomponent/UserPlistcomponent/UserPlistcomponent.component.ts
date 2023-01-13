import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { IPage, IUser } from 'src/app/model/generic';
import { User, UserResponse } from 'src/app/model/user.interface';
import { UserService } from 'src/app/service/User.service';
import { Location } from '@angular/common';


declare let bootstrap: any;

@Component({
  selector: 'app-UserPlistcomponent',
  templateUrl: './UserPlistcomponent.component.html',
  styleUrls: ['./UserPlistcomponent.component.css']
})
export class UserPlistcomponentComponent implements OnInit {
  
  responseFromServer: UserResponse;
   
  //
  strTermFilter: string = "";
  numberOfElements: number = 5;
  page: number = 0;
  totalPages: number = 0;
  sortField: string = "";
  sortDirection: string = "";
  generated: number;
  generados: boolean = false;
  msg: string = "";

  constructor(
    private oUserService: UserService,
    private oLocation: Location
  ) { 
    this.getPage();
  }

  ngOnInit() {
  }

  getPage() {
    this.oUserService.getUserPlist(this.page, this.numberOfElements, this.strTermFilter, this.sortField, this.sortDirection)
      .subscribe({
        next: (resp: UserResponse) => {
          console.log(resp)
          this.responseFromServer = resp;
          this.totalPages = resp.totalPages;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      })
  }

  setPage(e: number) {
    this.page = (e - 1);
    this.getPage();
  }

  setRpp(rpp: number) {
    this.numberOfElements = rpp;
    this.getPage();
  }

  setFilter(term: string): void {
    this.strTermFilter = term;
    this.page = 0;
    this.getPage();
  }

  setOrder(order: string): void {
    this.sortField = order;
    if (this.sortDirection == "asc") {
      this.sortDirection = "desc";
    } else {
      this.sortDirection = "asc";
    }
    this.getPage();
  }

  generar(cantidad: number) {
    this.oUserService.generateUsuario(cantidad).subscribe({
      next: (resp: number) => {
        this.generated = resp;

        this.msg = "Se ha generado "+(cantidad)+" usuario" ;

        const myModal = new bootstrap.Modal('#generateInfo', {
          keyboard: false
        })
        myModal.show();
      }
    })
  }
  

}
