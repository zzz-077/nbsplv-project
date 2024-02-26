import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { SignupComponent } from './components/pages/signup/signup.component';
import { MainComponent } from './components/pages/main/main.component';
import { UndefinedpageComponent } from './components/pages/undefinedpage/undefinedpage.component';
import { SiginComponent } from './components/pages/sigin/sigin.component';
//material
import { MatSelectModule } from '@angular/material/select';
import { UserinfoComponent } from './components/poup/userinfo/userinfo.component';
import { environment } from 'src/environments/environment';
import {
  AngularFireAuth,
  AngularFireAuthModule,
} from '@angular/fire/compat/auth';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    MainComponent,
    UndefinedpageComponent,
    SiginComponent,
    UserinfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
