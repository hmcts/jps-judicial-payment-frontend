import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SittingRecordsComponent } from './sitting-records.component';
import { SittingRecordsRoutingModule } from './sitting-records-routing.module';
import { ManageSittingRecordsComponent } from './manage-sitting-records/manage-sitting-records.component';
import { PhaseBannerComponent } from '../static-elements/phase-banner/phase-banner.component';
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
import { SittingRecordsLandingManageRecordsComponent } from './sitting-records-landing/sitting-records-landing-manage-records/sitting-records-landing-manage-records.component';

import { DataTablesModule } from "angular-datatables";
import { DeleteSuccessComponent } from './delete-sitting-records/delete-success/delete-success.component';
import { DeleteSittingRecordsComponent } from './delete-sitting-records/delete-sitting-records.component'

import { StringFromDatePipe } from '../_pipes/string-date-pipe'
import { ConvertToStringPeriodPipe, ConvertAddPeriodPipe } from '../_pipes/convert-period-pipe'
import { JPFooterComponent } from '../static-elements/jp-footer/jp-footer.component';
import { JPHeaderComponent } from '../static-elements/jp-header/jp-header.component';
import { CookieManagerComponent } from '../static-elements/cookies/cookie-manager/cookie-manager.component';
import { LogoutComponent } from '../static-elements/logout/logout.component';
import { CapitalizeFirstLetterPipe } from '../_pipes/convertTableStatus'

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
    PhaseBannerComponent,
    ViewSittingRecordsComponent,
    DeleteSittingRecordsComponent,
    DeleteSuccessComponent,
    NumberDirective,
    StringFromDatePipe,
    ConvertToStringPeriodPipe,
    ConvertAddPeriodPipe,
    AddSittingRecordComponent,
    AddSittingRecordSuccessComponent,
    NumberDirective,
    SittingRecordsInfoBannerComponent,
    AddSittingRecordsConfirmComponent,
    JPFooterComponent,
    JPHeaderComponent,
    CookieManagerComponent,
    LogoutComponent,
    NumberDirective,
    SittingRecordsLandingComponent,
    SittingRecordsLandingManageRecordsComponent,
    CapitalizeFirstLetterPipe
  ]
})
export class SittingRecordsModule { }
