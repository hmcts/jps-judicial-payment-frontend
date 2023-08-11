import { Component, OnInit } from '@angular/core';
import cookieManager from '@hmcts/cookie-manager';

@Component({
  selector: 'app-cookie-manager',
  templateUrl: './cookie-manager.component.html',
  styleUrls: ['./cookie-manager.component.scss']
})
export class CookieManagerComponent implements OnInit {


  ngOnInit() {

    const config = {
      userPreferences: {
        cookieName: 'jps-cookie-preferences',
      },
      cookieManifest: [
        {
          categoryName: 'essential',
          optional: false,
          matchBy: 'exact',
          cookies: [
            '__auth__',
            '__serviceauth__',
            '__userid__',
            '__userrole__',
            'XSRF-TOKEN'
          ]
        },
        {
          categoryName: 'analytics',
          cookies: [
            '_analytics_'
          ]
        },
        {
          categoryName: 'apm',
          cookies: [
            '_apm_'
          ]
        }
      ]
    };

    cookieManager.init(config);

  }

}
