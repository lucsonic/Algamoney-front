import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { StorageService } from 'src/app/services/api/storage.service';
import { ApiLogin } from 'src/app/services/api.login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: any;
  password: any;
  usuario: any;
  frm: FormGroup;

  constructor
    (private apiService: ApiLogin,
      private toastr: ToastrService,
      private router: Router,
      private storageService: StorageService
    ) {
    this.frm = new FormGroup({
      login: new FormControl(''),
      password: new FormControl('')
    })
  }

  autenticar() {
    this.login = this.frm.controls['login'].value;
    this.password = this.frm.controls['password'].value;

    if (this.login == '' || this.password == '') {
      this.toastr.error('Os campos "Usuário" e "Senha" são obrigatórios!', '');
      return;
    } else {
      this.validaCredenciais(this.login, this.password)
    }
  }

  validaCredenciais(login: string, password: string) {
    this.apiService.validarSenha(login, password).subscribe(resp => {
      if (resp) {
        this.usuario = resp
        this.storageService.setDadosGlobais(resp)
        this.router.navigate(['home'])
      } else {
        this.toastr.error('Credenciais inválidas!', '');
      }
    });
  }
}
