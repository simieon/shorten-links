import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginModel} from "../pages/auth/login/login.model";
import {keys} from "../config/keys";
import {RegisterModel} from "../pages/auth/register/register.model";
import {Router} from "@angular/router";
import {ErrorResponse, IErrorHandler} from "../helpers/types";
import {Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";

type CurrentUserData = {
  userId: number | null
  access_token: string | null
}
@Injectable({
  providedIn: 'root'
})
export class AuthService implements IErrorHandler{
  private userData!: CurrentUserData

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) { }

  async login(user: LoginModel) {
    try {
      const response = await this.httpClient.post<CurrentUserData>(keys.loginPath, user).toPromise()
      this.userData = response!
      localStorage.setItem('userData', JSON.stringify(this.userData))
    } catch (e) {
      this.handleError(e)
    }
  }

  async register(user: RegisterModel){
    return this.httpClient.post(keys.registerPath, user).toPromise()
  }

  logout(){
    this.userData = {access_token: "", userId: 0}
    localStorage.removeItem('userData')
    this.router.navigate(['/login'])
  }

  isAuthenticated(): boolean{
    this.loadUserDataFromLS()
    return !!this.userData.access_token
  }

  getToken(): string | null{
    this.loadUserDataFromLS()
    return this.userData.access_token
  }

  getUserId(): number | null {
    this.loadUserDataFromLS()
    return this.userData.userId
  }

  private loadUserDataFromLS(){
    this.userData = JSON.parse(localStorage.getItem('userData')!) || {access_token: '', userId: 0}
  }

  handleError(error: unknown): Observable<never> | void {
    if((error as ErrorResponse).hasOwnProperty('error')){
      this.toastr.error((error as ErrorResponse).error.message)
    } else {
      this.toastr.error('Something went wrong')
    }
    console.error(error)
  }
}
