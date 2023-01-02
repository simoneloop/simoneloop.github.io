import { Component } from '@angular/core';
import { LoadingService } from '../loading-service.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  constructor(public loadingService:LoadingService){}

}
