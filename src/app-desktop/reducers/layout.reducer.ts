import { State } from './index';
import { Action, ActionTypes } from '../app.actions';

export interface InitialState {
  loading: boolean;
}

export const initialState = {
  loading: false
};

export function layoutReducer(state = initialState, action: Action): any {
  switch (action.type) {
    case ActionTypes.LOADING_START:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.LOADING_END:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}

export function getLoading(state: State): boolean {
  return state.layout.loading;
}
