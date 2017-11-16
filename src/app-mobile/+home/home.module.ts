import { HomeEffects } from './home.effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './home.component';
import { homeReducer } from './home.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SearchModule } from '../search/search.module';

@NgModule({
  imports: [
    SearchModule,
    CommonModule,
    HomeRoutingModule,
    StoreModule.forFeature('home', homeReducer),
    EffectsModule.forFeature([HomeEffects])
  ],
  declarations: [HomeComponent]
})
export class HomeModule {}
