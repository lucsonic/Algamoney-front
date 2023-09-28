import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { API_PATH } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ApiLogin {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    deslogar() {
        localStorage.clear();
        this.router.navigate(['login']);
    }

    get obterUsuarioLogado(): any {
        return localStorage.getItem('usuario')
            ? JSON.parse(atob(localStorage.getItem('usuario')!))
            : null;
    }

    get logado(): boolean {
        return localStorage.getItem('usuario') ? true : false;
    }

    validarSenha(login: string, password: string) {
        return this.http.post(`${API_PATH}usuarios/autentica`, { 'login': login, 'password': password });
    }
}