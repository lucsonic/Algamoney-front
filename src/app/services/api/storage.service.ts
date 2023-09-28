import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    dadosGlobais: any;

    constructor() {
        // Inicialize os dados globais a partir do localStorage, se existirem
        // const token = localStorage.getItem('token');
        const usuarioString = localStorage.getItem('usuario');
        const usuario = usuarioString ? JSON.parse(atob(usuarioString)) : null;

        this.dadosGlobais = {
            // token,
            usuario
        };
    }

    setDadosGlobais(dados: any) {
        this.dadosGlobais = dados;

        // localStorage.setItem('token', btoa(JSON.stringify(dados.token)));

        if (dados) {
            localStorage.setItem('usuario', btoa(JSON.stringify(dados)));
        } else {
            localStorage.removeItem('usuario');
        }
    }

    getDadosGlobais() {
        return this.dadosGlobais;
    }
}