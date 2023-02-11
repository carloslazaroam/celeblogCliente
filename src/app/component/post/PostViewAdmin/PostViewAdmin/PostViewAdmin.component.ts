import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/model/post.interface';
import { PostService } from 'src/app/service/Post.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-PostViewAdmin',
  templateUrl: './PostViewAdmin.component.html',
  styleUrls: ['./PostViewAdmin.component.css']
})
export class PostViewAdminComponent implements OnInit {

  id:number = 0;
  post: Post = null;
  images!: string

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oPostService: PostService,
    public oLocation: Location
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
   }

  ngOnInit():void {
    this.oPostService.getOne(this.id)
    .subscribe({
      next: (resp: Post) => {
        console.log(resp)
        this.post = resp;
        this.images = this.getURLimage(this.post.images)
        
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
