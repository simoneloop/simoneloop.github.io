import { Component } from '@angular/core';
import { LoadingService } from '../loading-service.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  constructor(public loadingService:LoadingService){}
}
