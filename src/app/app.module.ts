import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JPFooterComponent } from './jp-footer/jp-footer.component';
import { JPHeaderComponent } from './jp-header/jp-header.component';
import { SittingRecordsModule } from './sitting-records/sitting-records.module';
import { HttpClientModule } from '@angular/common/http';

import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
    JPFooterComponent,
    JPHeaderComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    SittingRecordsModule,
    DataTablesModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
