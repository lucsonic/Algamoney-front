import { Component } from '@angular/core';
import { ApiLogin } from 'src/app/services/api.login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  usuario: any = '';

  constructor(
    private apiService: ApiLogin
  ) {
    this.usuario = apiService.obterUsuarioLogado
  }

  deslogar() {
    this.apiService.deslogar();
  }
}
