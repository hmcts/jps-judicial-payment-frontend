import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SittingRecordsComponent } from './sitting-records.component';
import { ManageSittingRecordsComponent } from './manage-sitting-records/manage-sitting-records.component';
import { ViewSittingRecordsComponent } from './view-sitting-records/view-sitting-records.component';
import { AddSittingRecordComponent } from './add-sitting-record/add-sitting-record.component'
import { AddSittingRecordSuccessComponent } from './add-sitting-record/add-sitting-record-success/add-sitting-record-success.component';
import { AddSittingRecordsConfirmComponent } from './add-sitting-record/add-sitting-records-confirm/add-sitting-records-confirm.component'
import { DuplicateSittingRecordsComponent } from './duplicate-sitting-records/duplicate-sitting-records.component'
import { SittingRecordsGuard } from '../_guards/sitting-records/sitting-records.guard';
import { AuthGuard } from '../_guards/auth/auth.guard';

const routes: Routes = [
    {
        path: "",
        component: SittingRecordsComponent,
        children: [
          {
            path: '',
            redirectTo: 'manage',
            pathMatch: 'prefix'
          },
          {
            path: 'manage',
            canActivate: [AuthGuard],
            component: ManageSittingRecordsComponent
          },
          {
            path: 'view',
            component: ViewSittingRecordsComponent,
            canActivate: [SittingRecordsGuard]
          },
          {
            path: 'add',
            component: AddSittingRecordComponent,
            canActivate: [SittingRecordsGuard]
          },
          {
            path: 'addConfirm',
            component: AddSittingRecordsConfirmComponent,
            canActivate: [SittingRecordsGuard]
          },
          {
            path: 'addSuccess',
            component: AddSittingRecordSuccessComponent,
            canActivate: [SittingRecordsGuard]
          },
          {
            path: 'addDuplicates',
            component: DuplicateSittingRecordsComponent,
            canActivate: [SittingRecordsGuard]
          }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SittingRecordsRoutingModule { }
