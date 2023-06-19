import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SittingRecordsComponent } from './sitting-records.component';
import { SittingRecordsRoutingModule } from './sitting-records-routing.module';
import { ManageSittingRecordsComponent } from './manage-sitting-records/manage-sitting-records.component';
import { PhaseBannerComponent } from '../phase-banner/phase-banner.component';
import { ViewSittingRecordsComponent } from './view-sitting-records/view-sitting-records.component';
import { NumberDirective } from '../_directives/numbers-only.directive';
import { AddSittingRecordComponent } from './add-sitting-record/add-sitting-record.component';
import { AddSittingRecordSuccessComponent } from './add-sitting-record/add-sitting-record-success/add-sitting-record-success.component'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddSittingRecordsConfirmComponent } from './add-sitting-record/add-sitting-records-confirm/add-sitting-records-confirm.component';
import { DuplicateSittingRecordsComponent } from './duplicate-sitting-records/duplicate-sitting-records.component';
import { PotentialDuplicateComponent } from './duplicate-sitting-records/potential-duplicate/potential-duplicate.component';
import { InvalidDuplicateComponent } from './duplicate-sitting-records/invalid-duplicate/invalid-duplicate.component';
import { ErrorSummaryComponent } from '../error-summary/error-summary.component'

@NgModule({
  imports: [
    CommonModule,
    SittingRecordsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatFormFieldModule
  ],
  declarations: [
    SittingRecordsComponent,
    ManageSittingRecordsComponent,
    PhaseBannerComponent,
    ViewSittingRecordsComponent,
    NumberDirective,
    AddSittingRecordComponent,
    AddSittingRecordSuccessComponent,
    NumberDirective,
    AddSittingRecordsConfirmComponent,
    DuplicateSittingRecordsComponent,
    PotentialDuplicateComponent,
    InvalidDuplicateComponent,
    ErrorSummaryComponent
  ]
})
export class SittingRecordsModule { }
