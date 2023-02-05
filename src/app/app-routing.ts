import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { PessoaComponent } from './components/pessoa/pessoa.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { Routes, RouterModule } from "@angular/router";

const APP_ROUTES: Routes = [
  { path: 'categorias', component: CategoriaComponent },
  { path: 'pessoas', component: PessoaComponent },
  { path: '', component: HomeComponent }
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(APP_ROUTES);
