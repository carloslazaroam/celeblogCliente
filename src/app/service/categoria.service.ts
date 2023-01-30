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

      getCategoriaPlist(page: number, size: number, termino: string, strSortField: string, strOrderDirection: string ): Observable<CategoriaResponse> {
        let params = new HttpParams()
          .set("nombre", termino)
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
        return this.oHttp.get<CategoriaResponse>(`${this.url}/all`, {headers, params: params });
      }

  }
  