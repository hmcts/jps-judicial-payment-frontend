import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JPFooterComponent } from './jp-footer/jp-footer.component';
import { JPHeaderComponent } from './jp-header/jp-header.component';
import { SittingRecordsModule } from './sitting-records/sitting-records.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CookieManagerComponent } from './cookies/cookie-manager/cookie-manager.component';
import { CookiePolicyComponent } from './cookies/cookie-policy/cookie-policy.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    JPFooterComponent,
    JPHeaderComponent,
    CookieManagerComponent,
    CookiePolicyComponent,
    LogoutComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    SittingRecordsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
