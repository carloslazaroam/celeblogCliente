import { Component, OnInit } from '@angular/core';
import { TipoUsuarioResponse } from 'src/app/model/tipousuario.interface';
import { TipousuarioService } from 'src/app/service/tipousuario.service';

@Component({
  selector: 'app-TipousuarioPlistAdmin',
  templateUrl: './TipousuarioPlistAdmin.component.html',
  styleUrls: ['./TipousuarioPlistAdmin.component.css']
})
export class TipousuarioPlistAdminComponent implements OnInit {

  responseFromServer: TipoUsuarioResponse;

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
    private oTipousuarioService: TipousuarioService,
  ) { }

  ngOnInit() {
    
  }

}
