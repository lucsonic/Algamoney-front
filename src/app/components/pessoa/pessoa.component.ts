import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from './../../Api/api.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent {


  constructor(private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog) {
    this.pessoas = [];
    this.listarAllPessoas();
  }

  pessoas: Array<any>;

  listarAllPessoas() {
    this.apiService.listAllPessoas().subscribe(dados => {
      this.pessoas = dados.content
    });
  }

  editarPessoa(element: any) {
    let item = element;
    this.router.navigate([`/editar-pessoa/${item}`], {
      relativeTo: this.route
    });
  }

  excluirPessoa(element: any) {
    const pessoa = {
      codigo: element
    }
    this.apiService.excluirPessoa(pessoa).subscribe(response => {
      window.location.reload()
      this.toastr.success('Pessoa excluída com sucesso!', 'Sucesso!');
    })
  }

  excluir(codigo: number): void {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      width: '650px',
      data: {
        message: 'Deseja relamente excluir o registro?',
        title: 'Exclusão de Pessoa'
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (!result?.confirm) {
        return
      }
      this.excluirPessoa(codigo)
    })
  }

  displayedColumns: string[] = ['codigo', 'nome', 'logradouro', 'cep', 'ativo', 'acao'];

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
}
