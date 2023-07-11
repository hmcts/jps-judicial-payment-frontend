import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SittingRecordsComponent } from './sitting-records.component';
import { ManageSittingRecordsComponent } from './manage-sitting-records/manage-sitting-records.component';
import { ViewSittingRecordsComponent } from './view-sitting-records/view-sitting-records.component';
import { DeleteSittingRecordsComponent } from './delete-sitting-records/delete-sitting-records.component'
import { DeleteSuccessComponent } from './delete-sitting-records/delete-success/delete-success.component'
import { SittingRecordsGuard } from '../_guards/sitting-records/sitting-records.guard';
import { AuthGuard } from '../_guards/auth/auth.guard';

const routes: Routes = [
    {
        path: "sittingRecords",
        component: SittingRecordsComponent,
        children: [
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
            path: 'delete',
            component: DeleteSittingRecordsComponent,
            canActivate: [SittingRecordsGuard],
          },
          {
            path: 'deleteSuccess',
            component: DeleteSuccessComponent,
            canActivate: [SittingRecordsGuard],
          }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SittingRecordsRoutingModule { }
