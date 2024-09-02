import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'shared-navbar',
  templateUrl: 'navbar.component.html',
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  public sidebarItems = [
    { label: 'Inicio', icon: 'view_module', url: '/notes/home' },
    { label: 'Historial de notas', icon: 'label', url: '/notes/history' },
  ];

  onClickCloseSession() {
    this.authService.logout();
    const data = this.authService.currentUserGoogle;
    if (data !== null) this.authService.logoutGoogle();
    this.router.navigate(['/auth/login']);
  }
}
