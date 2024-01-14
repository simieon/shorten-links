import {Component, Input} from '@angular/core';
import {LinkModel} from "../../models/link.model";

@Component({
  selector: 'app-link-card[link]',
  standalone: true,
  imports: [],
  templateUrl: './link-card.component.html',
  styleUrl: './link-card.component.css'
})
export class LinkCardComponent {
  @Input() link!: LinkModel

  formatDate(date: Date){
    return new Date(date).toLocaleDateString()
  }
}
