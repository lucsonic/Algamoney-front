import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { API_PATH } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ApiCategoria {
    constructor(
        private http: HttpClient
    ) { }

    listAllCategorias(): Observable<any> {
        return this.http.get<any>(`${API_PATH}categorias`);
    }

    findCategoria(categoria: any): Observable<any> {
        return this.http.get<any>(`${API_PATH}categorias/${categoria.codigo}`, categoria);
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

    buscaCategoriaNome(nome: string) {
        return this.http.post(`${API_PATH}categorias/buscanome`, { 'nome': nome });
    }
}