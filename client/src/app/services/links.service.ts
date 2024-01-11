import { Injectable } from '@angular/core';
import {AuthService} from "./auth.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CreateLinkModel} from "../pages/links/create-link/create-link.model";
import {LinkModel} from "../models/link.model";
import {keys} from "../config/keys";

@Injectable({
  providedIn: 'root'
})
export class LinksService {
  constructor(
    private authService:AuthService,
    private httpClient: HttpClient
  ) {}

  createLink(model: CreateLinkModel){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    })

    return this.httpClient.post<LinkModel>(keys.linksPath, model, {headers})
  }

  fetchLinks(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    })

    return this.httpClient.get<LinkModel[]>(keys.linksPath, {headers})
  }
}
