import { Action } from '@ngrx/store';

export class ActionTypes {
  static readonly LOADING_START = '[App] Loading start';
  static readonly LOADING_END = '[App] Loading end';
}

export class StartAction implements Action {
  readonly type = ActionTypes.LOADING_START;
  public static of() {
    return new StartAction();
  }
  constructor() {}
}

export class EndAction implements Action {
  readonly type = ActionTypes.LOADING_END;
  public static of() {
    return new EndAction();
  }
  constructor() {}
}

export type Action = StartAction | EndAction;
