//Modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule} from './../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Services
import { AlertService } from './services/alert.service';
import { AppInjector } from './services/app.injector.service';
import { AuthService } from './services/auth.service';
import { RolService } from './services/rol.service';
import { SpinnerService } from './services/spinner.service';
import { UserService } from './services/user.services';
import { TransportistaService } from './services/transportista.service';
import { DestinoService } from './services/destino.services';

//Components
import { TransportistaSelectComponent } from './components/transportista-select/transportista-select.component';
import { RolSelectComponent } from './components/rol-select/rol-select.component';
import { SingleSelectComponent } from './components/single-select/single-select.component';


@NgModule({
  declarations: [
    TransportistaSelectComponent,
    RolSelectComponent,
    SingleSelectComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AlertService,
    AppInjector,
    RolService,
    SpinnerService,
    UserService,
    AuthService,
    TransportistaService,
    DestinoService,
  ],
  exports: [
    TransportistaSelectComponent,
    RolSelectComponent,
    SingleSelectComponent,
  ]
})
export class CoreModule { }
