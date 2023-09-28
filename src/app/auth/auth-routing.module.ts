import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    component: LoginComponent,
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class AuthRoutingModule { }
