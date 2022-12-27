import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() index=0;
  ngOnInit() {
    // ...
  }
  setIndex(index:any){
    this.index=index;
    console.log(index)
  }
}
