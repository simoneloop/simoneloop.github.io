import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface ContactLink {
  icon: IconDefinition;
  label: string;
  value: string;
  url: string;
  external: boolean;
}

@Component({
  selector: 'app-link-card',
  templateUrl: './link-card.component.html',
  styleUrls: ['./link-card.component.css']
})
export class LinkCardComponent {
  @Input() link!: ContactLink;
}
