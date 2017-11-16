import { CommonModule } from '@angular/common';
import { DealListComponent } from './deal-list.component';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatCardModule],
  declarations: [DealListComponent],
  exports: [DealListComponent]
})
export class DealListModule {}
