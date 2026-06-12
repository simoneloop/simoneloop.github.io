import { Component } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { LoadingService } from '../loading-service.service';
import { UtiService } from '../uti.service';
import { ContactLink } from './link-card/link-card.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  links: ContactLink[] = [
    { icon: faEnvelope, label: 'Email', value: 'simonelopez@hotmail.it', url: 'mailto:simonelopez@hotmail.it', external: false },
    { icon: faLinkedin, label: 'LinkedIn', value: 'in/s-loop', url: 'https://www.linkedin.com/in/s-loop', external: true },
    { icon: faGithub, label: 'GitHub', value: 'simoneloop', url: 'https://github.com/simoneloop', external: true },
  ];

  constructor(public loadingService:LoadingService, public uti:UtiService){}
}
