import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {FormsModule, NgForm} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RegisterModel} from "./register.model";
import {MatInputModule} from "@angular/material/input";
import {ToastrService} from "ngx-toastr";
import {ErrorResponse} from "../../../helpers/types";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
    MatInputModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  emailActivated: boolean = false
  passwordActivated: boolean = false

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  async onRegister(form: NgForm){
    if (form.invalid){
      return
    }

    const regData: RegisterModel = {
      email: form.value.email,
      password: form.value.password
    }

    try {
      const response = await this.authService.register(regData)

      if("message" in response!){
        this.toastr.info(response.message as string)
      }else if(response){
        this.toastr.success('successfully registered')
      }
    }catch(e){
      if((e as ErrorResponse).hasOwnProperty('error')){
        this.toastr.error((e as ErrorResponse).error.message)
      } else {
        this.toastr.error('Something went wrong')
      }
      console.error(e)
    }
  }
}
