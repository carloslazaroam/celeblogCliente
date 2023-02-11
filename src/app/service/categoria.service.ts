import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CategoriaResponse } from "../model/categoria";

@Injectable({
    providedIn: 'root'
  })
  export class CategoriaService {
  
    private entityURL = '/categoria';
    url: string = ""

    constructor(
        private oHttp: HttpClient
      ) { 
        this.url = `${environment.baseURL}${this.entityURL}`;
      }

      getCategoriaPlist(page: number, size: number, termino: string, strSortField: string, strOrderDirection: string, tipocategoria?: number ): Observable<CategoriaResponse> {
        let params = new HttpParams()
          .set("nombre", termino)
          .set("page", page)
          .set("size", size);
    
          if (strSortField != "") { //&sort=codigo,[asc|desc]
            params = params.set("sort", strSortField);
            if (strOrderDirection != "") {
              params = params.set("direction", strOrderDirection);
            }
          }

          if (tipocategoria){
            params = params.set("tipocategoria" , tipocategoria)
          }
          const headers = {
            'content-type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem("token")?.replaceAll('"', '')}`,
          }
        return this.oHttp.get<CategoriaResponse>(`${this.url}/all`, {headers, params: params });
      }

      removeOne(id: number): Observable<number> {
        const headers = {
          'content-type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem("token")?.replaceAll('"', '')}`,
        }
        return this.oHttp.delete<number>(this.url + '/' + id, {headers});
      }

      newOne(categoria: any): Observable<number> { 
        const headers = {
          'content-type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem("token")?.replaceAll('"', '')}`,
        }  
        return this.oHttp.post<number>(this.url, JSON.stringify(categoria), {headers});
      }

  }
  