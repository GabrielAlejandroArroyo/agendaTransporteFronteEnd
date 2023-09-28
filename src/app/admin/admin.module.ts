//Modules a importar
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '@app/material/material.module';
import { CoreModule } from '@app/core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';

//Components propios
import { TemplateplanificacioncabeceraFormComponent } from './components/templateplanificacioncabecera/templateplanificacioncabecera-form/templateplanificacioncabecera-form.component';
import { TemplateplanificaciondetalleFormComponent } from './components/templateplanificaciondetalle/templateplanificaciondetalle-form/templateplanificaciondetalle-form.component';
import { NavadminComponent } from './components/navadmin/navadmin.component';
import { RolFormComponent } from './components/rol/rol-form/rol-form.component';
import { RolesListComponent } from './components/rol/roles-list/roles-list.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { UserListComponent } from './components/user/users-list/users-list.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    TemplateplanificaciondetalleFormComponent,
    TemplateplanificacioncabeceraFormComponent,
    NavadminComponent,
    RolFormComponent,
    RolesListComponent,
    UserFormComponent,
    UserListComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    CoreModule,
  ],
})
export class AdminModule { }
