import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiCategoria } from 'src/app/services/api.categoria';

export interface Categoria {
  codigo: number,
  nome: string
}

@Component({
  selector: 'app-cadastro-categoria',
  templateUrl: './cadastro-categoria.component.html',
  styleUrls: ['./cadastro-categoria.component.css']
})
export class CadastroCategoriaComponent {

  categoria: any;
  codigo: any;
  frm: FormGroup;
  titulo: any;

  constructor
    (private apiService: ApiCategoria,
      private router: Router,
      private toastr: ToastrService,
      private route: ActivatedRoute
    ) {
    this.categoria = {};
    this.codigo = this.route.snapshot.params["codigo"];
    this.titulo = !this.codigo ? "Cadastro de Categorias" : "Alteração de Categoria";
    this.frm = new FormGroup({
      nome: new FormControl('')
    })
    this.loadCategoria()
  }

  loadCategoria() {
    if (!this.codigo) {
      return
    }
    const categoria = { codigo: this.codigo }
    this.apiService.findCategoria(categoria).subscribe(r => {
      this.frm.controls['nome'].setValue(r.nome)
    })
  }

  criar() {
    const categoria = { nome: this.frm.controls['nome'].value }

    this.apiService.buscaCategoriaNome(categoria.nome).subscribe(resp => {
      if (resp) {
        this.toastr.info('Já existe uma categoria cadastrada com este nome!', "Atenção!");
      } else {
        this.apiService.criarCategoria(categoria).subscribe(response => {
          this.router.navigate(['categorias']);
          this.toastr.success('Categoria cadastrada com sucesso!', 'Sucesso!');
        })
      }
    })
  }

  alterar() {
    const categoria = {
      codigo: this.codigo,
      nome: this.frm.controls['nome'].value
    }
    this.apiService.alterarCategoria(categoria).subscribe(response => {
      this.router.navigate(['categorias']);
      this.toastr.success('Categoria alterada com sucesso!', 'Sucesso!');
    })
  }

  salvar() {
    this.codigo ? this.alterar() : this.criar();
  }
}
