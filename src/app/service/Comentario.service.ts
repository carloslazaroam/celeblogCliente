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

    getComentarioPlist(page: number, size: number, termino: string, strSortField: string, strOrderDirection: string, id_post?: number ): Observable<ComentarioResponse> {
        let params = new HttpParams()
          .set("contenido", termino)
          .set("page", page)
          .set("size", size);
    
          if (strSortField != "") { //&sort=codigo,[asc|desc]
            params = params.set("sort", strSortField);
            if (strOrderDirection != "") {
              params = params.set("direction", strOrderDirection);
            }
          }

          if (id_post){
            params = params.set("id_post", id_post)
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

      newOne(comentario: any): Observable<number> { 
        const headers = {
          'content-type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem("token")?.replaceAll('"', '')}`,
        }  
        return this.oHttp.post<number>(this.url, JSON.stringify(comentario), {headers});
      }

      updateOne(comentario: any): Observable<number> { 
        const headers = {
          'content-type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem("token")?.replaceAll('"', '')}`,
        }  
        return this.oHttp.put<number>(this.url, JSON.stringify(comentario), {headers});
      }

}
