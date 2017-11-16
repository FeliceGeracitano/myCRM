import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { SearchWidgetComponent } from './search-widget.component';
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
