import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';
import { NgxLoadingModule } from 'ngx-loading';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent} from './components/navbar/navbar.component';
import { SpinnerComponent} from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    SpinnerComponent,
  ],
  exports: [
    // HeaderComponent,
    // NavbarComponent,
    FooterComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({ backdropBackgroundColour: 'rgba(204,204,204,.6)' }),
  ],
})
export class SharedModule { }
