import { ApiService } from './../../Api/api.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {

  constructor(private apiService: ApiService) {
    this.categorias = [];
    this.listarAllCategorias();
  }

  categorias: Array<any>;

  listarAllCategorias() {
    this.apiService.listAllCategorias().subscribe(dados => {
      this.categorias = dados.content
    });
  }

  displayedColumns: string[] = ['codigo', 'nome'];
}
