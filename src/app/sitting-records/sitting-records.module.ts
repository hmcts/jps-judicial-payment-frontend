import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SittingRecordsComponent } from './sitting-records.component';
import { SittingRecordsRoutingModule } from './sitting-records-routing.module';
import { ManageSittingRecordsComponent } from './manage-sitting-records/manage-sitting-records.component';
import { PhaseBannerComponent } from '../phase-banner/phase-banner.component';
import { ViewSittingRecordsComponent } from './view-sitting-records/view-sitting-records.component';
import { NumberDirective } from '../_directives/numbers-only.directive';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';

import { DataTablesModule } from "angular-datatables";
import { DeleteSuccessComponent } from './delete-sitting-records/delete-success/delete-success.component';
import { DeleteSittingRecordsComponent } from './delete-sitting-records/delete-sitting-records.component'

import { StringFromDatePipe } from '../_pipes/string-date-pipe'
import { ConvertToStringPeriodPipe } from '../_pipes/convert-period-pipe'
@NgModule({
  imports: [
    CommonModule,
    SittingRecordsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    MatAutocompleteModule,
    HttpClientModule
  ],
  declarations: [
    SittingRecordsComponent,
    ManageSittingRecordsComponent,
    PhaseBannerComponent,
    ViewSittingRecordsComponent,
    DeleteSittingRecordsComponent,
    DeleteSuccessComponent,
    NumberDirective,
    StringFromDatePipe,
    ConvertToStringPeriodPipe
  ]
})
export class SittingRecordsModule { }
