import { AppComponent } from './components/app/app.component';
import { AppEffects } from './app.effects';
import { AppNavBarComponent } from './components/nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CustomRouterStateSerializer } from './utils';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { MatToolbarModule } from '@angular/material';
import { metaReducers, reducers } from './reducers';
import { NgModule } from '@angular/core';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import './rxjs-imports';

@NgModule({
  declarations: [AppComponent, AppNavBarComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    MatToolbarModule
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule {}
