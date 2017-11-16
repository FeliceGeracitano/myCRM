import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { Observable } from 'rxjs/Observable';
import { getFrom, getTo } from '../../+home/home.reducer';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
  from$: Observable<string>;
  to$: Observable<string>;
  fromCoordinated: any;
  toCoordinated: any;

  constructor(private store: Store<State>, private http: HttpClient) {}

  ngOnInit(): void {
    this.from$ = this.store.select(getFrom);
    this.to$ = this.store.select(getTo);

    this.from$
      .filter(el => !!el)
      .switchMap(address => this.http.get(this.getUrl(address)))
      .subscribe((resp: any) => {
        this.fromCoordinated = resp.results[0] && resp.results[0].geometry.location;
      });
    this.to$
      .filter(el => !!el)
      .switchMap(address => this.http.get(this.getUrl(address)))
      .catch(() => undefined)
      .subscribe((resp: any) => {
        this.toCoordinated = resp.results[0] && resp.results[0].geometry.location;
      });
  }

  getUrl(address) {
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${
      address
    }&key=AIzaSyCeyqSqRLRSFtOi_P7CAgx9x3TA497y348`;
  }
}
