import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Post } from 'src/app/model/post.interface';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/service/Post.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ComentarioService } from 'src/app/service/Comentario.service';
import { ComentarioResponse } from 'src/app/model/comentario.interface';

@Component({
  selector: 'app-PostViewUser',
  templateUrl: './PostViewUser.component.html',
  styleUrls: ['./PostViewUser.component.css']
})
export class PostViewUserComponent implements OnInit {

  id:number = 0;
  post: Post = null;
  images!: string

  idUsuarioSesion: string

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oPostService: PostService,
    public oLocation: Location,
    private oComentarioService: ComentarioService,
  ) { 
    this.id = oActivatedRoute.snapshot.params['id'];
  }

  ngOnInit():void {
    this.getPageComentario();

    this.oPostService.getOne(this.id) // id del post
    .subscribe({
      next: (resp: Post) => {
        console.log(resp)
        this.post = resp;
        this.images = this.getURLimage(this.post.images)
        this.idUsuarioSesion = sessionStorage.getItem("id")
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

  responseFromServer: ComentarioResponse;

  strTermFilter: string = "";
  numberOfElements: number = 1000;
  page: number = 0;
  totalPages: number = 0;
  sortField: string = "";
  sortDirection: string = "";
  generated: number;
  generados: boolean = false;
  msg: string = "";
  categoriafilter: number = 0;




  getPageComentario() {
    this.oComentarioService.getComentarioPlist(this.page, this.numberOfElements, this.strTermFilter, this.sortField, this.sortDirection,this.categoriafilter)
      .subscribe({
        next: (resp: ComentarioResponse) => {
          console.log(resp)
          this.responseFromServer = resp;
          this.totalPages = resp.totalPages;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      })
  }

  setComentarioFilter(id_post: number): void {
    this.categoriafilter = id_post;
    this.page = 0;
    this.getPageComentario();
  }

}
