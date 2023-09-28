//Modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
//import { NgxLoadingComponent, NgxLoadingModule } from 'ngx-loading';
//import { ToastrModule } from 'ngx-toastr';

//Locales
import { LOCALE_ID } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
registerLocaleData(localeEsAr, 'es-Ar');

//Modules de la app
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.modules';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { PlanificacionModule } from './planificacion/planificacion.module';

//Components propios
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';

//Interceptors
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { BaseURLInterceptor } from './interceptors/baseurl.interceptor';
import { HttpErrorInterceptor } from './interceptors/httperror.interceptor';



@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      SharedModule,
      CoreModule,
      ReactiveFormsModule,
      HttpClientModule,
      AuthModule,
      // ToastrModule.forRoot({
      //   newestOnTop: false,
      //   preventDuplicates: true,
      // }),
      BrowserAnimationsModule,
      AdminModule,
      PlanificacionModule,
      //NgxLoadingModule.forRoot({ backdropBackgroundColour: 'rgba(204,204,204,.6)' }),
    ],
    providers: [
/*       { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, */
      // { provide: LocationStrategy, useClass: HashLocationStrategy },
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: BaseURLInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
      { provide: LOCALE_ID, useValue: 'es-Ar' },
    ],
})
export class AppModule { }
