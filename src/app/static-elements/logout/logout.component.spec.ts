import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LogoutComponent } from './logout.component';
import { LogoutService } from '../../_services/auth/logout.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let logoutService: LogoutService;
  let router: Router;

  // Mock LogoutService
  class MockLogoutService {
    logout() {
      return of(Object); // Specify the type as Object
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoutComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: LogoutService, useClass: MockLogoutService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    logoutService = TestBed.inject(LogoutService);
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout service and navigate to home page on logout', () => {
    const logoutSpy = spyOn(logoutService, 'logout').and.returnValue(of(Object));
    const routerNavigateSpy = spyOn(router, 'navigate');

    component.logout();

    expect(logoutSpy).toHaveBeenCalled();
    expect(routerNavigateSpy).toHaveBeenCalledWith(['/']);
  });
});
