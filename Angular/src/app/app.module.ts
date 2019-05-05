import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

//ROUTES

import { ROUTES } from './app.routes';

//SERVICES

import { MlService } from './services/ml.services'

// COMPONENTS

import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './components/home/home.component';
import { ResultsComponent } from './components/results/results.component';
import { SingleComponent } from './components/single/single.component';

// LOCALE

import{ LOCALE_ID} from '@angular/core'
import localeEs from '@angular/common/locales/es-AR';
import {registerLocaleData} from '@angular/common';
registerLocaleData(localeEs);


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HomeComponent,
    ResultsComponent,
    SingleComponent
  ],
  imports: [
    BrowserModule,
    ROUTES,
    HttpClientModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue:"es-AR"},
    MlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
