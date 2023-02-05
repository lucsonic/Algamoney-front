import { ApiService } from './Api/api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'algamoney-font';

  constructor(private apiService: ApiService) {
    this.categorias = [];
    this.pessoas = [];
  }

  categorias: Array<any>;
  pessoas: Array<any>;

  listarAllCategorias() {
    this.apiService.listAllCategorias().subscribe(dados => {
      this.categorias = dados.content
    });
  }

  listarAllPessoas() {
    this.apiService.listAllPessoas().subscribe(dados => {
      this.pessoas = dados.content
    });
  }
}
