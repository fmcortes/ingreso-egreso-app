import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const setItems = createAction(
  '[IngresooEgreso] setItems',
  props<{ items: IngresoEgreso[] }>()
);

export const unSeItems = createAction('[IngresooEgreso] unsetItems');
