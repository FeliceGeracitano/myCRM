import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { DealListComponent } from './deal-list.component';
import { MapComponent } from '../components/map/map.component';
import { MatCardModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, AgmCoreModule, MatCardModule],
  declarations: [DealListComponent, MapComponent],
  exports: [DealListComponent, MapComponent]
})
export class DealListModule {}
