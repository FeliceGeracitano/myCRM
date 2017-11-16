import { Deal } from './home.models';
import { Dijkstra } from '../../shared/dijkstra-graph/dijstra-graph.service';
import { FetchSuccessAction } from './home.actions';
import { groupBy } from 'ramda';

const groupByDeparture = groupBy((deal: Deal) => deal.departure);
const groupByArrival = groupBy((deal: Deal) => deal.arrival);
const getBestDeal = (deals: Deal[], parameter): Deal => {
  return deals.sort((a, b) => a[parameter] - b[parameter])[0];
};

export const buildGraph = (action: FetchSuccessAction, propertyName): Dijkstra => {
  const graph = new Dijkstra();
  const byDeparture = groupByDeparture(action.payload.deals);
  Object.keys(byDeparture).forEach(departure => {
    const byArrivals = groupByArrival(byDeparture[departure]);
    const bestDeals = {};
    Object.keys(byArrivals).forEach(arrival => {
      const bestDeal = getBestDeal(byArrivals[arrival], propertyName);
      bestDeals[bestDeal.arrival] = bestDeal[propertyName];
    });
    graph.addVertex(departure, bestDeals);
  });
  return graph as Dijkstra;
};

export const buildCostGraph = (action: FetchSuccessAction) => buildGraph(action, 'finalCost');
export const buildTimeGraph = (action: FetchSuccessAction) => buildGraph(action, 'totalMinutes');

const dealMapper = (deal: any): Deal => ({
  ...deal,
  finalCost: deal.cost - deal.cost / 100 * deal.discount,
  totalMinutes: parseInt(deal.duration.h, 0) * 60 + parseInt(deal.duration.m, 0)
});

export const parseServerResponse = (response: any) => {
  return {
    currency: response.currency,
    deals: response.deals.map(dealMapper)
  };
};

export const getDealThatMatchThis = (
  deals: Deal[],
  departure: string,
  arrival: string,
  keyName: string,
  keyValue: number
): Deal =>
  deals.find(
    deal => deal.departure === departure && deal.arrival === arrival && deal[keyName] === keyValue
  );
