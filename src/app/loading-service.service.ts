import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  

  // Variabile per indicare se il caricamento è in corso o meno
  public loading = false;
  // Contatore per il caricamento
  public counter = 0;
  index=0
  data:any;
  text:any;

  constructor(private http: HttpClient) {
    this.http.get<any>('/assets/data.json').subscribe(json => {
      this.data=json
      this.text=json.loading_texts
    });
  }

  
  getText(){
    return this.text[this.index];
  }

  // Metodo per avviare il caricamento
  startLoading() {
    if(!this.loading){
      this.index=Math.floor(Math.random() * this.text.length)
      this.loading = true;
      this.counter=0;
      const intervalId = setInterval(() => {
        this.counter++;
        if (this.counter === 100) {
          
          // Se il contatore raggiunge 100, interrompi l'intervallo e imposta la variabile "loading" su false
        
          
          setTimeout(()=>{
            this.loading = false;
            clearInterval(intervalId);
          },450)
          
        }
      }, 5);
    }
    
  }

  
  
}
