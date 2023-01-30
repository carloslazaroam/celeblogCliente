import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post.interface';
import { User } from 'src/app/model/user.interface';
import { PostService } from 'src/app/service/Post.service';
import { Location } from '@angular/common';
import { UserService } from 'src/app/service/User.service';
import { HttpErrorResponse } from '@angular/common/http';
declare let bootstrap: any;

@Component({
  selector: 'app-PostEditAdmin',
  templateUrl: './PostEditAdmin.component.html',
  styleUrls: ['./PostEditAdmin.component.css']
})
export class PostEditAdminComponent implements OnInit {

  post: Post;
 id: number = 0;
  oForm = this.oFormBuilder.group({
    id: ['', [Validators.required]],
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    contenido: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    datetime: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],

    
    

  });

  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";



  constructor(
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    private oPostService: PostService,
    private oFormBuilder: FormBuilder,
    public oLocation: Location,
    public oUserService: UserService
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
   }

  ngOnInit() {
    this.getOne()
  }

  getOne() {
    this.oPostService.getOne(this.id).subscribe({
      next: (data: Post) => {
        this.post = data;
        console.log(data);
        this.post = data;
        this.oForm.setValue({
          id: data.id,
          title: data.title,
          contenido: data.contenido,
          datetime: data.datetime,
          
        });
      }
    })
  }

  onSubmit() {
    if (this.oForm.valid) {
      const post = {
        id: this.oForm.value.id,
        title: this.oForm.value.title,
        contenido: this.oForm.value.contenido,
        datetime: this.oForm.value.datetime,
        
      }
      this.oPostService.updateOne(post).subscribe({
        next: (data: number) => {

          //open bootstrap modal here
          this.modalTitle = "Cambios realizados";
          this.modalContent = "El post " + post.id + " ha sido actualizado";
          this.showModal();
        }
      })
    } else {
      this.oForm.markAllAsTouched();
    }
  }

  showModal = () => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.mimodal), { //pasar el myModal como parametro
      keyboard: false
    })
    var myModalEl = document.getElementById(this.mimodal);
    myModalEl.addEventListener('hidden.bs.modal', (event): void => {
      this.oRouter.navigate(['/admin/post/view', this.id])
    })
    this.myModal.show()
  }

  openModalFindtipousuario(): void {    

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
