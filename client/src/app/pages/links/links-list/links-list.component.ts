import {Component, OnInit} from '@angular/core';
import {LinksService} from "../../../services/links.service";
import {LinkModel} from "../../../models/link.model";
import {LoaderComponent} from "../../../components/loader/loader.component";
import {NgIf} from "@angular/common";
import {LinksTableComponent} from "../../../components/links-table/links-table.component";
import {HeaderComponent} from "../../../components/header/header.component";

@Component({
  selector: 'app-links-list',
  standalone: true,
  imports: [
    LoaderComponent,
    NgIf,
    LinksTableComponent,
    HeaderComponent
  ],
  templateUrl: './links-list.component.html',
  styleUrl: './links-list.component.css'
})
export class LinksListComponent implements OnInit {
  links: LinkModel[] = []
  isLoading: boolean = false

  constructor(
    private linksService: LinksService,
  ) {}

  ngOnInit(): void {
    this.loadData()
  }

  private loadData(){
    this.links = []

    this.isLoading = true
    this.linksService.fetchLinks()
      .subscribe(links => {
        this.links = links
        this.isLoading = false
      })
  }
}
