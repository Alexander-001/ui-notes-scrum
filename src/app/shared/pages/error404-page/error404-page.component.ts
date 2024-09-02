import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error404-page',
  templateUrl: 'error404-page.component.html',
})
export class Error404PageComponent {
  constructor(private router: Router) {}

  onClickBackHome() {
    this.router.navigate(['/notes/home']);
  }
}
