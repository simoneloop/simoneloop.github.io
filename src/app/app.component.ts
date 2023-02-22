import { Component } from '@angular/core';
import { LoadingService } from './loading-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pws';
  constructor(public loadingService:LoadingService){}
  getSplit(string:String) {
    return string.split('')
  }
}
