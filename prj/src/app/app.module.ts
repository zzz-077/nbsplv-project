import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//components
import { randomIcons } from 'src/app/shared/models/RandomIcons';
import { AppComponent } from './app.component';
import { MainComponent } from './components/pages/main/main.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { SiginComponent } from './components/pages/sigin/sigin.component';
import { AppRoutingModule } from './app-routing.module';
import { UserinfoComponent } from './components/poup/userinfo/userinfo.component';
import { UndefinedpageComponent } from './components/pages/undefinedpage/undefinedpage.component';
import { AboutComponent } from './components/pages/about/about.component';
//reactiveformas
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//material
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
//firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import {
  AngularFireAuth,
  AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { HttpClientModule } from '@angular/common/http';
//swipper slider
// import { SwiperModule } from 'swiper/angular';
import { register } from 'swiper/element/bundle';
import { AlbumTracksComponent } from './components/pages/album-tracks/album-tracks.component';
import { MusicCardComponent } from './components/pages/music-card/music-card.component';
import { ListsComponent } from './components/pages/lists/lists.component';
import { AddPlaylistComponent } from './components/poup/add-playlist/add-playlist.component';
import { PlaylistDeleteComponent } from './components/poup/playlist-delete/playlist-delete.component';
import { PlayBarComponent } from './components/poup/play-bar/play-bar.component';
import { SpinnerComponent } from './components/poup/spinner/spinner.component';
register();
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    MainComponent,
    UndefinedpageComponent,
    SiginComponent,
    UserinfoComponent,
    AboutComponent,
    AlbumTracksComponent,
    MusicCardComponent,
    ListsComponent,
    AddPlaylistComponent,
    PlaylistDeleteComponent,
    PlayBarComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    FormsModule,
    NgxSkeletonLoaderModule.forRoot({
      animation: 'pulse',
      loadingText: 'This item is actually loading...',
    }),
  ],
  providers: [randomIcons],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
