import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../../services/auth.service";
import {FormsModule, NgForm} from "@angular/forms";
import {LoginModel} from "./login.model";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
    FormsModule,
    MatFormFieldModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  emailActivated: boolean = false
  passwordActivated: boolean = false

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  async onLogin(form: NgForm){
    if(form.invalid){
      return
    }

    const user: LoginModel = {
      email: form.value.email,
      password: form.value.password
    }

    try {
      await this.authService.login(user)

      if(this.authService.isAuthenticated()){
        this.router.navigate(['/'])
      }

      form.resetForm()
    } catch (e) {
      this.toastr.error('Invalid login or password')
      console.error(e)
    }
  }
}
