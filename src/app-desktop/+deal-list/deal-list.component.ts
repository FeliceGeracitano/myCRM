import { add, map, pipe, reduce } from 'ramda';
import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { State } from './../reducers/index';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Deal, COST_PROPERTY } from './../+home/home.models';
import { TRIP_TYPE } from '../+home/home.models';
import { getType, getDeals, getCurrency } from '../+home/home.reducer';

@Component({
  selector: 'app-list',
  templateUrl: 'deal-list.component.html',
  styleUrls: ['deal-list.component.scss'],
  providers: [CurrencyPipe]
})
export class DealListComponent implements OnDestroy {
  list$: Observable<Deal[]>;
  total$: Observable<number>;
  costProperty = '';
  costLabel = '';
  currencyCode = '';
  typeSubscription: Subscription;
  currencySubscription: Subscription;

  constructor(private store: Store<State>, private currencyPi: CurrencyPipe) {
    this.list$ = this.store.select(getDeals);
    this.typeSubscription = this.store.select(getType).subscribe(value => {
      if (value === TRIP_TYPE.CHEAP) {
        this.costProperty = COST_PROPERTY.finalCost;
        this.costLabel = 'Price';
      } else {
        this.costProperty = COST_PROPERTY.totalMinutes;
        this.costLabel = 'Time';
      }
    });
    this.currencySubscription = this.store.select(getCurrency).subscribe(value => {
      this.currencyCode = value;
    });
    this.total$ = this.store.select(getDeals).map(pipe(map(el => el.finalCost), reduce(add, 0)));
  }

  getStepWeight(deal: Deal) {
    if (this.costProperty === COST_PROPERTY.finalCost) {
      return this.currencyPi.transform(deal[this.costProperty], this.currencyCode);
    }
    return `${deal.duration.h} Hours and ${deal.duration.h} Minutes`;
  }

  ngOnDestroy(): void {
    this.typeSubscription.unsubscribe();
    this.currencySubscription.unsubscribe();
  }
}
