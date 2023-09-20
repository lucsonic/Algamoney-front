import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from './../../Api/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {
  titulo: any;
  displayedColumns: string[] = ['codigo', 'nome', 'logradouro', 'cep', 'ativo', 'acao'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog) {
    this.titulo = 'Clientes Cadastrados';
  }

  ngOnInit() {
    this.listarAllPessoas();
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

  listarAllPessoas() {
    this.apiService.listAllPessoas().subscribe(dados => {
      this.dataSource = new MatTableDataSource(dados);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      const sortState: Sort = { active: 'nome', direction: 'asc' };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
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

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
}
