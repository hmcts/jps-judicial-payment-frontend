import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SittingRecordsComponent } from './sitting-records.component';
import { ManageSittingRecordsComponent } from './manage-sitting-records/manage-sitting-records.component';
import { ViewSittingRecordsComponent } from './view-sitting-records/view-sitting-records.component';
import { SittingRecordsGuard } from '../_guards/sitting-records.guard';

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
          }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SittingRecordsRoutingModule { }