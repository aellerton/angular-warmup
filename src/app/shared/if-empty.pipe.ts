import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ifEmpty'
})
export class IfEmptyPipe implements PipeTransform {

  transform(value: any, alternative: any, args?: any): any {
    if (value) { // is this an adquate "truthy" test?
      return value;
    }
    return alternative;
  }

}
