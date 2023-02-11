import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/service/categoria.service';
import { Location } from '@angular/common';
declare let bootstrap: any;

@Component({
  selector: 'app-CategoriaDeleteAdmin',
  templateUrl: './CategoriaDeleteAdmin.component.html',
  styleUrls: ['./CategoriaDeleteAdmin.component.css']
})
export class CategoriaDeleteAdminComponent implements OnInit {

  id: number = 0;
  msg: string = "";


  constructor(
    protected oLocation: Location,
    private oActivatedRoute: ActivatedRoute,
    private oCategoriaService: CategoriaService,
  ) { 
    this.id = oActivatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
  }

  removeOne() {
    this.oCategoriaService.removeOne(this.id).subscribe({
      next: (data: number) => {
        this.msg = "Se ha eliminado el usuario con id " + this.id;
        const myModal = new bootstrap.Modal('#removeInfo', {
          keyboard: false
        })
        myModal.show();        
        this.oLocation.back();
      }
    })
  }

}
