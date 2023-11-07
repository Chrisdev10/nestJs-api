import { Pipe, PipeTransform } from '@angular/core';
import { FormError } from '../../ui/form/type';

@Pipe({
  name: 'concat',
  standalone: true,
})
export class ConcatPipe implements PipeTransform {
  transform(value: string, args: FormError): string {
    // simple concatenation to make output string matching the i18n keys
    return value.concat(`${args.control}-${args.error}`);
  }
}
