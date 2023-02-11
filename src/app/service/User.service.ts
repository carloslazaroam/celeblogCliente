import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { API_URL, environment, httpOptions } from 'src/environments/environment';
import { User, User2Send, IPage, UserResponse } from '../model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private entityURL = '/usuario';
  url: string = ""

  constructor(
    private oHttp: HttpClient
  ) { 
    this.url = `${environment.baseURL}${this.entityURL}`;
  }

  getUserPlist(page: number, size: number, termino: string, strSortField: string, strOrderDirection: string ): Observable<UserResponse> {
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
      const headers = {
        'content-type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem("token")?.replaceAll('"', '')}`,
      }
    return this.oHttp.get<UserResponse>(`${this.url}/all`, {headers, params: params });
  }

  getOne(id: number): Observable<User> {
    const headers = {
      'content-type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("token")?.replaceAll('"', '')}`,
    }
    return this.oHttp.get<User>(this.url + "/" + id, {headers});
  }
  removeOne(id: number): Observable<number> {
    const headers = {
      'content-type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("token")?.replaceAll('"', '')}`,
    }
    return this.oHttp.delete<number>(this.url + '/' + id, {headers});
  }
  updateOne(user: User): Observable<number> {
    const headers = {
      'content-type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem("token")?.replaceAll('"', '')}`,
    }
    const body = JSON.stringify(user);
    return this.oHttp.put<number>(this.url, body, {headers});
  }

  newOne(user: any): Observable<number> { 
    const headers = {
      'Authorization': `Bearer ${sessionStorage.getItem("token")?.replaceAll('"', '')}`,
    }  
    return this.oHttp.post<number>(this.url, user, {headers});
  }

  generateUsuario(cantidad: number): Observable<number> {
    return this.oHttp.post<number>(this.url+'/generate/' + cantidad, {withCredentials:true});
   }

}
