import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(value: String): any {
    console.log(value.split(''))
    return value.split('');
  }

}
