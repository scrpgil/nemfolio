import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removezero',
})
export class RemovezeroPipe implements PipeTransform {
  transform(value: string) {
    return value.replace(/\.?0+$/g, '');
  }
}
