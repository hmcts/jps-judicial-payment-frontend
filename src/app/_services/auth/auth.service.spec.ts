import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call the appropriate endpoint and return the response for isAuthenticated', () => {
    const mockResponse = true;

    authService.isAuthenticated().subscribe(result => {
      expect(result).toBe(mockResponse);
    });

    const req = httpMock.expectOne('/auth/isAuthenticated');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should call setWindowLocationHref with the appropriate URL when loginRedirect is called', () => {
    const mockHref = '/auth/login';

    spyOn(authService, 'setWindowLocationHref');
    authService.loginRedirect();

    expect(authService.setWindowLocationHref).toHaveBeenCalledWith(mockHref);
  });
});
