import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Post } from 'src/app/model/post.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/service/Post.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ComentarioService } from 'src/app/service/Comentario.service';
import { ComentarioResponse } from 'src/app/model/comentario.interface';
import { User, UserResponse } from 'src/app/model/user.interface';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/User.service';
declare let bootstrap: any;

@Component({
  selector: 'app-PostViewUser',
  templateUrl: './PostViewUser.component.html',
  styleUrls: ['./PostViewUser.component.css']
})
export class PostViewUserComponent implements OnInit {

  oForm: FormGroup;
  usuario!: Observable<UserResponse>;
 
  // modal
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";
  nowDate = new Date().toUTCString();
  users: User[];
  posts: Post[];



  idPost:number = 0;
  idUser:number = 0;
  idComentario: number = 0;
  post: Post = null;
  images!: string

  idUsuarioSesion: string

  constructor(
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    private oPostService: PostService,
    public oLocation: Location,
    private oUserService: UserService,
    private oComentarioService: ComentarioService,
    private oFormBuilder: FormBuilder,
  ) { 
    this.idPost = oActivatedRoute.snapshot.params['id'];
    this.idUser =  parseInt(this.idUsuarioSesion = sessionStorage.getItem("id"));
    this.idComentario = oActivatedRoute.snapshot.params['id'];
    ;
  }

  ngOnInit():void {
    this.getPageComentario();
    this.getUserPage();
    this.oForm = this.oFormBuilder.group({
      contenido: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      id_usuario: [this.idUser, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      id_post: [this.idPost, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    });
    

    this.oPostService.getOne(this.idPost) // id del post
    .subscribe({
      next: (resp: Post) => {
        console.log(resp)
        this.post = resp;
        this.images = this.getURLimage(this.post.images)
        this.idUsuarioSesion = sessionStorage.getItem("id");
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




  getPageComentario() {
    this.oComentarioService.getComentarioPlist(this.page, this.numberOfElements, this.strTermFilter, this.sortField, this.sortDirection,this.idPost)
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
    this.page = 0;
    this.getPageComentario();
  }

  getUserPage(){
    this.oUserService.getUserPlist(0, 999, '', '', '')
    .subscribe({
      next: (resp: UserResponse) => {
        this.users = resp.content;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }

  onSubmit() {
    console.log(this.oForm.value)
    if (this.oForm.valid) {
      this.oComentarioService.newOne(this.oForm.value).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          // this.modalTitle = "Cambios realizados";
          // this.modalContent = "El comentario " + data + " ha sido creado.";
          // this.showModal(data);
          this.getPageComentario();
          this.oForm.patchValue({contenido: ''});
        }
      });
    } else {
      this.oForm.markAllAsTouched();
    }
  }

  showModal = (data) => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.mimodal), { //pasar el myModal como parametro
      keyboard: false
    })
    var myModalEl = document.getElementById(this.mimodal);
    myModalEl.addEventListener('hidden.bs.modal', (event): void => {
      this.oRouter.navigate(['/admin/comentario/view', data])
    })
    this.myModal.show()
  }

  CampoNoValido(campo: string) {
    return (
      this.oForm.controls[campo].errors &&
      this.oForm.controls[campo].touched
    );
  }

  touched( campo: string ): boolean{
    return this.oForm.controls[campo].touched
  }

  removeOne(id: string) {
    this.oComentarioService.removeOne(parseInt(id)).subscribe({
      next: (data: number) => {
        this.getPageComentario();
        this.msg = "Se ha eliminado el comentario con el id " + id;
        const myModal = new bootstrap.Modal('#removeInfo', {
          keyboard: false
        })
        myModal.show();        
        this.oLocation.back();
      }
    })
  }










}
