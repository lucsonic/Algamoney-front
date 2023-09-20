import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../Api/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  titulo: any;
  displayedColumns: string[] = ['codigo', 'nome', 'acao'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private dialog: MatDialog) {    
    this.titulo = 'Categorias Cadastradas';
  }

  ngOnInit() {
    this.listarAllCategorias(); 
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

  listarAllCategorias() {
    this.apiService.listAllCategorias().subscribe(dados => {
      this.dataSource = new MatTableDataSource(dados);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      const sortState: Sort = { active: 'nome', direction: 'asc' };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
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

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

}
