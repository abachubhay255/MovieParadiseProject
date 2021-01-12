import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {CreateaccountComponent} from './createaccount/createaccount.component';
import {CreategroupaccountComponent} from './creategroupaccount/creategroupaccount.component';
import {AccounthomeComponent} from './accounthome/accounthome.component';
import {MovielistComponent} from './movielist/movielist.component';
import {MovieComponent} from './movie/movie.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'createaccount', component: CreateaccountComponent },
  {path: 'creategroupaccount', component: CreategroupaccountComponent },
  {path: 'accounthome', component: AccounthomeComponent, canActivate: [AuthGuard] },
  {path: 'movielist', component: MovielistComponent, canActivate: [AuthGuard] },
  {path: 'movies/:id', component: MovieComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
