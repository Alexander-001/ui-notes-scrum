import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'notes-home-page',
  templateUrl: 'home-page.component.html',
})
export class HomePageComponent implements OnInit {
  constructor(private authService: AuthService) {}

  public isLoading: boolean = false;

  ngOnInit(): void {}
}
