import { Actions, ActionTypes } from './home.actions';
import { Deal, TRIP_TYPE } from './home.models';
import { Dijkstra } from '../../shared/dijkstra-graph/dijstra-graph.service';
import { filter, map, pipe, uniq } from 'ramda';
import { InitialState } from './home.reducer';
import { State } from '../reducers/index';
import { getDealThatMatchThis } from './home.utils';

export interface InitialState {
  currency: string | undefined;
  deals: Deal[];
  from: string | undefined;
  to: string | undefined;
  type: TRIP_TYPE;
  showList: boolean;
  costGraph: Dijkstra;
  timeGraph: Dijkstra;
}

export const initialState: InitialState = {
  currency: undefined,
  deals: [],
  from: undefined,
  to: undefined,
  type: TRIP_TYPE.FAST,
  showList: false,
  costGraph: new Dijkstra(),
  timeGraph: new Dijkstra()
};

export function homeReducer(state = initialState, action: Actions): any {
  switch (action.type) {
    case ActionTypes.FETCH_DEALS_START:
      return state;
    case ActionTypes.FETCH_DEALS_SUCCESS:
      return {
        ...state,
        currency: action.payload.currency,
        deals: action.payload.deals
      };
    case ActionTypes.UPDATE_FROM:
      return {
        ...state,
        from: action.payload
      };
    case ActionTypes.UPDATE_TO:
      return {
        ...state,
        to: action.payload
      };
    case ActionTypes.UPDATE_TRIP:
      return {
        ...state,
        type: action.payload
      };
    case ActionTypes.SHOW_LIST:
      return {
        ...state,
        showList: true
      };
    case ActionTypes.HIDE_LIST:
      return {
        ...state,
        showList: false
      };

    case ActionTypes.GRAPH_COST_BUILT:
      return {
        ...state,
        costGraph: action.payload
      };
    case ActionTypes.GRAPH_TIME_BUILT:
      return {
        ...state,
        timeGraph: action.payload
      };
    default:
      return state;
  }
}

type StateWithLazyLoadedSlice = State & { home: InitialState };

export function getCurrency(state: StateWithLazyLoadedSlice): string {
  return state.home.currency;
}

export function getFrom(state: StateWithLazyLoadedSlice): string {
  return state.home.from;
}

export function getDepartureList(state: StateWithLazyLoadedSlice): string[] {
  const list = pipe(
    map(deal => deal.departure),
    uniq,
    filter(location => location !== state.home.to)
  )(state.home.deals);
  return list;
}

export function getArrivalsList(state: StateWithLazyLoadedSlice): string[] {
  const list = pipe(
    map(deal => deal.arrival),
    uniq,
    filter(location => location !== state.home.from)
  )(state.home.deals);
  return list;
}

export function getTo(state: StateWithLazyLoadedSlice): string {
  return state.home.to;
}

export function getType(state: StateWithLazyLoadedSlice): TRIP_TYPE {
  return state.home.type;
}

export function showList(state: StateWithLazyLoadedSlice): boolean {
  return state.home.showList;
}

export function getDeals(state: StateWithLazyLoadedSlice): Deal[] {
  if (!state.home.from || !state.home.to) {
    return [];
  }

  let graph = state.home.costGraph;
  let costProperty = 'finalCost';
  if (state.home.type === TRIP_TYPE.FAST) {
    graph = state.home.timeGraph;
    costProperty = 'totalMinutes';
  }
  const bestPath = graph.shortestPath(state.home.from, state.home.to);
  const stepWithIndividualCost = bestPath.map(
    (el, index) => (index > 0 ? { ...el, cost: el.cost - bestPath[index - 1].cost } : el)
  );
  const deal = stepWithIndividualCost.reduce((acc, _, index, steps) => {
    if (index > steps.length - 2) {
      return acc;
    }
    acc.push(
      getDealThatMatchThis(
        state.home.deals,
        steps[index].key,
        steps[index + 1].key,
        costProperty,
        steps[index + 1].cost
      )
    );
    return acc;
  }, []);
  return deal;
}
