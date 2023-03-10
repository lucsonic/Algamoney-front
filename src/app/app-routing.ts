import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PessoaFormComponent } from './components/pessoa-form/pessoa-form.component';
import { CadastroCategoriaComponent } from './components/cadastro-categoria/cadastro-categoria.component';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { PessoaComponent } from './components/pessoa/pessoa.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { Routes, RouterModule } from "@angular/router";

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'categorias', component: CategoriaComponent },
  { path: 'nova-categoria', component: CadastroCategoriaComponent },
  { path: 'editar-categoria/:codigo', component: CadastroCategoriaComponent },
  { path: 'excluir-categoria/:codigo', component: CategoriaComponent },
  { path: 'pessoas', component: PessoaComponent },
  { path: 'nova-pessoa', component: PessoaFormComponent },
  { path: 'editar-pessoa/:codigo', component: PessoaFormComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'novo-usuario', component: UsuarioFormComponent },
  { path: 'editar-usuario/:codigo', component: UsuarioFormComponent }
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(APP_ROUTES);
