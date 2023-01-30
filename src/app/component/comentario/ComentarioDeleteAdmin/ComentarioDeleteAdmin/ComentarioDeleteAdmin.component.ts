import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComentarioService } from 'src/app/service/Comentario.service';
import { Location } from '@angular/common';
declare let bootstrap: any;

@Component({
  selector: 'app-ComentarioDeleteAdmin',
  templateUrl: './ComentarioDeleteAdmin.component.html',
  styleUrls: ['./ComentarioDeleteAdmin.component.css']
})
export class ComentarioDeleteAdminComponent implements OnInit {

  id: number = 0;
  msg: string = "";


  constructor(
    protected oLocation: Location,
    private oActivatedRoute: ActivatedRoute,
    private oComentarioService: ComentarioService,
  ) { 
    this.id = oActivatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
  }
  removeOne() {
    this.oComentarioService.removeOne(this.id).subscribe({
      next: (data: number) => {
        this.msg = "Se ha eliminado el comentario con el id " + this.id;
        const myModal = new bootstrap.Modal('#removeInfo', {
          keyboard: false
        })
        myModal.show();        
        this.oLocation.back();
      }
    })
  }

}
