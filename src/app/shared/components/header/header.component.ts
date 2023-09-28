import { Component, ElementRef, HostListener , OnInit , ViewChild } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '@app/core/models/user';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'] ,
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  public pushRightClass = 'push-right';
  public sticky = false;
  public showHeader = true;
  @ViewChild('stickyMenu') public menuElement: ElementRef;
  public menuPosition: any;
  public t: any;
  public windowScroll = 0;
  public image$: Observable<string>;
  public navbar$: Observable<string>;
  public enumPerm: any;
  public scrollTimeStamp = 0;
  public imageBlobUrl: string;

  public user: User;
  // isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser;
  }


  private changeUser(user: User): void {
    this.user = user;
    // this.isLoggedIn$ = this.accountService.isLoggedIn;
  }

  public ngOnInit(): void {
  }

  public logout(): void {
    this.authService.logout();
    location.reload();
  }

  public perfil(): void {
    //console.log('Se debe mostrar el profile del usuario logueado');
  }

}
