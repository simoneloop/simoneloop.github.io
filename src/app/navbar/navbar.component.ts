import { NONE_TYPE } from '@angular/compiler';
import { Component,Input,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../loading-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  @Input() index=0;
  path:any
  routes=["","about","skills","contact"]
  
  
  constructor(private router: Router,public loadingService:LoadingService) {    
    
  }
  isActive(index:any){
    this.path=this.router.url.split("/")
    var activeIndex=this.routes.indexOf(this.path[1])
    return activeIndex==index
  }
  changeRoute(index:any){
    this.getRoute(index)
    if(!this.isActive(index)){
      this.loadingService.startLoading()
    }
  }

  
  getRoute(index:number){
    setTimeout(() => {
      // Qui puoi inserire il codice per accedere alla route
      this.router.navigate([this.routes[index]]);
    }, 800); 
    
  }
}
