import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationRoutingComponent } from './components/routing/application-routing.component';
import { CookiePolicyComponent } from './static-elements/cookies/cookie-policy/cookie-policy.component'
import { AuthGuard } from './_guards/auth/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    canActivate: [AuthGuard], 
    component: ApplicationRoutingComponent, 
  },
  { 
    path: 'cookies', 
    component: CookiePolicyComponent, 
  }, 
  { 
    path: '', 
    loadChildren: () => import('./sitting-records/sitting-records.module').then(m => m.SittingRecordsModule) 
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
