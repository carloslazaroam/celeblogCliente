import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tipousuario } from 'src/app/model/generic';
import { User, User2Form, User2Send } from 'src/app/model/user.interface';
import { UserService } from 'src/app/service/User.service';
import { TipousuarioService } from 'src/app/service/tipousuario.service';
import { Location } from '@angular/common';
declare let bootstrap: any;

@Component({
  selector: 'app-UserEdit',
  templateUrl: './UserEdit.component.html',
  styleUrls: ['./UserEdit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;
  tipousuario!: Tipousuario[];
 id: number = 0;
  oForm = this.oFormBuilder.group({
    id: ['', [Validators.required]],
    nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    apellidos: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    email: ['', [Validators.required, Validators.email  ]],
    usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    tipousuario: ['', [Validators.required]]
  });
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";


  constructor(
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    private oUserService: UserService,
    private oFormBuilder: FormBuilder,
    private oTipousuarioService: TipousuarioService,
    public oLocation: Location
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
   }

  ngOnInit() {
    this.getOne()
    this.getTipoUsuario();
  }

  getOne() {
    this.oUserService.getOne(this.id).subscribe({
      next: (data: User) => {
        this.user = data;
        console.log(data);
        this.user = data;
        this.oForm.setValue({
          id: data.id,
          nombre: data.apellidos,
          apellidos: data.apellidos,
          email: data.email,
          usuario: data.usuario,
          tipousuario: data.tipousuario.id
        });
      }
    })
  }

  getTipoUsuario(){
    this.oTipousuarioService.getPageTipousuario()
    .subscribe({
      next: (resp: Tipousuario[]) => {
        this.tipousuario = resp;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }
  onSubmit() {
    if (this.oForm.valid) {
      const user = {
        id: this.oForm.value.id,
        nombre: this.oForm.value.apellidos,
        apellidos: this.oForm.value.apellidos,
        email: this.oForm.value.email,
        usuario: this.oForm.value.usuario,
        id_tipousuario: this.oForm.value.tipousuario
      }
      this.oUserService.updateOne(user).subscribe({
        next: (data: number) => {

          //open bootstrap modal here
          this.modalTitle = "Cambios realizados";
          this.modalContent = "El usuario " + data + " ha sido actualizado";
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
      this.oRouter.navigate(['/admin/user/view', this.id])
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
