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

  findCategoria(categoria: any): Observable<any> {
    return this.http.get<any>(`${API_PATH}categorias/${categoria.codigo}`, categoria);
  }

  listAllPessoas(): Observable<any> {
    return this.http.get<any>(`${API_PATH}pessoas`);
  }

  listAllUsuarios(): Observable<any> {
    return this.http.get<any>(`${API_PATH}usuarios`);
  }

  criarCategoria(categoria: any) {
    return this.http.post(`${API_PATH}categorias`, categoria);
  }

  alterarCategoria(categoria: any) {
    return this.http.put(`${API_PATH}categorias/${categoria.codigo}`, categoria);
  }

  excluirCategoria(categoria: any) {
    return this.http.delete(`${API_PATH}categorias/${categoria.codigo}`, categoria);
  }

  criarPessoa(pessoa: any) {
    return this.http.post(`${API_PATH}pessoas`, pessoa);
  }

  findPessoa(pessoa: any): Observable<any> {
    return this.http.get<any>(`${API_PATH}pessoas/${pessoa.codigo}`, pessoa);
  }

  alterarPessoa(pessoa: any) {
    return this.http.put(`${API_PATH}pessoas/${pessoa.codigo}`, pessoa);
  }

  excluirPessoa(pessoa: any) {
    return this.http.delete(`${API_PATH}pessoas/${pessoa.codigo}`, pessoa);
  }

  excluirUsuario(usuario: any) {
    return this.http.delete(`${API_PATH}usuarios/${usuario.codigo}`, usuario);
  }
}
