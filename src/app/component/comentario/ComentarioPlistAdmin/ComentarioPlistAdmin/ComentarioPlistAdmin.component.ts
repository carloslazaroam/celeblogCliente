import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ComentarioResponse } from 'src/app/model/comentario.interface';
import { ComentarioService } from 'src/app/service/Comentario.service';

@Component({
  selector: 'app-ComentarioPlistAdmin',
  templateUrl: './ComentarioPlistAdmin.component.html',
  styleUrls: ['./ComentarioPlistAdmin.component.css']
})
export class ComentarioPlistAdminComponent implements OnInit {

  responseFromServer: ComentarioResponse;

  strTermFilter: string = "";
  numberOfElements: number = 5;
  page: number = 0;
  totalPages: number = 0;
  sortField: string = "";
  sortDirection: string = "";
  generated: number;
  generados: boolean = false;
  msg: string = "";


  constructor(
    private oComentarioService: ComentarioService,
  ) { }

  ngOnInit() {
    this.getPage();
  }
  getPage() {
    this.oComentarioService.getComentarioPlist(this.page, this.numberOfElements, this.strTermFilter, this.sortField, this.sortDirection)
      .subscribe({
        next: (resp: ComentarioResponse) => {
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

}
