import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationRoutingComponent } from './components/routing/application-routing.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: ApplicationRoutingComponent, pathMatch:'full' },
  { path: '', loadChildren: () => import('./sitting-records/sitting-records.module').then(m => m.SittingRecordsModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
