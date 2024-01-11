import {Component, Input} from '@angular/core';
import {LinkModel} from "../../models/link.model";
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-links-table[links]',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './links-table.component.html',
  styleUrl: './links-table.component.css'
})
export class LinksTableComponent {
  @Input() links!: LinkModel[]
}
