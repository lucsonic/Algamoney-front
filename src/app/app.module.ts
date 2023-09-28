import { routing } from './app-routing';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { PessoaComponent } from './components/pessoa/pessoa.component';
import { HomeComponent } from './components/home/home.component';
import { TemplateComponent } from './components/template/template.component';
import { HeaderComponent } from './components/template/header/header.component';
import { ContentComponent } from './components/template/content/content.component';
import { FooterComponent } from './components/template/footer/footer.component';

import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CadastroCategoriaComponent } from './components/cadastro-categoria/cadastro-categoria.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToastrModule } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { PessoaFormComponent } from './components/pessoa-form/pessoa-form.component';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgxMaskModule } from 'ngx-mask-2';
import { MatSortModule } from '@angular/material/sort';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/template/main/main.component';
import { UsuarioFormComponent } from './components/usuario-form/usuario-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriaComponent,
    PessoaComponent,
    HomeComponent,
    TemplateComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    CadastroCategoriaComponent,
    PessoaFormComponent,
    ConfirmDialogComponent,
    UsuariosComponent,
    UsuarioFormComponent,
    SidebarComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    routing,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    ToastrModule,
    ToastrModule.forRoot(),
    MatTooltipModule,
    MatProgressBarModule,
    MatDialogModule,
    MatCardModule,
    MatSelectModule,
    MatDividerModule,
    NgxMaskModule.forRoot(),
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
