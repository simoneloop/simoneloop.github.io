import { Component, Input } from '@angular/core';

export interface Project {
  name: string;
  descKey: string;
  tags: string[];
  url: string;
}

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent {
  @Input() project!: Project;
}
