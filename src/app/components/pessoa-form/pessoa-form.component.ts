import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiCliente } from 'src/app/services/api.cliente';
import { ApiService } from 'src/app/services/api.service';

export interface Pessoa {
  codigo: number,
  nome: string,
  logradouro: string,
  ativo: boolean,
  numero: string,
  complemento: string,
  bairro: string,
  cep: string,
  cidade: string,
  estado: string
}

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css']
})
export class PessoaFormComponent {

  pessoa: any;
  codigo: any;
  frm: FormGroup;
  titulo: any;

  constructor
    (private apiService: ApiService,
    private apiCliente: ApiCliente,
      private router: Router,
      private toastr: ToastrService,
      private route: ActivatedRoute
    ) {
    this.pessoa = {};
    this.codigo = this.route.snapshot.params["codigo"];
    this.titulo = !this.codigo ? "Cadastro de Clientes" : "Alteração de Cliente";
    this.frm = new FormGroup({
      nome: new FormControl(''),
      logradouro: new FormControl(''),
      ativo: new FormControl(''),
      numero: new FormControl(''),
      complemento: new FormControl(''),
      bairro: new FormControl(''),
      cep: new FormControl(''),
      cidade: new FormControl(''),
      estado: new FormControl('')
    })
    this.loadPessoa()
    this.loadEstados()
  }

  estados: Array<any>;

  loadPessoa() {
    if (!this.codigo) {
      return
    }
    const pessoa = { codigo: this.codigo }
    this.apiCliente.findPessoa(pessoa).subscribe(r => {
      this.frm.controls['nome'].setValue(r.nome),
      this.frm.controls['logradouro'].setValue(r.logradouro),
      this.frm.controls['ativo'].setValue(r.ativo),
      this.frm.controls['numero'].setValue(r.numero),
      this.frm.controls['complemento'].setValue(r.complemento),
      this.frm.controls['bairro'].setValue(r.bairro),
      this.frm.controls['cidade'].setValue(r.cidade),
      this.frm.controls['cep'].setValue(r.cep),
      this.frm.controls['estado'].setValue(r.estado)
    })
  }

  criar() {
    const pessoa = {
      nome: this.frm.controls['nome'].value,
      logradouro: this.frm.controls['logradouro'].value,
      ativo: this.frm.controls['ativo'].value,
      numero: this.frm.controls['numero'].value,
      complemento: this.frm.controls['complemento'].value,
      bairro: this.frm.controls['bairro'].value,
      cidade: this.frm.controls['cidade'].value,
      cep: this.frm.controls['cep'].value,
      estado: this.frm.controls['estado'].value
    }

    this.apiCliente.criarPessoa(pessoa).subscribe(response => {
      this.router.navigate(['pessoas']);
      this.toastr.success('Pessoa cadastrada com sucesso!', 'Sucesso!');
    })
  }

  alterar() {
    const pessoa = {
      codigo: this.codigo,
      nome: this.frm.controls['nome'].value,
      logradouro: this.frm.controls['logradouro'].value,
      ativo: this.frm.controls['ativo'].value,
      numero: this.frm.controls['numero'].value,
      complemento: this.frm.controls['complemento'].value,
      bairro: this.frm.controls['bairro'].value,
      cidade: this.frm.controls['cidade'].value,
      cep: this.frm.controls['cep'].value,
      estado: this.frm.controls['estado'].value
    }
    this.apiCliente.alterarPessoa(pessoa).subscribe(response => {
      this.router.navigate(['pessoas']);
      this.toastr.success('Pessoa alterada com sucesso!', 'Sucesso!');
    })
  }

  salvar() {
    this.codigo ? this.alterar() : this.criar();
  }

  loadEstados() {
    this.apiService.listAllEstados().subscribe(dados => {
      this.estados = dados
    });
  }
}
