import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit   {
    public user: User;

    constructor(private authService: AuthService) {
        this.user = this.authService.getCurrentUser;
    }
    public ngOnInit(): void {

    }
}
