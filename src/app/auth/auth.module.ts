import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
/* import { LoginComponent } from './components/login/login.component'; */

import { MaterialModule } from './../material/material.module';

// Components

import { LoginComponent } from './../auth/components/login/login.component';

@NgModule({
  declarations: [
    LoginComponent,
   ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MaterialModule,
  ],
})
export class AuthModule { }
