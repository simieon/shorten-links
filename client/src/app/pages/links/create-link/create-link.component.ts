import { Component } from '@angular/core';
import {HeaderComponent} from "../../../components/header/header.component";
import {ToastrService} from "ngx-toastr";
import {LinksService} from "../../../services/links.service";
import {CreateLinkModel} from "./create-link.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-link',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './create-link.component.html',
  styleUrl: './create-link.component.css'
})
export class CreateLinkComponent {
  constructor(
    private linksService: LinksService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  pressHandler(event: KeyboardEvent, link: string){
    if (event.key === 'Enter') {
      const createLinkDto: CreateLinkModel = {
        from: link
      }
      try {
        this.linksService.createLink(createLinkDto)
          .subscribe(link => {
            this.router.navigate([`/details/${link.id}`])
          })
      }catch(e){
        console.error(e)
        this.toastr.error('Something went wrong')
      }
    }
  }
}
