import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SittingRecordsComponent } from './sitting-records.component';
import { ManageSittingRecordsComponent } from './manage-sitting-records/manage-sitting-records.component';
import { ViewSittingRecordsComponent } from './view-sitting-records/view-sitting-records.component';
import { AddSittingRecordComponent } from './add-sitting-record/add-sitting-record.component'
import { AddSittingRecordSuccessComponent } from './add-sitting-record/add-sitting-record-success/add-sitting-record-success.component';
import { AddSittingRecordsConfirmComponent } from './add-sitting-record/add-sitting-records-confirm/add-sitting-records-confirm.component'
import { DuplicateSittingRecordsComponent } from './duplicate-sitting-records/duplicate-sitting-records.component'
import { SittingRecordsLandingComponent } from './sitting-records-landing/sitting-records-landing.component';
import { SittingRecordsViewGuard } from '../_guards/sitting-records/sitting-records-view.guard';
import { SittingRecordsLandingGuard } from '../_guards/sitting-records/sitting-records-landing.guard';
import { SittingRecordsManageGuard } from '../_guards/sitting-records/sitting-records-manage.guard';
import { AuthGuard } from '../_guards/auth/auth.guard';

const routes: Routes = [
    {
        path: "sittingRecords",
        canActivate:[AuthGuard],
        component: SittingRecordsComponent,
        children: [
          {
            path: 'home',
            canActivate: [AuthGuard, SittingRecordsLandingGuard],
            component: SittingRecordsLandingComponent
          },
          {
            path: 'manage',
            canActivate: [AuthGuard, SittingRecordsManageGuard],
            component: ManageSittingRecordsComponent
          },
          {
            path: 'view',
            component: ViewSittingRecordsComponent,
            canActivate: [SittingRecordsViewGuard]
          },
          {
            path: 'add',
            component: AddSittingRecordComponent,
            canActivate: [SittingRecordsViewGuard]
          },
          {
            path: 'addConfirm',
            component: AddSittingRecordsConfirmComponent,
            canActivate: [SittingRecordsViewGuard]
          },
          {
            path: 'addSuccess',
            component: AddSittingRecordSuccessComponent,
            canActivate: [SittingRecordsViewGuard]
          },
          {
            path: 'addDuplicates',
            component: DuplicateSittingRecordsComponent,
            canActivate: [SittingRecordsViewGuard]
          }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SittingRecordsRoutingModule { }
