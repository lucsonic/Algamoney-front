import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { API_PATH } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ApiCliente {
    constructor(
        private http: HttpClient
    ) { }

    listAllPessoas(): Observable<any> {
        return this.http.get<any>(`${API_PATH}pessoas`);
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
}