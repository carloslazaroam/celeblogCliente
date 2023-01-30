import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, User2Form, User2Send } from 'src/app/model/user.interface';
import { UserService } from 'src/app/service/User.service';
import { TipousuarioService } from 'src/app/service/tipousuario.service';
import { Tipousuario } from 'src/app/model/generic';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { read } from '@popperjs/core';
declare let bootstrap: any;


@Component({
  selector: 'app-UserNew',
  templateUrl: './UserNew.component.html',
  styleUrls: ['./UserNew.component.css']
})
export class UserNewComponent implements OnInit {
  public previsualizacion: string
  public archivos: any = []

  oForm: FormGroup;
  tipousuario!: Tipousuario[];
 
  // modal
  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";


  constructor(
    private oRouter: Router,
    private oUserService: UserService,
    private oFormBuilder: FormBuilder,
    private oTipousuarioService: TipousuarioService,
    public oLocation: Location,
   
   
  ) { }

  ngOnInit() {

    this.getTipoUsuario();
    this.oForm = this.oFormBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      apellidos: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email  ]],
      usuario: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      file: ['',[Validators.required]],
      images: [''],
      id_tipousuario: ['', [Validators.required]],
      folder: ['Perfiles', [Validators.required]]
    });

    
  }
  user: User;

  onSubmit() {
    console.log(this.oForm.value)
    if (this.oForm.valid) {
      let form = new FormData();
      form.append('nombre', this.oForm.value.nombre);
      form.append('apellidos', this.oForm.value.apellidos);
      form.append('email', this.oForm.value.email);
      form.append('usuario', this.oForm.value.usuario);
      form.append('password', this.oForm.value.password);
      form.append('id_tipousuario', this.oForm.value.id_tipousuario);
      form.append('folder', 'Perfiles');
      form.append('image', this.oForm.value.images);

      this.oUserService.newOne(form).subscribe({
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

  showModal = (data) => {
    this.myModal = new bootstrap.Modal(document.getElementById(this.mimodal), { //pasar el myModal como parametro
      keyboard: false
    })
    var myModalEl = document.getElementById(this.mimodal);
    myModalEl.addEventListener('hidden.bs.modal', (event): void => {
      this.oRouter.navigate(['/admin/user/view', data])
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

 /* capturarFile(event): any {
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((images: any) => {
      this.previsualizacion = images.base;
      console.log(images)
    })
    this.archivos.push(archivoCapturado)
  }

  extraerBase64 = async ($event: any) => new Promise((resolve,reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          blob: $event,
          image,
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          blob: $event,
          image,
          base: null
        });
      };
    } catch (e) {
      return null;
    }
  })
  */
 

}

  