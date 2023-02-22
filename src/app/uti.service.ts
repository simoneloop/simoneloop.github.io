import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtiService {

  constructor() { }
  getSplit(string:String) {
    return string.split('')
  }
}
