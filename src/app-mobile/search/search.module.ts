import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SearchWidgetComponent } from './search-widget.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule
  ],
  declarations: [SearchWidgetComponent],
  exports: [SearchWidgetComponent]
})
export class SearchModule {}
