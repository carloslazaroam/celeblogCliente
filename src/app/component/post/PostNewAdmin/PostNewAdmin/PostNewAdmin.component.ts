import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/service/Post.service';
import { Location } from '@angular/common';
import { Post } from 'src/app/model/post.interface';
declare let bootstrap: any;

@Component({
  selector: 'app-PostNewAdmin',
  templateUrl: './PostNewAdmin.component.html',
  styleUrls: ['./PostNewAdmin.component.css']
})
export class PostNewAdminComponent implements OnInit {

  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";
  oForm: FormGroup =  this.oFormBuilder.group({
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
    contenido: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(255)]],
    datetime: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(255)]],
    usuario: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(255)]]
  });

  constructor(
    private oRouter: Router,
    private oPostService: PostService,
    private oFormBuilder: FormBuilder,
    public oLocation: Location,
  ) { }

  ngOnInit() {
    console.log(this.oForm)
  }
  post: Post;


  onSubmit() {
    console.log(this.oForm.value)
    if (this.oForm.valid) {
      let form = new FormData();
      form.append('title', this.oForm.value.title);
      form.append('contenido', this.oForm.value.contenido);
      form.append('datetime', this.oForm.value.datetime);
      form.append('usuario', this.oForm.value.usuario);
      
      

      this.oPostService.newOne(form).subscribe({
        next: (data: number) => {
          console.log(data)
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
