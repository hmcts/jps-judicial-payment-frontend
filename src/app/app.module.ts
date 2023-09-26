import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SittingRecordsModule } from './sitting-records/sitting-records.module';
import { DataTablesModule } from 'angular-datatables';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader'
import { CookiePolicyComponent } from './static-elements/cookies/cookie-policy/cookie-policy.component';
import { LoaderComponent } from './static-elements/loader/loader.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CookiePolicyComponent,
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
    CommonModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
