import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_PATH } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  listAllCategorias(): Observable<any> {
    return this.http.get<any>(`${API_PATH}categorias`);
  }

  listAllPessoas(): Observable<any> {
    return this.http.get<any>(`${API_PATH}pessoas`);
  }
}
