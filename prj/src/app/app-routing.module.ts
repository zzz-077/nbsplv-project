import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/pages/main/main.component';
import { UndefinedpageComponent } from './components/pages/undefinedpage/undefinedpage.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: '**', component: UndefinedpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
