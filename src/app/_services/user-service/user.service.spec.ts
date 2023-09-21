import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user.service';
import { UserInfoModel, UserModel } from '../../_models/user.model';

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
        const venueEpimms = 'Venue';
        const serviceCode = 'BBA3'

        spyOn(cookieService, 'get').and.returnValue('token');

        service.getUsers(searchTerm, serviceCode, venueEpimms).subscribe(users => {
            expect(users).toEqual(mockUsers);
        });

        const req = httpMock.expectOne('/refdata/user');
        expect(req.request.method).toBe('POST');
        expect(req.request.headers.has('Content-Type')).toBeTruthy();
        expect(req.request.headers.get('Content-Type')).toBe('application/json');

        req.flush(mockUsers);
    });

    it('should retrieve user info successfully', () => {
        const mockUserInfo: UserInfoModel[] = [{
            sidam_id: "SID1234567",
            object_id: "OBJ1234567",
            known_as: "John",
            surname: "Doe",
            full_name: "John Doe",
            post_nominals: "PhD",
            email_id: "john.doe@example.com",
            personal_code: "PERS1234",
            appointments: [
                {
                    base_location_id: "BASE_LOC1234",
                    epimms_id: "EPIMMS1234",
                    court_name: "Superior Court",
                    cft_region_id: "CFT1234",
                    cft_region: "North Region",
                    location_id: "LOC1234",
                    location: "Downtown Office",
                    is_principal_appointment: "Yes",
                    appointment: "Judge",
                    appointment_type: "Permanent",
                    service_code: "SERV1234",
                    roles: [
                        "Role1"
                    ],
                    start_date: "2023-01-01",
                    end_date: "2030-12-31"
                }
            ],
            authorisations: [
                {
                    jurisdiction: "Civil",
                    ticket_description: "Ticket 1",
                    ticket_code: "TICK1234",
                    service_codes: [
                        "SERV1234"
                    ],
                    start_date: "2023-01-01",
                    end_date: "2030-12-31"
                }
            ]
        }];
        const userCode = '12345';

        service.getUserInfo(userCode).subscribe(userInfo => {
            expect(userInfo).toEqual(mockUserInfo);
        });

        const req = httpMock.expectOne('/refdata/userInfo');
        expect(req.request.method).toBe('POST');
        expect(req.request.headers.has('Content-Type')).toBeTruthy();
        expect(req.request.headers.get('Content-Type')).toBe('application/json');

        req.flush(mockUserInfo);
    });
});
