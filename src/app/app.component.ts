import { Component } from '@angular/core';
import { UserInfoService } from './_services/user-info-service/user-info-service';
import { CookieService } from 'ngx-cookie-service';
import { LoaderComponent } from './static-elements/loader/loader.component'
import { DeleteSittingRecordHttp } from './_services/delete-sitting-records-http-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private cookies: CookieService,
    private uInfoSvc: UserInfoService,
    private dsrwfl: DeleteSittingRecordHttp
  ){}

  ngOnInit(){
    this.setUserInfoValues();
    this.callJPSService();
  }

  callJPSService(){
    console.log('hits the FE ')
    this.dsrwfl.deleteRecord('1').subscribe({
      next: (res) => {
        console.log(res)
        console.log('good response')
      }
    })
  }

  setUserInfoValues(){
    if(this.cookies.get('__userid__')){
      const userInfoCookie = this.cookies.get('__userid__')
      const userRoleCookie = this.cookies.get('__userrole__')
      this.uInfoSvc.setUserInfo(userInfoCookie, userRoleCookie);
    }
  }
  public spinnerComponent = LoaderComponent;

}
