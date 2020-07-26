import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'sortIngreso',
})
export class SortIngresoPipe implements PipeTransform {
  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return items.slice().sort((a) => {
      if (a.tipo === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
