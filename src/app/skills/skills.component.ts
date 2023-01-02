import { Component } from '@angular/core';
import { LoadingService } from '../loading-service.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {


  constructor(public loadingService:LoadingService){}
}
