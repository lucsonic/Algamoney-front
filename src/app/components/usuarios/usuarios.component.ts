import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../../Api/api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {

  constructor(private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog) {
    this.usuarios = [];
    this.listarAllUsuarios();
  }

  usuarios: Array<any>;

  listarAllUsuarios() {
    this.apiService.listAllUsuarios().subscribe(dados => {
      this.usuarios = dados
    });
  }

  editarUsuario(element: any) {
    let item = element;
    this.router.navigate([`/editar-usuario/${item}`], {
      relativeTo: this.route
    });
  }

  excluirUsuario(element: any) {
    const usuario = {
      codigo: element
    }
    this.apiService.excluirUsuario(usuario).subscribe(response => {
      window.location.reload()
      this.toastr.success('Usuário excluído com sucesso!', 'Sucesso!');
    })
  }

  excluir(codigo: number): void {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      width: '650px',
      data: {
        message: 'Deseja relamente excluir o usuário?',
        title: 'Exclusão de Usuário'
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (!result?.confirm) {
        return
      }
      this.excluirUsuario(codigo)
    })
  }

  displayedColumns: string[] = ['codigo', 'nome', 'cpf', 'login', 'acao'];

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
}
