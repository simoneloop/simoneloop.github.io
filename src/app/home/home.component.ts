import { Component } from '@angular/core';
import { LoadingService } from '../loading-service.service';
import { UtiService } from '../uti.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public loadingService:LoadingService, public uti:UtiService){}
  
}
