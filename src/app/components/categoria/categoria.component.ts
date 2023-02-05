import { AppComponent } from './../../app.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {

  categorias: Array<any>;

  constructor(private app: AppComponent) {
    this.categorias = app.categorias;
  }
}
