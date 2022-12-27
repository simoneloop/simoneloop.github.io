import { Component,Input,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  @Input() index=0;
  path:any
  routes=["","about","skills","contact"]
  
  
  constructor(private router: Router) {    
    
  }
  isActive(index:any){
    this.path=this.router.url.split("/")
    var activeIndex=this.routes.indexOf(this.path[1])
    return activeIndex==index
  }
}
