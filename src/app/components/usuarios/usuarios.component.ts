import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ApiUsuario } from 'src/app/services/api.usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  titulo: any;
  displayedColumns: string[] = ['codigo', 'nome', 'cpf', 'login', 'acao'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private apiService: ApiUsuario,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog) {
    this.titulo = 'Usuários Cadastrados';
  }

  ngOnInit() {
    this.listarAllUsuarios();
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.paginator._intl.nextPageLabel = 'Próxima página';
    this.paginator._intl.previousPageLabel = 'Página anterior';
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listarAllUsuarios() {
    this.apiService.listAllUsuarios().subscribe(dados => {
      this.dataSource = new MatTableDataSource(dados);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      const sortState: Sort = { active: 'nome', direction: 'asc' };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
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

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
}
