import { Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/model/comentario.interface';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/service/Post.service';
import { Post, PostResponse } from 'src/app/model/post.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserResponse } from 'src/app/model/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ComentarioService } from 'src/app/service/Comentario.service';
import { UserService } from 'src/app/service/User.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
declare let bootstrap: any;

@Component({
  selector: 'app-ComentarioEditAdmin',
  templateUrl: './ComentarioEditAdmin.component.html',
  styleUrls: ['./ComentarioEditAdmin.component.css']
})
export class ComentarioEditAdminComponent implements OnInit {

  constructor(
    private oRouter: Router,
    private oComentarioService: ComentarioService,
    private oFormBuilder: FormBuilder,
    private oUserService: UserService,
    public oLocation: Location,
    private oPostService: PostService,
    private oActivatedRoute: ActivatedRoute,
    ) { 
      this.id = oActivatedRoute.snapshot.params['id'];
    }

  oForm: FormGroup;
  usuario!: Observable<UserResponse>;
 
  // modal
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";
  nowDate = new Date().toUTCString();
  user: User;
  posts: Post[];
  id!: number;
  comentario: Comentario


  ngOnInit() {
    this.getComment();
    this.oForm = this.oFormBuilder.group({
      id: [, Validators.required],
      contenido: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    });
  }

  

  getComment(){
    this.oComentarioService.getOne(this.id)
    .subscribe({
      next: (resp: Comentario) => {
        console.log(resp)
        this.comentario = resp;
        this.oForm.setValue({
          id: resp.id,
          contenido: resp.contenido
        });
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }

  onSubmit() {
    console.log(this.oForm.value)
    if (this.oForm.valid) {
      this.oComentarioService.updateOne(this.oForm.value).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle = "Cambios realizados";
          this.modalContent = "El comentario " + data + " ha sido actualizado.";
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
