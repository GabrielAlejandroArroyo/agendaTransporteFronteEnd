import { NgModule } from '@angular/core';
import { PreloadAllModules , RouterModule , Routes } from '@angular/router';

// Guards
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

// Components
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
    {
      children: [
        {
          path: '',
          canActivate: [AuthGuard],
/*           loadChildren: () => import('./home/home.module').then ((m) => m.HomeModule), */
          loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
        },
        {
          path: 'admin',
          canActivate: [AuthGuard],
          loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
        },
        // {
        //   path: 'viajes',
        //   loadChildren: () => import('./planificacion/planificacion.module').then((m) => m.PlanificacionModule),
        // },
      ],
      component: LayoutComponent,
      path: '',
    },
    {
      loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
      path: 'login',
    },
    {
      path: '**',
      redirectTo: '',
    },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    })],
})
export class AppRoutingModule { }
