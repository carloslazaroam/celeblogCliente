import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/service/Post.service';
import { Location } from '@angular/common';
import { Post } from 'src/app/model/post.interface';
import { User, UserResponse } from 'src/app/model/user.interface';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/service/User.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoriaService } from 'src/app/service/categoria.service';
import { Categoria, CategoriaResponse } from 'src/app/model/categoria';
declare let bootstrap: any;

@Component({
  selector: 'app-PostNewAdmin',
  templateUrl: './PostNewAdmin.component.html',
  styleUrls: ['./PostNewAdmin.component.css']
})
export class PostNewAdminComponent implements OnInit {

  oForm: FormGroup;
  usuario!: Observable<UserResponse>;
  categoria: Observable<CategoriaResponse>
 
  // modal
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";
  nowDate = new Date().toUTCString();
  users: User[];
  categorias: Categoria[]


  constructor(
    private oRouter: Router,
    private oPostService: PostService,
    private oFormBuilder: FormBuilder,
    private oCategoriaService: CategoriaService,
    public oLocation: Location,
    private oUserService: UserService,

  ) { }

  ngOnInit() {
    this.getUserPage();
    this.getCategoriaPage();
    this.oForm = this.oFormBuilder.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)  ]],
      contenido: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      id_usuario: [, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      file: ['',[Validators.required]],
      images: [''],
      id_categoria: ['', [Validators.required]],
      folder: ['postimages', [Validators.required]]
      
    });
  }
  post: Post;

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


  onSubmit() {
    console.log(this.oForm.value)
    if (this.oForm.valid) {
      let form = new FormData();
      form.append('title', this.oForm.value.title);
      form.append('contenido', this.oForm.value.contenido);
      form.append('id_usuario', this.oForm.value.id_usuario);
      form.append('id_categoria', this.oForm.value.id_categoria);
      form.append('folder', 'postimages');
      form.append('image', this.oForm.value.images);

      this.oPostService.newOne(form).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle = "Cambios realizados";
          this.modalContent = "El usuario " + data + " ha sido creado.";
          this.showModal(data);
        }
      });
    } else {
      this.oForm.markAllAsTouched();
    }
  }

  loadFile( e: any){
    console.log(e.target.files[0]);
    this.oForm.patchValue({
      images: e.target.files[0]
    });
  }

  showModal = (data) => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.mimodal), { //pasar el myModal como parametro
      keyboard: false
    })
    var myModalEl = document.getElementById(this.mimodal);
    myModalEl.addEventListener('hidden.bs.modal', (event): void => {
      this.oRouter.navigate(['/admin/post/view', data])
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
