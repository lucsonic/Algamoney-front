import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/Api/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent {

  usuario: any;
  codigo: any;
  frm: FormGroup;

  constructor
    (private apiService: ApiService,
      private router: Router,
      private toastr: ToastrService,
      private route: ActivatedRoute
    ) {
    this.usuario = {};
    this.codigo = this.route.snapshot.params["codigo"];
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

    this.apiService.criarUsuario(usuario).subscribe(response => {
      this.router.navigate(['usuarios']);
      this.toastr.success('Usuário cadastrado com sucesso!', 'Sucesso!');
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
