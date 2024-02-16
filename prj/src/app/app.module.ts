import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.development';
import { SignupComponent } from './components/pages/signup/signup.component';
import { MainComponent } from './components/pages/main/main.component';
import { UndefinedpageComponent } from './components/pages/undefinedpage/undefinedpage.component';

@NgModule({
  declarations: [AppComponent, SignupComponent, MainComponent, UndefinedpageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
