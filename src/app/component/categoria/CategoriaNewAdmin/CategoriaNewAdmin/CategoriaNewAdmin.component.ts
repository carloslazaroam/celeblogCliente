import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/model/categoria';
import { Tipocategoria } from 'src/app/model/tipocategoria';
import { CategoriaService } from 'src/app/service/categoria.service';
import { TipocategoriaService } from 'src/app/service/tipocategoria.service';
import { Location } from '@angular/common';
import { read } from '@popperjs/core';
declare let bootstrap: any;

@Component({
  selector: 'app-CategoriaNewAdmin',
  templateUrl: './CategoriaNewAdmin.component.html',
  styleUrls: ['./CategoriaNewAdmin.component.css']
})
export class CategoriaNewAdminComponent implements OnInit {

  oForm: FormGroup;
  tipocategoria!: Tipocategoria[];

  mimodal: string = "miModal";
  myModal: any;
  modalTitle: string = "";
  modalContent: string = "";
 

  constructor(
    private oRouter: Router,
    private oCategoriaService: CategoriaService,
    private oFormBuilder: FormBuilder,
    private oTipocategoriaService: TipocategoriaService,
    public oLocation: Location,
  ) { }

  ngOnInit() {

    this.getTipoCategoria();
    this.oForm = this.oFormBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(10)]],
      descripcion: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(255)]],
      id_tipocategoria: ['', [Validators.required]]
  
    });
  }

  categoria: Categoria;

  getTipoCategoria(){
    this.oTipocategoriaService.getPageTipocategoria()
    .subscribe({
      next: (resp: Tipocategoria[]) => {
        this.tipocategoria = resp;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }

  onSubmit() {
    console.log(this.oForm.value)
    if (this.oForm.valid) {
      this.oCategoriaService.newOne(this.oForm.value).subscribe({
        next: (data: number) => {
          //open bootstrap modal here
          this.modalTitle = "Cambios realizados";
          this.modalContent = "La categoria " + data + " ha sido creada.";
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
