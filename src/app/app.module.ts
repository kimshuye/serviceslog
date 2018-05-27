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

import { CoreModule } from './core/core.module';
import { MainNavComponent } from './ui/main-nav/main-nav.component';
import { UserProfileComponent } from './ui/user-profile/user-profile.component';
import { HomePageComponent } from './ui/home-page/home-page.component';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { NotificationMessageComponent } from './ui/notification-message/notification-message.component';
import { SsrPageComponent } from './ui/ssr-page/ssr-page.component';
import { UserFormComponent } from './ui/user-form/user-form.component';
import { UserLoginComponent } from './ui/user-login/user-login.component';
import { AuthService } from './core/auth.service';
import { AuthGuard } from './core/auth.guard';
import { NotifyService } from './core/notify.service';
import { NotesModule } from './notes/notes.module';
import { MobiletopupModule } from './mobiletopup/mobiletopup.module';



@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    UserProfileComponent,
    HomePageComponent,
    LoadingSpinnerComponent,
    NotificationMessageComponent,
    SsrPageComponent,
    UserFormComponent,
    UserLoginComponent
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
    AngularFireDatabaseModule,
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

    CoreModule,
    NotesModule,
    MobiletopupModule,
    

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
