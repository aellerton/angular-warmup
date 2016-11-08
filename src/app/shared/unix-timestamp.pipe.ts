import { Pipe, PipeTransform } from '@angular/core';

import {NumberWrapper, isBlank, isDate} from '@angular/common/src/facade/lang';
import {InvalidPipeArgumentError} from '@angular/common/src/pipes/invalid_pipe_argument_error';

@Pipe({
  name: 'unixTimestamp'
})
export class UnixTimestampPipe implements PipeTransform {

  transform(value: any, valueIfEmpty: any, args?: any): any {
    if (value === undefined || value === null || value === "") {
      return valueIfEmpty; // ok if null
    }

    /*
    if its an integer 
    d = new Date(value*1000);
    if it's a date 
    return date
    */

    if (isDate(value)) {
      return value;
    } 
    
    if (NumberWrapper.isNumeric(value)) {
      return new Date(parseFloat(value)*1000);
    }

    //return "this will be unix timestamp "+value;
    throw new InvalidPipeArgumentError(UnixTimestampPipe, value);
  }
}
