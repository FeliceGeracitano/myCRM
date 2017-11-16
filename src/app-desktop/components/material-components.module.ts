import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatToolbarModule
  ]
})
export class MaterialModule {}
