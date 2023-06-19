import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../../_services/auth/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'loginRedirect']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should allow activation when user is authenticated', () => {
    authService.isAuthenticated.and.returnValue(of(true));

    guard.canActivate().subscribe(result => {
      expect(result).toBe(true);
      expect(authService.loginRedirect).not.toHaveBeenCalled();
    });
  });

  it('should redirect to login when user is not authenticated', () => {
    authService.isAuthenticated.and.returnValue(of(false));

    guard.canActivate().subscribe(result => {
      expect(result).toBe(false);
      expect(authService.loginRedirect).toHaveBeenCalled();
    });
  });
});
