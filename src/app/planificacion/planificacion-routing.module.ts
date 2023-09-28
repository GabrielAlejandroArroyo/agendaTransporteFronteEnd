import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanificacionTabsComponent} from '../planificacion/components/planificacion-tabs/planificacion-tabs.component'

const routes: Routes = [];
//{
//   // children: [
//   //   {
//   //     component: PlanificacionTabsComponent,
//   //     path: '',
//   //   },
//   //   {
//   //     component: PlanificacionFormComponent,
//   //     path: 'viajes/create',
//   //   },
//   //   {
//   //     component: PlanificacionFormComponent,
//   //     path: 'viajes/edit/:id',
//   //   },
//   //   {
//   //     component: PlanificacionFormComponent,
//   //     path: 'viajes/view/:id',
//   //   },
//   // ],
//   component: PlanificacionTabsComponent,
//   path: '',
//},
//];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanificacionRoutingModule { }
