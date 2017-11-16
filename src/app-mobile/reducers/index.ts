import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';
import { RouterStateUrl } from '../utils';
import * as fromRouter from '@ngrx/router-store';
import * as fromLayout from './layout.reducer';

export interface State {
  layout: fromLayout.InitialState;
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  layout: fromLayout.layoutReducer,
  routerReducer: fromRouter.routerReducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State, action: any): State => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: Array<MetaReducer<State>> = !environment.production
  ? [storeFreeze, logger]
  : [];
