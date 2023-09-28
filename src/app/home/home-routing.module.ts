import {  NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
];

@NgModule({
  exports: [
    RouterModule,
  ],
  imports: [
    RouterModule.forChild(routes),
  ],
})
export class HomeRoutingModule {}
