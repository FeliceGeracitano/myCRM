import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { State } from './reducers/index';
import { StartAction, EndAction } from './app.actions';

const ROUTER_NAVIGATION_END = 'ROUTER_NAVIGATION_END';
const ROUTER_NAVIGATION_START = 'ROUTER_NAVIGATION_START';

@Injectable()
export class AppEffects {
  @Effect()
  public changeRouteStart$: Observable<Action> = this.actions$
    .ofType(ROUTER_NAVIGATION_START)
    .map(StartAction.of);

  @Effect()
  public changeRouteEnd$: Observable<Action> = this.actions$
    .ofType(ROUTER_NAVIGATION_END)
    .map(EndAction.of);

  constructor(private actions$: Actions, private router: Router, private store: Store<State>) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.store.dispatch({ type: ROUTER_NAVIGATION_START });
      }
      if (e instanceof NavigationEnd) {
        this.store.dispatch({ type: ROUTER_NAVIGATION_END });
      }
    });
  }
}
