import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { API_URL, environment, httpOptions } from 'src/environments/environment';
import { Post, PostResponse } from '../model/post.interface';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    private entityURL = '/post';
    url: string = ""

    constructor(
        private oHttp: HttpClient
    ) {
        this.url = `${environment.baseURL}${this.entityURL}`;
    }

    getPostPlist(page: number, size: number, termino: string, strSortField: string, strOrderDirection: string, id_user?: number,id_categoria?: number ): Observable<PostResponse> {
        let params = new HttpParams()
          .set("title", termino)
          .set("page", page)
          
          .set("size", size);
    
          if (strSortField != "") { //&sort=codigo,[asc|desc]
            params = params.set("sort", strSortField);
            if (strOrderDirection != "") {
              params = params.set("direction", strOrderDirection);
            }
          }
          if (id_user){
            params = params.set("id_user", id_user)
          }

          if (id_categoria){
            params = params.set("id_categoria", id_categoria)
          }
          const headers = {
            'content-type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem("token")?.replaceAll('"', '')}`,
          }
        return this.oHttp.get<PostResponse>(`${this.url}/all`, {headers, params: params });
      }

      getOne(id: number): Observable<Post> {
        const headers = {
          'content-type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem("token")?.replaceAll('"', '')}`,
        }
        return this.oHttp.get<Post>(this.url + "/" + id, {headers});
      }

      newOne(post: any): Observable<number> { 
        const headers = {
          'Authorization': `Bearer ${sessionStorage.getItem("token")?.replaceAll('"', '')}`,
        }  
        return this.oHttp.post<number>(this.url, post, {headers});
      }

      updateOne(post: Post): Observable<number> {
        const headers = {
          'content-type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem("token")?.replaceAll('"', '')}`,
        }
        const body = JSON.stringify(post);
        return this.oHttp.put<number>(this.url, body, {headers});
      }

      removeOne(id: number): Observable<number> {
        const headers = {
          'content-type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem("token")?.replaceAll('"', '')}`,
        }
        return this.oHttp.delete<number>(this.url + '/' + id, {headers});
      }

      

    


}
