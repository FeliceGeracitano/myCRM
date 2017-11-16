export interface Duration {
  h: string;
  m: string;
}

export interface Deal {
  transport: string;
  departure: string;
  arrival: string;
  duration: Duration;
  finalCost: number;
  totalMinutes: number;
  cost: number;
  discount: 0;
  reference: string;
}

export interface SuccessPayload {
  currency: string;
  deals: Deal[];
}

export enum TRIP_TYPE {
  CHEAP,
  FAST
}

export enum COST_PROPERTY {
  totalMinutes = 'totalMinutes',
  finalCost = 'finalCost'
}
