import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comentario } from 'src/app/model/comentario.interface';
import { ComentarioService } from 'src/app/service/Comentario.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ComentarioViewAdmin',
  templateUrl: './ComentarioViewAdmin.component.html',
  styleUrls: ['./ComentarioViewAdmin.component.css']
})
export class ComentarioViewAdminComponent implements OnInit {

  id:number = 0;
  comentario: Comentario = null;


  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oComentarioService: ComentarioService,
    public oLocation: Location
  ) {
    this.id = oActivatedRoute.snapshot.params['id'];
   }

  ngOnInit():void {
    this.oComentarioService.getOne(this.id)
    .subscribe({
      next: (resp: Comentario) => {
        console.log(resp)
        this.comentario = resp;
        
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })
  }
  

}
