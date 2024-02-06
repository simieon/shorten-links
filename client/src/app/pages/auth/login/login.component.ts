import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../../services/auth.service";
import {FormsModule, NgForm} from "@angular/forms";
import {LoginModel} from "./login.model";
import {MatFormFieldModule} from "@angular/material/form-field";
import {GoogleSigninButtonModule, SocialAuthService} from "@abacritt/angularx-social-login";
import {Subscription} from "rxjs";

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
    GoogleSigninButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy{
  emailActivated: boolean = false
  passwordActivated: boolean = false
  private googleAuthSubscription!: Subscription

  constructor(
    private authService: AuthService,
    private router: Router,
    private googleAuthService: SocialAuthService
  ) {}

  ngOnInit() {
    this.googleAuthSubscription = this.googleAuthService.authState.subscribe(user => {
      this.authService.googleLogin({token: user.idToken})
        .then(() => {
          if(this.authService.isAuthenticated()){
            this.router.navigate(['/'])
          }
        })
    })
  }

  async onLogin(form: NgForm){
    if(form.invalid){
      return
    }

    const user: LoginModel = {
      email: form.value.email,
      password: form.value.password
    }

    await this.authService.login(user)

    if(this.authService.isAuthenticated()){
      this.router.navigate(['/'])
    }

    form.resetForm()
  }

  ngOnDestroy() {
    if (this.googleAuthSubscription) {
      this.googleAuthSubscription.unsubscribe()
    }
  }
}
