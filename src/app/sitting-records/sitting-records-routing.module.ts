import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SittingRecordsComponent } from './sitting-records.component';
import { ManageSittingRecordsComponent } from './manage-sitting-records/manage-sitting-records.component';
import { ViewSittingRecordsComponent } from './view-sitting-records/view-sitting-records.component';
import { AddSittingRecordComponent } from './add-sitting-record/add-sitting-record.component'
import { SittingRecordsGuard } from '../_guards/sitting-records.guard';
import { AddSittingRecordSuccessComponent } from './add-sitting-record-success/add-sitting-record-success.component';

const routes: Routes = [
    {
        path: "sittingRecords",
        component: SittingRecordsComponent,
        children: [
          {
            path: '',
            redirectTo: 'manage',
            pathMatch: 'prefix'
          },
          {
            path: 'manage',
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
            path: 'addSuccess',
            component: AddSittingRecordSuccessComponent,
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
