import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { ApiUsuario } from 'src/app/services/api.usuario';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent {
  usuario: any;
  codigo: any;
  frm: FormGroup;
  titulo: any;

  constructor
    (private apiService: ApiUsuario,
      private router: Router,
      private toastr: ToastrService,
    private route: ActivatedRoute
    ) {
    this.usuario = {};
    this.codigo = this.route.snapshot.params["codigo"];
    this.titulo = !this.codigo ? "Cadastro de Usuários" : "Alteração de Usuário";
    this.frm = new FormGroup({
      nome: new FormControl(''),
      cpf: new FormControl(''),
      login: new FormControl(''),
      password: new FormControl('')
    })
    this.loadUsuario()
  }

  loadUsuario() {
    if (!this.codigo) {
      return
    }
    const usuario = { codigo: this.codigo }
    this.apiService.findUsuario(usuario).subscribe(r => {
      this.frm.controls['nome'].setValue(r.nome),
        this.frm.controls['cpf'].setValue(r.cpf),
        this.frm.controls['login'].setValue(r.login),
        this.frm.controls['password'].setValue(r.password)
    })
  }

  criar() {
    const usuario = {
      nome: this.frm.controls['nome'].value,
      cpf: this.frm.controls['cpf'].value,
      login: this.frm.controls['login'].value,
      password: this.frm.controls['password'].value
    }

    this.apiService.buscaUsuarioaLogin(usuario.login).subscribe(respLogin => {
      this.apiService.buscaUsuarioaCpf(usuario.cpf).subscribe(respCpf => {
        if (respLogin || respCpf) {
          let campos = '';

          if (respLogin)
            campos += 'E-mail' + ', ';
          if (respCpf)
            campos += 'CPF' + ', ';

          this.toastr.info('Já existe um usuário cadastrado com estes campos na base de dados:\n[ ' + campos.substring(0, campos.length - 2) + ' ]', "Atenção!");
          return;
        } else {
          this.apiService.criarUsuario(usuario).subscribe(response => {
            this.router.navigate(['usuarios']);
            this.toastr.success('Usuário cadastrado com sucesso!', 'Sucesso!');
          })
        }
      })
    })
  }

  alterar() {
    const usuario = {
      codigo: this.codigo,
      nome: this.frm.controls['nome'].value,
      cpf: this.frm.controls['cpf'].value,
      login: this.frm.controls['login'].value,
      password: this.frm.controls['password'].value
    }
    this.apiService.alterarUsuario(usuario).subscribe(response => {
      this.router.navigate(['usuarios']);
      this.toastr.success('Usuário alterado com sucesso!', 'Sucesso!');
    })
  }

  salvar() {
    this.codigo ? this.alterar() : this.criar();
  }
}
