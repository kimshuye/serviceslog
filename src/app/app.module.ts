import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule,NoopAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

//Material design modules
import {  
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatGridListModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatListModule,
  MatIconModule,

 } from '@angular/material';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// firebase configuration
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireFunctionsModule } from 'angularfire2/functions';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,

    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,

    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'firestarter'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    

    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,

    OwlDateTimeModule, 
    OwlNativeDateTimeModule,

  ],
  exports: [

    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
