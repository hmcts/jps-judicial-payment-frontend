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
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddSittingRecordsConfirmComponent } from './add-sitting-record/add-sitting-records-confirm/add-sitting-records-confirm.component';
import { SittingRecordsInfoBannerComponent } from './sitting-records-info-banner/sitting-records-info-banner.component';
import { SittingRecordsLandingComponent } from './sitting-records-landing/sitting-records-landing.component';
import { SittingRecordsLandingManageRecordsSubmitterComponent } from './sitting-records-landing/sitting-records-landing-manage-records-submitter/sitting-records-landing-manage-records-submitter.component';

import { DataTablesModule } from "angular-datatables";
import { SubmitSittingRecordsComponent } from './submit-sitting-records/submit-sitting-records.component';
import { SittingRecordsLandingManageRecordsPublisherComponent } from './sitting-records-landing/sitting-records-landing-manage-records-publisher/sitting-records-landing-manage-records-publisher.component';

import { TribunalServiceComponent } from './shared-components/tribunal-service/tribunal-service.component';
import { VenueComponent } from './shared-components/venue/venue.component';
import { SittingDateComponent } from './shared-components/sitting-date/sitting-date.component';
import { RegionComponent } from './shared-components/region/region.component';
import { DeleteSuccessComponent } from './delete-sitting-records/delete-success/delete-success.component';
import { DeleteSittingRecordsComponent } from './delete-sitting-records/delete-sitting-records.component'

import { StringFromDatePipe } from '../_pipes/string-date-pipe'
import { ConvertToStringPeriodPipe, ConvertAddPeriodPipe } from '../_pipes/convert-period-pipe'
import { JPFooterComponent } from '../static-elements/jp-footer/jp-footer.component';
import { JPHeaderComponent } from '../static-elements/jp-header/jp-header.component';
import { CookieManagerComponent } from '../static-elements/cookies/cookie-manager/cookie-manager.component';
import { LogoutComponent } from '../static-elements/logout/logout.component';
import { CapitalizeFirstLetterPipe } from '../_pipes/convertTableStatus'
import { ConvertRoleIdToString } from '../_pipes/convertRoleIdToString'

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
    DeleteSittingRecordsComponent,
    DeleteSuccessComponent,
    StringFromDatePipe,
    ConvertToStringPeriodPipe,
    ConvertAddPeriodPipe,
    AddSittingRecordComponent,
    AddSittingRecordSuccessComponent,
    SittingRecordsInfoBannerComponent,
    AddSittingRecordsConfirmComponent,
    JPFooterComponent,
    JPHeaderComponent,
    CookieManagerComponent,
    LogoutComponent,
    NumberDirective,
    SittingRecordsLandingComponent,
    SittingRecordsLandingManageRecordsSubmitterComponent,
    TribunalServiceComponent,
    VenueComponent,
    SittingDateComponent,
    RegionComponent,
    SittingRecordsLandingManageRecordsPublisherComponent,
    SubmitSittingRecordsComponent,
    CapitalizeFirstLetterPipe,
    ConvertRoleIdToString
  ]
})
export class SittingRecordsModule { }
