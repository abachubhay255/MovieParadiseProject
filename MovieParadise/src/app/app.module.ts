import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { CreategroupaccountComponent } from './creategroupaccount/creategroupaccount.component';
import { AccounthomeComponent } from './accounthome/accounthome.component';
import { MovieComponent } from './movie/movie.component';
import { ListdialogComponent } from './movie/listdialog/listdialog.component';
import { JwtInterceptor } from './jwt.interceptor';
import { MovielistComponent } from './movielist/movielist.component';
import { AdddialogComponent } from './movie/adddialog/adddialog.component';
import { TrailerdialogComponent } from './movie/trailerdialog/trailerdialog.component';
import { ConfirmdialogComponent } from './movie/confirmdialog/confirmdialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateaccountComponent,
    LoginComponent,
    CreategroupaccountComponent,
    AccounthomeComponent,
    MovieComponent,
    ListdialogComponent,
    MovielistComponent,
    AdddialogComponent,
    TrailerdialogComponent,
    ConfirmdialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
