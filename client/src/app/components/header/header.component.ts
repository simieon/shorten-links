import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(
    private authService: AuthService
  ) {}

  signOut(){
    this.authService.logout()
  }
}
