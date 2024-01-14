import {Component, OnInit} from '@angular/core';
import {LinksService} from "../../../services/links.service";
import {ActivatedRoute} from "@angular/router";
import {LinkModel} from "../../../models/link.model";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ToastrService} from "ngx-toastr";
import {LinkCardComponent} from "../../../components/link-card/link-card.component";
import {NgIf} from "@angular/common";
import {HeaderComponent} from "../../../components/header/header.component";

@Component({
  selector: 'app-details-link',
  standalone: true,
  imports: [
    LinkCardComponent,
    NgIf,
    HeaderComponent
  ],
  templateUrl: './details-link.component.html',
  styleUrl: './details-link.component.css'
})
export class DetailsLinkComponent implements OnInit{
  link!: LinkModel

  constructor(
    private linksService: LinksService,
    private router: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadLink()
  }

  private loadLink(){
    const id = +this.router.snapshot.paramMap.get('id')!

    this.linksService.getLink(id)
      .subscribe(link => {
        this.link = link
        console.log(this.link)
      }, error => {
        this.toastr.error(error.message)
      })
  }
}
