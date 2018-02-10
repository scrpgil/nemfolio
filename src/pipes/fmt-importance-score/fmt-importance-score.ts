import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FmtImportanceScorePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'fmtImportanceScore',
})
export class FmtImportanceScorePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.toLowerCase();
  }
}
