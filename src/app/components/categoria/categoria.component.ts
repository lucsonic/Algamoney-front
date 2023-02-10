import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../Api/api.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog) {
    this.categorias = [];
    this.listarAllCategorias();
  }

  categorias: Array<any>;

  listarAllCategorias() {
    this.apiService.listAllCategorias().subscribe(dados => {
      this.categorias = dados.content
    });
  }

  editarCategoria(element: any) {
    let item = element;
    this.router.navigate([`/editar-categoria/${item}`], {
      relativeTo: this.route
    });
  }

  excluirCategoria(element: any) {
    const categoria = {
      codigo: element
    }
    this.apiService.excluirCategoria(categoria).subscribe(response => {
      window.location.reload()
      this.toastr.success('Categoria excluída com sucesso!', 'Sucesso!');
    })
  }

  excluir(codigo: number): void {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      width: '650px',
      data: {
        message: 'Deseja relamente excluir a categoria?',
        title: 'Exclusão de Catergoria'
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (!result?.confirm) {
        return
      }
      this.excluirCategoria(codigo)
    })
  }

  displayedColumns: string[] = ['codigo', 'nome', 'acao'];

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

}
