import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { State } from '../reducers/index';
import { Store } from '@ngrx/store';
import { UpdateTripType, UpdateFromAction, UpdateToAction } from './home.actions';

@Injectable()
export class ListResolver implements Resolve<any> {
  constructor(private store: Store<State>) {}
  resolve(route: ActivatedRouteSnapshot) {
    this.store.dispatch(new UpdateFromAction(route.params.from));
    this.store.dispatch(new UpdateToAction(route.params.to));
    this.store.dispatch(new UpdateTripType(parseInt(route.params.type, 0)));
  }
}
