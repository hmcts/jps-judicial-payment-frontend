import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SittingRecordsComponent } from './sitting-records.component';
import { SittingRecordsRoutingModule } from './sitting-records-routing.module';
import { ManageSittingRecordsComponent } from './manage-sitting-records/manage-sitting-records.component';
import { ViewSittingRecordsComponent } from './view-sitting-records/view-sitting-records.component';
import { NumberDirective } from '../_directives/numbers-only.directive';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { SittingRecordsLandingComponent } from './sitting-records-landing/sitting-records-landing.component';
import { SittingRecordsLandingManageRecordsComponent } from './sitting-records-landing/sitting-records-landing-manage-records/sitting-records-landing-manage-records.component';

import { DataTablesModule } from "angular-datatables";

import { CapitalizeFirstLetterPipe } from '../_pipes/convertTableStatus'

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
    ViewSittingRecordsComponent,
    NumberDirective,
    SittingRecordsLandingComponent,
    SittingRecordsLandingManageRecordsComponent,
    CapitalizeFirstLetterPipe
  ]
})
export class SittingRecordsModule { }
