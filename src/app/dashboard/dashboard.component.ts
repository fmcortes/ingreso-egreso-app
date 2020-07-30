import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  ingresosSubscription: Subscription;
  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.store
      .select('user')
      .pipe(filter((auth) => auth.user !== null))
      .subscribe(({ user }) => {
        this.ingresosSubscription = this.ingresoEgresoService
          .initiIngresosEgresosListener(user.uid)
          .subscribe((ingresoEgresosFb) => {
            this.store.dispatch(
              ingresoEgresoActions.setItems({ items: ingresoEgresosFb })
            );
          });
      });
  }
  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.ingresosSubscription?.unsubscribe();
  }
}
