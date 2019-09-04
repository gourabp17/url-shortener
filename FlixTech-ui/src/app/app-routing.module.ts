import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UrlComponent } from './url/url.component';
import { HistoryComponent } from './history/history.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'url', component: UrlComponent },
  { path: 'history', component: HistoryComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
