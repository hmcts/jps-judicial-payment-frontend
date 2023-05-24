import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { AuthService } from './auth.service';


describe('AuthService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        AuthService
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  describe('isAuthenticated', () => {
    it('should make a call to check authentication', inject(
      [ HttpTestingController, AuthService ],
      (httpMock: HttpTestingController, service: AuthService) => {
        service.isAuthenticated().subscribe( response => {
          expect(JSON.parse(String(response))).toBeFalsy();
        });

        const req = httpMock.expectOne('/auth/isAuthenticated');
        expect(req.request.method).toEqual('GET');
        req.flush('false');
      }
    ));
  });
});
