import { HttpClient } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../../_services/auth/auth.service';

class HttpClientMock {
  public get() {
    return 'response';
  }
}

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({})
      ],
      providers: [
        AuthService,
        { provide: HttpClient, useClass: HttpClientMock },
      ]
    });
  });

  it('should exist', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should exist', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard.canActivate).toBeDefined();
  }));
});

describe('AuthGuard', () => {
  let authService: any;

  beforeEach(() => {
    authService = jasmine.createSpyObj('authService', ['loginRedirect', 'isAuthenticated', 'setWindowLocationHref']);
  });

  it('canActivate true', () => {
    authService.isAuthenticated.and.returnValue(of(true));
    const guard = new AuthGuard(authService);

    const canActivate = guard.canActivate();

    canActivate.subscribe(isAct => expect(isAct).toBeTruthy());
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(authService.loginRedirect).not.toHaveBeenCalled();
  });

  it('canActivate false', () => {
    authService.isAuthenticated.and.returnValue(of(false));
    const guard = new AuthGuard(authService);

    const canActivate = guard.canActivate();
    canActivate.subscribe(isAct => expect(isAct).toBeFalsy());
    expect(authService.isAuthenticated).toHaveBeenCalled();
    expect(authService.loginRedirect).toHaveBeenCalled();
  });
 
});
