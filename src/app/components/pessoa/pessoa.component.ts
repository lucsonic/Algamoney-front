import { AppComponent } from './../../app.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent {

  pessoas: Array<any>;

 constructor(private app: AppComponent) {
    this.pessoas = app.pessoas;
  }

}
