import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/service/Post.service';
import { Location } from '@angular/common';
declare let bootstrap: any;

@Component({
  selector: 'app-PostDeleteAdmin',
  templateUrl: './PostDeleteAdmin.component.html',
  styleUrls: ['./PostDeleteAdmin.component.css']
})
export class PostDeleteAdminComponent implements OnInit {

  id: number = 0;
  msg: string = "";


  constructor(
    protected oLocation: Location,
    private oActivatedRoute: ActivatedRoute,
    private oPostService: PostService,
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
   }

  ngOnInit(): void {
  }
  removeOne() {
    this.oPostService.removeOne(this.id).subscribe({
      next: (data: number) => {
        this.msg = "Se ha eliminado el post con id " + this.id;
        const myModal = new bootstrap.Modal('#removeInfo', {
          keyboard: false
        })
        myModal.show();        
        this.oLocation.back();
      }
    })
  }

}
