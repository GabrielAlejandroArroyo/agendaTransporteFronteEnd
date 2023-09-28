import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanificacionRoutingModule } from './planificacion-routing.module';
import { PlanificacionFormComponent } from './components/planificacion-form/planificacion-form.component';
import { PlanificacionListComponent } from './components/planificacion-list/planificacion-list.component';
import { PlanificacionTabsComponent } from './components/planificacion-tabs/planificacion-tabs.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material/material.module';
import { CoreModule } from '@app/core/core.module';
import { PlanificacionDetailListComponent } from './components/planificaccion-detail-list/planificacion-detail-list.component';
import { PlanificacionDetailFormComponent } from './components/planificacion-detail-form/planificacion-detail-form.component';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    PlanificacionFormComponent,
    PlanificacionListComponent,
    PlanificacionTabsComponent,
    PlanificacionDetailListComponent,
    PlanificacionDetailFormComponent,
  ],
  imports: [
    CommonModule,
    PlanificacionRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    CoreModule,
    NgxLoadingModule.forRoot({}),
  ],
  entryComponents: [
  ],
})
export class PlanificacionModule { }
