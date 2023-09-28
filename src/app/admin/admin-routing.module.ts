import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes del módulo admin
import { TemplateplanificacioncabeceraFormComponent } from './components/templateplanificacioncabecera/templateplanificacioncabecera-form/templateplanificacioncabecera-form.component';
import { TemplateplanificaciondetalleFormComponent } from './components/templateplanificaciondetalle/templateplanificaciondetalle-form/templateplanificaciondetalle-form.component';
import { NavadminComponent } from './components/navadmin/navadmin.component';
import { RolFormComponent } from './components/rol/rol-form/rol-form.component';
import { RolesListComponent } from './components/rol/roles-list/roles-list.component';
import { UserFormComponent } from './components/user/user-form/user-form.component';
import { UserListComponent } from './components/user/users-list/users-list.component';
import { ProfileComponent } from './components/profile/profile.component';

//Componentes del módulo de planificación
import { PlanificacionTabsComponent } from '@app/planificacion/components/planificacion-tabs/planificacion-tabs.component';
import { PlanificacionFormComponent } from '@app/planificacion/components/planificacion-form/planificacion-form.component';
import { PlanificacionDetailListComponent } from '@app/planificacion/components/planificaccion-detail-list/planificacion-detail-list.component';
import { PlanificacionDetailFormComponent } from '@app/planificacion/components/planificacion-detail-form/planificacion-detail-form.component';


const routes: Routes = [
  {
    children: [
      {
        component: RolesListComponent,
        path: 'roles',
      },
      {
        component: RolFormComponent,
        path: 'roles/create',
      },
      {
        component: RolFormComponent,
        path: 'roles/edit/:id',
      },
      {
        component: RolFormComponent,
        path: 'roles/view/:id',
      },
      {
        component: TemplateplanificacioncabeceraFormComponent,
        path: 'templatecabecera/create',
      },
      {
        component: TemplateplanificaciondetalleFormComponent,
        path: 'templatedetalle/create',
      },
      {
        component: UserListComponent,
        path: 'users',
      },
      {
        component: UserFormComponent,
        path: 'users/create',
      },
      {
        component: UserFormComponent,
        path: 'users/edit/:id',
      },
      {
        component: UserFormComponent,
        path: 'users/view/:id',
      },
      {
        component: PlanificacionTabsComponent,
        path: 'viajes',
      },
      {
        component: PlanificacionFormComponent,
        path: 'viajes/reserve',
      },
      {
        component: PlanificacionFormComponent,
        path: 'viajes/edit',
      },
      {
        component: PlanificacionFormComponent,
        path: 'viajes/create',
      },
      {
        component: PlanificacionFormComponent,
        path: 'viajes/view',
      },
      {
        component: PlanificacionDetailListComponent,
        path: 'viajesdetalle',
      },
      {
        component: PlanificacionDetailFormComponent,
        path: 'viajesdetalle/view',
      },
      {
        component: ProfileComponent,
        path: 'profile',
      },
    ],
    component: NavadminComponent,
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class AdminRoutingModule { }
