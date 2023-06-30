import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';
import { UserModel } from '../../_models/user.model';

describe('UserService', () => {
    let service: UserService;
    let httpMock: HttpTestingController;
    let cookieService: CookieService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CookieService, UserService]
        });

        service = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController);
        cookieService = TestBed.inject(CookieService);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should retrieve users successfully', () => {
        const mockUsers: UserModel[] = [
            {
                title: '',
                knownAs: 'John',
                surname: '',
                fullName: '',
                emailId: '',
                idamId: '',
                personalCode: ''
            },
            {
                title: '',
                knownAs: 'Jane',
                surname: '',
                fullName: '',
                emailId: '',
                idamId: '',
                personalCode: ''
            }
        ];
        const searchTerm = 'John';
        const venueEpims = 'Venue';
        const serviceCode = 'BBA3'

        spyOn(cookieService, 'get').and.returnValue('token');

        service.getUsers(searchTerm, serviceCode, venueEpims).subscribe(users => {
            expect(users).toEqual(mockUsers);
        });

        const req = httpMock.expectOne('/refdata/user');
        expect(req.request.method).toBe('POST');
        expect(req.request.headers.has('Content-Type')).toBeTruthy();
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        expect(req.request.headers.has('Authorization')).toBeTruthy();
        expect(req.request.headers.get('Authorization')).toBe('token');
        expect(req.request.headers.has('ServiceAuthorization')).toBeTruthy();
        expect(req.request.headers.get('ServiceAuthorization')).toBe('token');

        req.flush(mockUsers);
    });

    it('should retrieve user info successfully', () => {
        const mockUserInfo: any[] = [{ id: 1, name: 'John', email: 'john@example.com' }];
        const userCode = '12345';

        spyOn(cookieService, 'get').and.returnValue('token');

        service.getUserInfo(userCode).subscribe(userInfo => {
            expect(userInfo).toEqual(mockUserInfo);
        });

        const req = httpMock.expectOne('/refdata/userInfo');
        expect(req.request.method).toBe('POST');
        expect(req.request.headers.has('Content-Type')).toBeTruthy();
        expect(req.request.headers.get('Content-Type')).toBe('application/json');
        expect(req.request.headers.has('Authorization')).toBeTruthy();
        expect(req.request.headers.get('Authorization')).toBe('token');
        expect(req.request.headers.has('ServiceAuthorization')).toBeTruthy();
        expect(req.request.headers.get('ServiceAuthorization')).toBe('token');

        req.flush(mockUserInfo);
    });
});
