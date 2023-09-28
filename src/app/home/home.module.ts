import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.modules';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    /* BannerComponent, */
    HomeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    MaterialModule,
  ],
})
export class HomeModule {

}
