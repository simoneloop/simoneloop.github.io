import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private data:any;
  public translateReady=false;
  constructor(private http: HttpClient) {}
  public translate(text:String){
    if(this.data){return this.data.text;}
  }
  public loadTranslation(){
    let lan='it'
    this.http.get<any>('/assets/language/'+lan+'.json').subscribe(json => {
      this.data=json
    });
  }
}
