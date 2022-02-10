import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preparationTime',
})
export class PreparationTimePipe implements PipeTransform {
  transform(value: number): unknown {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    return `${hours}h ${minutes}m`;
  }
}
