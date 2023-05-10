import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SittingRecordsComponent } from './sitting-records.component';
import { SittingRecordsRoutingModule } from './sitting-records-routing.module';
import { ManageSittingRecordsComponent } from './manage-sitting-records/manage-sitting-records.component';
import { PhaseBannerComponent } from '../phase-banner/phase-banner.component';
import { ViewSittingRecordsComponent } from './view-sitting-records/view-sitting-records.component';
import { DeleteSittingRecordsComponent } from './delete-sitting-records/delete-sitting-records.component';
import { NumberDirective } from '../_directives/numbers-only.directive';

import { DataTablesModule } from "angular-datatables";

@NgModule({
  imports: [
    CommonModule,
    SittingRecordsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  declarations: [
    SittingRecordsComponent,
    ManageSittingRecordsComponent,
    PhaseBannerComponent,
    ViewSittingRecordsComponent,
    NumberDirective,
    DeleteSittingRecordsComponent
  ],
})
export class SittingRecordsModule { }
