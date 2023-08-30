import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SittingRecordsComponent } from './sitting-records.component';
import { SittingRecordsRoutingModule } from './sitting-records-routing.module';
import { ManageSittingRecordsComponent } from './manage-sitting-records/manage-sitting-records.component';
import { ViewSittingRecordsComponent } from './view-sitting-records/view-sitting-records.component';
import { NumberDirective } from '../_directives/numbers-only.directive';
import { AddSittingRecordComponent } from './add-sitting-record/add-sitting-record.component';
import { AddSittingRecordSuccessComponent } from './add-sitting-record/add-sitting-record-success/add-sitting-record-success.component'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddSittingRecordsConfirmComponent } from './add-sitting-record/add-sitting-records-confirm/add-sitting-records-confirm.component';
import { DuplicateSittingRecordsComponent } from './duplicate-sitting-records/duplicate-sitting-records.component';
import { PotentialDuplicateComponent } from './duplicate-sitting-records/potential-duplicate/potential-duplicate.component';
import { InvalidDuplicateComponent } from './duplicate-sitting-records/invalid-duplicate/invalid-duplicate.component';
import { ErrorSummaryComponent } from '../error-summary/error-summary.component'
import { SittingRecordsLandingComponent } from './sitting-records-landing/sitting-records-landing.component';
import { SittingRecordsLandingManageRecordsComponent } from './sitting-records-landing/sitting-records-landing-manage-records/sitting-records-landing-manage-records.component';

import { DataTablesModule } from "angular-datatables";

import { CapitalizeFirstLetterPipe } from '../_pipes/convertTableStatus'
import { SittingRecordsInfoBannerComponent } from '../sitting-records-info-banner/sitting-records-info-banner.component';
import { ValidSittingRecordsComponent } from './duplicate-sitting-records/valid-sitting-records/valid-sitting-records.component';

@NgModule({
  imports: [
    CommonModule,
    SittingRecordsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatFormFieldModule
  ],
  declarations: [
    SittingRecordsComponent,
    ManageSittingRecordsComponent,
    ViewSittingRecordsComponent,
    NumberDirective,
    AddSittingRecordComponent,
    AddSittingRecordSuccessComponent,
    NumberDirective,
    AddSittingRecordsConfirmComponent,
    DuplicateSittingRecordsComponent,
    PotentialDuplicateComponent,
    InvalidDuplicateComponent,
    ErrorSummaryComponent,
    SittingRecordsLandingComponent,
    SittingRecordsLandingManageRecordsComponent,
    CapitalizeFirstLetterPipe,
    SittingRecordsInfoBannerComponent,
    ValidSittingRecordsComponent,
    SittingRecordsInfoBannerComponent,
    AddSittingRecordsConfirmComponent,
    SittingRecordsLandingComponent,
    SittingRecordsLandingManageRecordsComponent,
    CapitalizeFirstLetterPipe
  ]
})
export class SittingRecordsModule { }
