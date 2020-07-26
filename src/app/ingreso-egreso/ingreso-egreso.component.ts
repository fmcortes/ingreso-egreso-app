import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

import * as uiActions from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoForm: FormGroup;
  tipo: string = 'ingreso';
  isLoading: boolean = false;
  loadingSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    //subscribe the store
    this.loadingSubs = this.store
      .select('ui')
      .subscribe((state) => (this.isLoading = state.isLoading));

    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  guardar() {
    if (this.ingresoForm.invalid) {
      return;
    }
    this.store.dispatch(uiActions.isLoading());
    const { descripcion, monto } = this.ingresoForm.value;

    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    this.ingresoEgresoService
      .crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.ingresoForm.reset();
        Swal.fire('Registro creado', descripcion, 'success');
      })
      .catch((err) => Swal.fire('Error', err.message, 'error'))
      .finally(() => this.store.dispatch(uiActions.stopLoading()));
  }
}
