import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent }  from './auth/signup/signup.component';
import { MapComponent } from './map/map.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'map', component: MapComponent },
  { path: 'account', component: AccountComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
