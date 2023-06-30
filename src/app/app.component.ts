import { Component } from '@angular/core';
import { UserInfoService } from './_services/user-info-service/user-info-service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private cookies: CookieService,
    private uInfoSvc: UserInfoService,
  ){}

  ngOnInit(){
    this.setUserInfoValues();
  }

  setUserInfoValues(){
    if(this.cookies.get('__userid__')){
      const userInfoCookie = this.cookies.get('__userid__')
      this.uInfoSvc.setUserInfo(userInfoCookie);
    }
  }
}
