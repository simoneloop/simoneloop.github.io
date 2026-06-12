import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {


  // Variabile per indicare se il caricamento è in corso o meno
  public loading = false;
  public closeEndLoading=false;
  // Contatore per il caricamento
  public counter = 0;
  index=0

  constructor(private translate: TranslateService) {}


  getText(){
    const texts = this.translate.instant('loading.texts');
    return Array.isArray(texts) ? texts[this.index] : '';
  }

  // Metodo per avviare il caricamento
  startLoading() {
    if(!this.loading){
      const texts = this.translate.instant('loading.texts');
      this.index = Array.isArray(texts) ? Math.floor(Math.random() * texts.length) : 0;
      this.loading = true;
      this.closeEndLoading=false
      this.counter=0;
      const intervalId = setInterval(() => {
        this.counter++;

        if (this.counter === 100) {
          this.closeEndLoading=true

          // Se il contatore raggiunge 100, interrompi l'intervallo e imposta la variabile "loading" su false


          setTimeout(()=>{
            this.loading = false;
            clearInterval(intervalId);
          },450)

        }
      }, 20);
    }

  }



}
