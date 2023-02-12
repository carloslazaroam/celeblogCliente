import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/post.interface';
import { User, UserResponse } from 'src/app/model/user.interface';
import { PostService } from 'src/app/service/Post.service';
import { UserService } from 'src/app/service/User.service';
import { Location } from '@angular/common';
import { Categoria, CategoriaResponse } from 'src/app/model/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';
declare let bootstrap: any;

@Component({
  selector: 'app-PostEditUser',
  templateUrl: './PostEditUser.component.html',
  styleUrls: ['./PostEditUser.component.css']
})
export class PostEditUserComponent implements OnInit {

  constructor(
    private oRouter: Router,
    private oPostService: PostService,
    private oFormBuilder: FormBuilder,
    private oUserService: UserService,
    public oLocation: Location,
    private oActivatedRoute: ActivatedRoute,
    private oCategoriaService: CategoriaService
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
   }

   oForm: FormGroup;
   usuario!: Observable<UserResponse>;
 
   mimodal: string = "miModal";
   myModal: any;
   modalTitle: string = "";
   modalContent: string = "";
   nowDate = new Date().toUTCString();
   user: User;
   posts: Post[];
   id!: number;
   post: Post;
   categoria: Observable<CategoriaResponse>
   categorias: Categoria[]

  ngOnInit() {
    this.getCategoriaPage();
    this.getPost();
    this.oForm = this.oFormBuilder.group({
      id: [, Validators.required],
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      contenido: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      
    });
  }

  getPost(){
    this.oPostService.getOne(this.id)
    .subscribe({
      next: (resp: Post) => {
        console.log(resp)
        this.post = resp;
        this.oForm.setValue({
          id: resp.id,
          title: resp.title,
          contenido: resp.contenido,
         
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
      this.oPostService.updateOne(this.oForm.value).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle = "Cambios realizados";
          this.modalContent = "El post " + data + " ha sido actualizado.";
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

  getCategoriaPage(){
    this.oCategoriaService.getCategoriaPlist(0, 999, '', '', '')
    .subscribe({
      next: (resp: CategoriaResponse) => {
        this.categorias = resp.content;
        console.log(this.categorias);
        
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }


}
