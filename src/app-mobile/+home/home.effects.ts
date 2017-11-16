import * as homeActions from './home.actions';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { serverResponse } from '../../assets/server-respose';
import { SuccessPayload } from './home.models';
import { buildCostGraph, buildTimeGraph, parseServerResponse } from './home.utils';

@Injectable()
export class HomeEffects {
  @Effect()
  public deals$: Observable<Action> = this.actions$
    .ofType(homeActions.ActionTypes.FETCH_DEALS_START)
    .map(() => parseServerResponse(serverResponse))
    .map(response => new homeActions.FetchSuccessAction(response as SuccessPayload));

  @Effect()
  public buildCostGraph$: Observable<Action> = this.actions$
    .ofType(homeActions.ActionTypes.FETCH_DEALS_SUCCESS)
    .map(buildCostGraph)
    .map(response => new homeActions.GraphCostAction(response));

  @Effect()
  public buildTimeGraph$: Observable<Action> = this.actions$
    .ofType(homeActions.ActionTypes.FETCH_DEALS_SUCCESS)
    .map(buildTimeGraph)
    .map(response => new homeActions.GraphTimeAction(response));

  constructor(private actions$: Actions) {}
}
