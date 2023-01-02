import { Component } from '@angular/core';
import { LoadingService } from '../loading-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public loadingService:LoadingService){}
  getSplit(string:String) {
    return string.split('')
}
}
