import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tipousuario } from '../model/generic';
import { Tipocategoria } from '../model/tipocategoria';

@Injectable({
  providedIn: 'root'
})
export class TipocategoriaService {
  private entityURL = '/tipousuario';
  constructor(private oHttp: HttpClient) { }

  getPageTipousuario(): Observable<Tipocategoria[]>{
    const url = `${environment.baseURL}${this.entityURL}/all`;
    const headers = {
      'content-type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("token")?.replaceAll('"', '')}`,
    }
    return this.oHttp.get<Tipocategoria[]>(url, {headers});
  }
}
