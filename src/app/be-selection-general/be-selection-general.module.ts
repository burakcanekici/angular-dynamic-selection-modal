import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';

import { BeSelectionFormComponent } from './be-selection-form/be-selection-form.component';
import { BeSelectionModalComponent } from './be-selection-modal/be-selection-modal.component';
import { BeSelectionSearchComponent } from './be-selection-search/be-selection-search.component';
import { BeSelectionListComponent } from './be-selection-list/be-selection-list.component';

import { AgGridModule } from "ag-grid-angular";

import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    MatGridListModule
  ],
  declarations: [
    BeSelectionFormComponent,
    BeSelectionModalComponent,
    BeSelectionSearchComponent,
    BeSelectionListComponent
  ],
  exports: [
    BeSelectionFormComponent,
    BeSelectionModalComponent,
    BeSelectionSearchComponent,
    BeSelectionListComponent
  ],
  entryComponents: [
    BeSelectionModalComponent
  ]
})
export class BeSelectionGeneralModule { }