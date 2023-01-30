import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Comentario, ComentarioResponse } from "../model/comentario.interface";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ComentarioService {

    private entityURL = '/comentario';
    url: string = ""

    constructor(
        private oHttp: HttpClient
    ) {
        this.url = `${environment.baseURL}${this.entityURL}`;
    }

    getComentarioPlist(page: number, size: number, termino: string, strSortField: string, strOrderDirection: string ): Observable<ComentarioResponse> {
        let params = new HttpParams()
          .set("contenido", termino)
          .set("page", page)
          .set("size", size);
    
          if (strSortField != "") { //&sort=codigo,[asc|desc]
            if (strOrderDirection != "") {
              params = params.set("sort", strSortField + "," + strOrderDirection);
            } else {
              params = params.set("sort", strSortField);
            }
          }
          const headers = {
            'content-type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem("token")?.replaceAll('"', '')}`,
          }
        return this.oHttp.get<ComentarioResponse>(`${this.url}/all`, {headers, params: params });
      }

      getOne(id: number): Observable<Comentario> {
        const headers = {
          'content-type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem("token")?.replaceAll('"', '')}`,
        }
        return this.oHttp.get<Comentario>(this.url + "/" + id, {headers});
      }

      removeOne(id: number): Observable<number> {
        const headers = {
          'content-type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem("token")?.replaceAll('"', '')}`,
        }
        return this.oHttp.delete<number>(this.url + '/' + id, {headers});
      }

}
