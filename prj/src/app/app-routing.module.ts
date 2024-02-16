import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/pages/main/main.component';
import { UndefinedpageComponent } from './components/pages/undefinedpage/undefinedpage.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { SiginComponent } from './components/pages/sigin/sigin.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: SiginComponent },
  { path: '**', component: UndefinedpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
