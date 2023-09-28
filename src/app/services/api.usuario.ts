import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { API_PATH } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ApiUsuario {
    constructor(
        private http: HttpClient
    ) { }

    listAllUsuarios(): Observable<any> {
        return this.http.get<any>(`${API_PATH}usuarios`);
    }

    criarUsuario(usuario: any) {
        return this.http.post(`${API_PATH}usuarios`, usuario);
    }

    excluirUsuario(usuario: any) {
        return this.http.delete(`${API_PATH}usuarios/${usuario.codigo}`, usuario);
    }

    findUsuario(usuario: any): Observable<any> {
        return this.http.get<any>(`${API_PATH}usuarios/${usuario.codigo}`, usuario);
    }

    alterarUsuario(usuario: any) {
        return this.http.put(`${API_PATH}usuarios/${usuario.codigo}`, usuario);
    }

    buscaUsuarioaLogin(login: string) {
        return this.http.post(`${API_PATH}usuarios/buscalogin`, { 'login': login });
    }

    buscaUsuarioaCpf(cpf: string) {
        return this.http.post(`${API_PATH}usuarios/buscacpf`, { 'cpf': cpf });
    }
}