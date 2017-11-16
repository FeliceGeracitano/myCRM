import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatRadioChange } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { OnDestroy, OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';
import { State } from './../reducers/index';
import { Subscription } from 'rxjs/Subscription';
import { TRIP_TYPE } from '../+home/home.models';
import { getDepartureList, getArrivalsList, getType, getFrom, getTo } from '../+home/home.reducer';
import { UpdateFromAction, UpdateToAction, UpdateTripType } from '../+home/home.actions';

@Component({
  selector: 'app-search-widget',
  templateUrl: 'search-widget.component.html',
  styleUrls: ['search-widget.component.scss']
})
export class SearchWidgetComponent implements OnInit, OnDestroy {
  TRIP_TYPE = TRIP_TYPE;
  arrivalCtrl: FormControl;
  arrivalsList: string[];
  arrivalsListSubscription: Subscription;
  checked$: Observable<TRIP_TYPE>;
  departureCtrl: FormControl;
  departureList$: Observable<string[]>;
  arrivalList$: Observable<string[]>;
  filteredArrivalList$: Observable<string[]>;
  filteredDepartureList$: Observable<string[]>;
  to$: Observable<string>;
  tripCtrl: FormControl;
  tripType: Observable<TRIP_TYPE>;

  constructor(private router: Router, private store: Store<State>) {
    this.departureCtrl = new FormControl();
    this.arrivalCtrl = new FormControl();
    this.tripCtrl = new FormControl();
  }

  ngOnInit(): void {
    this.departureList$ = this.store.select(getDepartureList);
    this.arrivalList$ = this.store.select(getArrivalsList);
    this.filteredDepartureList$ = this.departureCtrl.valueChanges
      .startWith(null)
      .switchMap(location => {
        this.checkEmptyValue(location, UpdateFromAction);
        return location ? this.filterLocation(this.departureList$, location) : this.departureList$;
      });

    this.filteredArrivalList$ = this.arrivalCtrl.valueChanges
      .startWith(null)
      .switchMap(location => {
        this.checkEmptyValue(location, UpdateToAction);
        return location ? this.filterLocation(this.arrivalList$, location) : this.arrivalList$;
      });

    this.checked$ = this.store.select(getType);
    Observable.combineLatest(this.store.select(getFrom), this.store.select(getTo))
      .take(1)
      .subscribe(locations => {
        this.departureCtrl.setValue(locations[0]);
        this.arrivalCtrl.setValue(locations[1]);
      });
  }

  onDepartureSelected(value: MatAutocompleteSelectedEvent) {
    this.store.dispatch(new UpdateFromAction(value.option.value));
  }

  onArrivalSelected(value: MatAutocompleteSelectedEvent) {
    this.store.dispatch(new UpdateToAction(value.option.value));
  }

  search() {
    this.router.navigate([
      `list/${this.departureCtrl.value}/${this.arrivalCtrl.value}/${this.tripCtrl.value}`
    ]);
  }

  changeTripType(value: MatRadioChange) {
    this.store.dispatch(new UpdateTripType(value.value));
  }

  ngOnDestroy(): void {
    this.arrivalsListSubscription.unsubscribe();
  }

  checkEmptyValue(location: string, action: any): any {
    if (location === '') {
      this.store.dispatch(new action(location));
    }
  }

  private filterLocation(collection$: Observable<string[]>, name: string): Observable<string[]> {
    return collection$.map(list =>
      list.filter(location => location.toLowerCase().indexOf(name.toLowerCase()) === 0)
    );
  }
}
