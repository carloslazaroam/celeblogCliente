import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoriaResponse } from 'src/app/model/categoria';
import { Post, PostResponse } from 'src/app/model/post.interface';
import { Tipocategoria } from 'src/app/model/tipocategoria';
import { PostService } from 'src/app/service/Post.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { TipocategoriaService } from 'src/app/service/tipocategoria.service';

@Component({
  selector: 'app-PostPlistUser',
  templateUrl: './PostPlistUser.component.html',
  styleUrls: ['./PostPlistUser.component.css']
})
export class PostPlistUserComponent implements OnInit {

  responseFromServer: PostResponse;
 

  strTermFilter: string = "";
  numberOfElements: number = 6;
  page: number = 0;
  totalPages: number = 0;
  sortField: string = "";
  sortDirection: string = "";
  generated: number;
  generados: boolean = false;
  msg: string = "";
  images!: string;
  post: Post = null;
  categorias!: Tipocategoria[];
  categoriafilter: number = 0;
  

  constructor(
    private oPostService: PostService,
    private oCategoriaService: CategoriaService,
    private oTipocategoriaService: TipocategoriaService,


  ) { }

  ngOnInit() {
    this.getPage();
    this.getTipoCategoria();
    
  }

  getPage() {
    this.oPostService.getPostPlist(this.page, this.numberOfElements, this.strTermFilter, this.sortField, this.sortDirection,undefined,this.categoriafilter)
      .subscribe({
        next: (resp: PostResponse) => {
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
  setCategoriaFilter(id_categoria: number): void {
    this.categoriafilter = id_categoria;
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


  getTipoCategoria(){
    this.oTipocategoriaService.getPageTipocategoria()
    .subscribe({
      next: (resp: Tipocategoria[]) => {
        this.categorias = resp;
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
