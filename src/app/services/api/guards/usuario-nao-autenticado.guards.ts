import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiLogin } from '../../api.login';
@Injectable({
    providedIn: 'root'
})
export class UsuarioNaoAutenticadoGuard implements CanActivate {
    constructor(
        private authService: ApiLogin,
        private router: Router) { }
    canActivate() {
        if (this.authService.logado) {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }
}