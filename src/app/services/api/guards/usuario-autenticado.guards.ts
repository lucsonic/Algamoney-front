import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiLogin } from '../../api.login';
@Injectable({
    providedIn: 'root'
})
export class UsuarioAutenticadoGuard implements CanActivate {
    constructor(
        private authService: ApiLogin,
        private router: Router) { }
    canActivate() {
        if (this.authService.logado) {
            return true;
        }
        this.router.navigate(['login']);
        return false;
    }
}