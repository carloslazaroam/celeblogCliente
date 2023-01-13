import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tipousuario } from '../model/generic';

@Injectable({
  providedIn: 'root'
})
export class TipousuarioService {
  private entityURL = '/tipousuario';
  constructor(private oHttp: HttpClient) { }

  getPageTipousuario(): Observable<Tipousuario[]>{
    const url = `${environment.baseURL}${this.entityURL}/all`;
    const headers = {
      'content-type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("token")?.replaceAll('"', '')}`,
    }
    return this.oHttp.get<Tipousuario[]>(url, {headers});
  }
}
