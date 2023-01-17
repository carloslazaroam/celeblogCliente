import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { User } from 'src/app/model/user.interface';

import { UserService } from 'src/app/service/User.service';

@Component({
  selector: 'app-UserGenerate',
  templateUrl: './UserGenerate.component.html',
  styleUrls: ['./UserGenerate.component.css']
})
export class UserGenerateComponent implements OnInit {

  strResult: string = "";
  bLoading:boolean=false;
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";

  constructor(
    private oRouter: Router,
    private oUserService: UserService,
  ) { }

  
  ngOnInit(): void {
  }

 

  user: User;

  

}
