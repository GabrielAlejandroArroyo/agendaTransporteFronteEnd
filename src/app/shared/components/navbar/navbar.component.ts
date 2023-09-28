import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { User } from '@app/core/models/user';

@Component({
  selector: 'app-navbar',
  styleUrls: ['./navbar.component.scss'],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  public user: User;

  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser;
  }

  public ngOnInit(): void {
  }

}
