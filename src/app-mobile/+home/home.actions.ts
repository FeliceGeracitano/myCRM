import { Action } from '@ngrx/store';
import { SuccessPayload, TRIP_TYPE } from './home.models';
import { Dijkstra } from '../../shared/dijkstra-graph/dijstra-graph.service';

export class ActionTypes {
  static readonly FETCH_DEALS_START = '[Deals] Start';
  static readonly FETCH_DEALS_SUCCESS = '[Deals] Success';
  static readonly FETCH_DEALS_ERROR = '[Deals] Error';
  static readonly UPDATE_FROM = '[Select Widget] Update From';
  static readonly UPDATE_TO = '[Select Widget] Update To';
  static readonly UPDATE_TRIP = '[Select Widget] Update Trip';
  static readonly SHOW_LIST = '[Select Widget] Show List';
  static readonly HIDE_LIST = '[Select Widget] Hide List';
  static readonly GRAPH_TIME_BUILT = '[DEALS] Graphs time Built';
  static readonly GRAPH_COST_BUILT = '[DEALS] Graphs cost Built';
}

export class FetchStartAction implements Action {
  readonly type = ActionTypes.FETCH_DEALS_START;
  constructor() {}
}

export class FetchSuccessAction implements Action {
  readonly type = ActionTypes.FETCH_DEALS_SUCCESS;
  constructor(public payload: SuccessPayload) {}
}

export class FetchErrorAction implements Action {
  readonly type = ActionTypes.FETCH_DEALS_ERROR;
  constructor() {}
}

export class UpdateFromAction implements Action {
  readonly type = ActionTypes.UPDATE_FROM;
  constructor(public payload: string) {}
}

export class UpdateToAction implements Action {
  readonly type = ActionTypes.UPDATE_TO;
  constructor(public payload: string) {}
}

export class UpdateTripType implements Action {
  readonly type = ActionTypes.UPDATE_TRIP;
  constructor(public payload: TRIP_TYPE) {}
}

export class ShowListAction implements Action {
  readonly type = ActionTypes.SHOW_LIST;
  constructor() {}
}

export class HideListAction implements Action {
  readonly type = ActionTypes.HIDE_LIST;
  constructor() {}
}

export class GraphTimeAction implements Action {
  readonly type = ActionTypes.GRAPH_TIME_BUILT;
  constructor(public payload: Dijkstra) {}
}

export class GraphCostAction implements Action {
  readonly type = ActionTypes.GRAPH_COST_BUILT;
  constructor(public payload: Dijkstra) {}
}

export type Actions =
  | FetchStartAction
  | FetchSuccessAction
  | FetchErrorAction
  | UpdateFromAction
  | UpdateToAction
  | UpdateTripType
  | ShowListAction
  | HideListAction
  | GraphTimeAction
  | GraphCostAction;
