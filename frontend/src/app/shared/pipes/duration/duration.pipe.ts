import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(duration: number): string {
    let hours = duration / 60;
    hours=Math.floor(hours)
    let minutes = duration % 60;
 
    if (hours == 0) return  minutes + ' min';
    else if (minutes == 0) return hours + ' h';
    else return hours + ' h ' + minutes + ' min';
  }
}
