import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { UserInfoService } from './_services/user-info-service/user-info-service';
import { JPFooterComponent } from './jp-footer/jp-footer.component';
import { JPHeaderComponent } from './jp-header/jp-header.component';
import { CookieManagerComponent } from './cookies/cookie-manager/cookie-manager.component';
import { LogoutComponent } from './logout/logout.component';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let cookies: CookieService;
  let uInfoSvc: UserInfoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, NgHttpLoaderModule],
      declarations: [AppComponent, JPFooterComponent, JPHeaderComponent, CookieManagerComponent, LogoutComponent],
      providers: [CookieService, UserInfoService]
    }).compileComponents();
    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    cookies = TestBed.inject(CookieService);
    uInfoSvc = TestBed.inject(UserInfoService);
    spyOn(uInfoSvc, 'setUserInfo');
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setUserInfoValues', () => {
    it('should set user info values if the cookies are present', () => {
      spyOn(cookies, 'get').and.callFake((key: string) => {
        if (key === '__userid__') {
          return 'j:["12348761248761","jps recorder"]';
        } else if (key === '__userrole__') {
          return ':i["jps-recorder"]';
        }
        return '';
      });
      component.setUserInfoValues();
      expect(uInfoSvc.setUserInfo).toHaveBeenCalledWith('j:["12348761248761","jps recorder"]', ':i["jps-recorder"]');
    });

    it('should not set user info values if the cookies are not present', () => {
      spyOn(cookies, 'get').and.returnValue('');
      component.setUserInfoValues();
      expect(uInfoSvc.setUserInfo).not.toHaveBeenCalled();
    });
  });
});
