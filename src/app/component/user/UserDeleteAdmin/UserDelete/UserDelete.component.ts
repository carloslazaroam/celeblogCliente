import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/User.service';
import { Location } from '@angular/common';

declare let bootstrap: any;
@Component({
  selector: 'app-UserDelete',
  templateUrl: './UserDelete.component.html',
  styleUrls: ['./UserDelete.component.css']
})
export class UserDeleteComponent implements OnInit {

  id: number = 0;
  msg: string = "";


  constructor(
    protected oLocation: Location,
    private oActivatedRoute: ActivatedRoute,
    private oUserService: UserService,
  ) { 
    this.id = oActivatedRoute.snapshot.params['id'];

  }
  

  ngOnInit(): void {
  }

  removeOne() {
    this.oUserService.removeOne(this.id).subscribe({
      next: (data: number) => {
        this.msg = "Se ha eliminado el usuario con id " + this.id;
        const myModal = new bootstrap.Modal('#removeInfo', {
          keyboard: false
        })
        myModal.show();        
        this.oLocation.back();
      }
    })
  }

}
