import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LogoutService } from './logout.service';

describe('LogoutService', () => {
    let service: LogoutService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [LogoutService],
        });
        service = TestBed.inject(LogoutService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should make a GET request to /auth/logout with noredirect parameter', () => {
        const dummyResponse = { message: 'Logout successful' };

        service.logout().subscribe(response => {
            expect(response).toEqual(dummyResponse);
        });

        const req = httpMock.expectOne('/auth/logout?noredirect=true');
        expect(req.request.method).toBe('GET');
        req.flush(dummyResponse);
    });
});
