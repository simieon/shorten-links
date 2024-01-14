import { Component } from '@angular/core';
import {HeaderComponent} from "../../../components/header/header.component";
import {LinksService} from "../../../services/links.service";
import {CreateLinkModel} from "./create-link.model";
import {Router} from "@angular/router";
import {FooterComponent} from "../../../components/footer/footer.component";

@Component({
  selector: 'app-create-link',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './create-link.component.html',
  styleUrl: './create-link.component.css'
})
export class CreateLinkComponent {
  constructor(
    private linksService: LinksService,
    private router: Router
  ) {}

  pressHandler(event: KeyboardEvent, link: string){
    if (event.key === 'Enter') {
      const createLinkDto: CreateLinkModel = {
        from: link
      }

      this.linksService.createLink(createLinkDto)
        .subscribe(link => {
          this.router.navigate([`/details/${link.id}`])
        })
    }
  }
}
