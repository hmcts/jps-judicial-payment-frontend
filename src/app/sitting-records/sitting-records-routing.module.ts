import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SittingRecordsComponent } from './sitting-records.component';
import { ManageSittingRecordsComponent } from './manage-sitting-records/manage-sitting-records.component';
import { ViewSittingRecordsComponent } from './view-sitting-records/view-sitting-records.component';
import { DeleteSittingRecordsComponent } from './delete-sitting-records/delete-sitting-records.component'
import { DeleteSuccessComponent } from './delete-sitting-records/delete-success/delete-success.component'
import { AddSittingRecordComponent } from './add-sitting-record/add-sitting-record.component'
import { AddSittingRecordSuccessComponent } from './add-sitting-record/add-sitting-record-success/add-sitting-record-success.component';
import { AddSittingRecordsConfirmComponent } from './add-sitting-record/add-sitting-records-confirm/add-sitting-records-confirm.component'
import { SubmitSittingRecordsComponent } from './submit-sitting-records/submit-sitting-records.component';
import { SittingRecordsLandingComponent } from './sitting-records-landing/sitting-records-landing.component';
import { SittingRecordsViewGuard } from '../_guards/sitting-records/sitting-records-view.guard';
import { SittingRecordsLandingGuard } from '../_guards/sitting-records/sitting-records-landing.guard';
import { SittingRecordsManageGuard } from '../_guards/sitting-records/sitting-records-manage.guard';
import { SittingRecordsSubmitGuard } from '../_guards/sitting-records/sitting-records-submit.guard';
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
            path: 'delete',
            component: DeleteSittingRecordsComponent,
            canActivate: [SittingRecordsViewGuard],
          },
          {
            path: 'deleteSuccess',
            component: DeleteSuccessComponent,
            canActivate: [SittingRecordsViewGuard],
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
            path: 'submit',
            canActivate: [SittingRecordsSubmitGuard],
            component: SubmitSittingRecordsComponent
          },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SittingRecordsRoutingModule { }
