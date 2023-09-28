import { Component } from '@angular/core';
import { ApiLogin } from 'src/app/services/api.login';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(
    private apiService: ApiLogin
  ) { }

  deslogar() {
    this.apiService.deslogar();
  }
}
