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
import { SittingRecordsLandingManageRecordsSubmitterComponent } from './sitting-records-landing/sitting-records-landing-manage-records-submitter/sitting-records-landing-manage-records-submitter.component';

import { DataTablesModule } from "angular-datatables";
import { SubmitSittingRecordsComponent } from './submit-sitting-records/submit-sitting-records.component';
import { SittingRecordsLandingManageRecordsPublisherComponent } from './sitting-records-landing/sitting-records-landing-manage-records-publisher/sitting-records-landing-manage-records-publisher.component';

import { TribunalServiceComponent } from './shared-components/tribunal-service/tribunal-service.component';
import { VenueComponent } from './shared-components/venue/venue.component';
import { SittingDateComponent } from './shared-components/sitting-date/sitting-date.component';
import { RegionComponent } from './shared-components/region/region.component';
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
    SittingRecordsLandingManageRecordsSubmitterComponent,
    TribunalServiceComponent,
    VenueComponent,
    SittingDateComponent,
    RegionComponent,
    SittingRecordsLandingManageRecordsPublisherComponent,
    SubmitSittingRecordsComponent,
    CapitalizeFirstLetterPipe
  ]
})
export class SittingRecordsModule { }
