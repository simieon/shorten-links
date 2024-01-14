import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CreateLinkModel} from "../pages/links/create-link/create-link.model";
import {LinkModel} from "../models/link.model";
import {keys} from "../config/keys";
import {ErrorResponse, IErrorHandler} from "../helpers/types";
import {catchError, Observable, throwError} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class LinksService implements IErrorHandler{
  constructor(
    private authService: AuthService,
    private httpClient: HttpClient,
    private toastr: ToastrService
  ) {}

  createLink(model: CreateLinkModel){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    })

    return this.httpClient.post<LinkModel>(keys.linksPath, model, {headers})
      .pipe(catchError(error => this.handleError(error)))
  }

  fetchLinks(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    })

    return this.httpClient.get<LinkModel[]>(keys.linksPath, {headers})
      .pipe(catchError(error => this.handleError(error)))
  }

  getLink(id: number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    })

    return this.httpClient.get<LinkModel>(keys.linksPath + `/${id}`, {headers})
      .pipe(catchError(error => this.handleError(error)))
  }


  handleError(error:unknown):Observable<never>{
    if((error as ErrorResponse).hasOwnProperty('error')){
      if((error as ErrorResponse).error.statusCode === 401){
        this.authService.logout()
      } else {
        this.toastr.error((error as ErrorResponse).error.message)
      }
    } else {
      this.toastr.error('Something went wrong')
    }
    return throwError(error)
  }
}
