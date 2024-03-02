import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/pages/main/main.component';
import { UndefinedpageComponent } from './components/pages/undefinedpage/undefinedpage.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { SiginComponent } from './components/pages/sigin/sigin.component';
import { AboutComponent } from './components/pages/about/about.component';
import { AlbumTracksComponent } from './components/pages/album-tracks/album-tracks.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: SiginComponent },
  { path: 'aboutArtist', component: AboutComponent },
  { path: 'album/:id', component: AlbumTracksComponent },
  { path: '**', component: UndefinedpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
