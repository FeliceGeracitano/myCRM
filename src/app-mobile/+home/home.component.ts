import { Observable } from 'rxjs/Observable';
import { FetchStartAction } from './home.actions';
import { State } from './../reducers/index';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { showList } from './home.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showList$: Observable<boolean>;
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.showList$ = this.store.select(showList);
    this.store.dispatch(new FetchStartAction());
  }
}
