import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from './loading-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pws';
  constructor(public loadingService:LoadingService, translate: TranslateService){
    const lang = localStorage.getItem('lang') ?? (navigator.language?.startsWith('it') ? 'it' : 'en');
    translate.use(lang);
  }
  getSplit(string:String) {
    return string.split('')
  }
}
