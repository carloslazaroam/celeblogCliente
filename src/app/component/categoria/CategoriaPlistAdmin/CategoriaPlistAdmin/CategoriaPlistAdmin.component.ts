import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoriaResponse } from 'src/app/model/categoria';
import { CategoriaService } from 'src/app/service/categoria.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
declare let bootstrap: any;

@Component({
  selector: 'app-CategoriaPlistAdmin',
  templateUrl: './CategoriaPlistAdmin.component.html',
  styleUrls: ['./CategoriaPlistAdmin.component.css']
})
export class CategoriaPlistAdminComponent implements OnInit {

  responseFromServer: CategoriaResponse;

  strTermFilter: string = "";
  numberOfElements: number = 5;
  page: number = 0;
  totalPages: number = 0;
  sortField: string = "";
  sortDirection: string = "";
  generated: number;
  generados: boolean = false;
  msg: string = "";
  id: number = 0;
  nombre: string = "";
  tipocategoria: number = 0;
  
 


  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oCategoriaService: CategoriaService,
    protected oLocation: Location,
  ) { 
    this.id = oActivatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.getPage();
    
  }

  getPage() {
    this.oCategoriaService.getCategoriaPlist(this.page, this.numberOfElements, this.strTermFilter, this.sortField, this.sortDirection , this.tipocategoria)
      .subscribe({
        next: (resp: CategoriaResponse) => {
          console.log(resp)
          this.responseFromServer = resp;
          this.totalPages = resp.totalPages;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      })
  }

  setPage(e: number) {
    this.page = (e - 1);
    this.getPage();
  }

  setRpp(rpp: number) {
    this.numberOfElements = rpp;
    this.getPage();
  }

  setFilter(term: string): void {
    this.strTermFilter = term;
    this.page = 0;
    this.getPage();
  }

  setOrder(order: string): void {
    this.sortField = order;
    if (this.sortDirection == "asc") {
      this.sortDirection = "desc";
    } else {
      this.sortDirection = "asc";
    }
    this.getPage();
  }

  removeOne() {
    this.oCategoriaService.removeOne(this.id).subscribe({
      next: (data: number) => {
        this.msg = "Se ha eliminado la categoria " + this.id;
        const myModal = new bootstrap.Modal('#removeInfo', {
          keyboard: false
        })
        myModal.show();        
        this.oLocation.back();
      }
    })
  }

}
