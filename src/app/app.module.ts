import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JPFooterComponent } from './static-elements/jp-footer/jp-footer.component';
import { JPHeaderComponent } from './static-elements/jp-header/jp-header.component';
import { SittingRecordsModule } from './sitting-records/sitting-records.module';
import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader'
import { CookieManagerComponent } from './static-elements/cookies/cookie-manager/cookie-manager.component';
import { CookiePolicyComponent } from './static-elements/cookies/cookie-policy/cookie-policy.component';
import { LogoutComponent } from './static-elements/logout/logout.component';
import { LoaderComponent } from './static-elements/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    JPFooterComponent,
    JPHeaderComponent,
    CookieManagerComponent,
    CookiePolicyComponent,
    LogoutComponent,
    LoaderComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    NgHttpLoaderModule.forRoot(),
    AppRoutingModule,
    SittingRecordsModule,
    DataTablesModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
