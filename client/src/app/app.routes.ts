import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/auth/login/login.component";
import {RegisterComponent} from "./pages/auth/register/register.component";
import {CreateLinkComponent} from "./pages/links/create-link/create-link.component";
import {AuthGuard} from "./auth.guard";
import {ErrorComponent} from "./pages/error/error.component";
import {DetailsLinkComponent} from "./pages/links/details-link/details-link.component";
import {LinksListComponent} from "./pages/links/links-list/links-list.component";
import {LayoutComponent} from "./components/layout/layout.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: '', component: LayoutComponent, canActivate: [AuthGuard], children:[
      {path: '', component: CreateLinkComponent},
      {path: 'details/:id', component: DetailsLinkComponent},
      {path: 'links', component: LinksListComponent},
      {path: 'error', component: ErrorComponent},
      {path: '**', redirectTo: 'error'}
    ]},
];
