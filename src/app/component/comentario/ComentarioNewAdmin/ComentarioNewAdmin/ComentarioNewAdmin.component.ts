import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { read } from '@popperjs/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserResponse } from 'src/app/model/user.interface';
import { Router } from '@angular/router';
import { ComentarioService } from 'src/app/service/Comentario.service';
import { UserService } from 'src/app/service/User.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Comentario } from 'src/app/model/comentario.interface';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/service/Post.service';
import { Post, PostResponse } from 'src/app/model/post.interface';
declare let bootstrap: any;


@Component({
  selector: 'app-ComentarioNewAdmin',
  templateUrl: './ComentarioNewAdmin.component.html',
  styleUrls: ['./ComentarioNewAdmin.component.css']
})
export class ComentarioNewAdminComponent implements OnInit {

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


  constructor(
    private oRouter: Router,
    private oComentarioService: ComentarioService,
    private oFormBuilder: FormBuilder,
    private oUserService: UserService,
    public oLocation: Location,
    private oPostService: PostService
  ) { }

  ngOnInit() {
    this.getUserPage();
    this.oForm = this.oFormBuilder.group({
      contenido: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      id_usuario: [, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      id_post: [, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    });
  }
  comentario: Comentario

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

  getUserPost(){
    this.oPostService.getPostPlist(0, 9999, '', '', '', this.oForm.value.id_usuario)
    .subscribe({
      next: (resp: PostResponse) => {
        this.posts= resp.content;
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
          this.modalTitle = "Cambios realizados";
          this.modalContent = "El comentario " + data + " ha sido creado.";
          this.showModal(data);
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



}
