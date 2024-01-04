import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/auth/login/login.component";
import {RegisterComponent} from "./pages/auth/register/register.component";
import {CreateLinkComponent} from "./pages/create-link/create-link.component";
import {AuthGuard} from "./pages/auth/auth.guard";
import {ErrorComponent} from "./pages/error/error.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: '', component: CreateLinkComponent, canActivate: [AuthGuard]},
  {path: 'error', component: ErrorComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'error'}
];
