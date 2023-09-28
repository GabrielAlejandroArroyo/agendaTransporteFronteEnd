import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './core/services/auth.service';
import { User } from './core/models/user';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})

export class AppComponent {
  public currentUser: User;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
        //this.authService.currentUser.subscribe((x) => this.currentUser = x);
        this.currentUser = this.authService.getCurrentUser;
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
