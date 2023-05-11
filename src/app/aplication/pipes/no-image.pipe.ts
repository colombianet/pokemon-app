import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImage',
})
export class NoImagePipe implements PipeTransform {
  transform(value: string): string {
    return value.includes('https')
      ? value
      : 'https://static.thenounproject.com/png/4209386-200.png';
  }
}
