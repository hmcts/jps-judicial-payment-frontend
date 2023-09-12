import { TestBed } from '@angular/core/testing';
import { UserInfoService } from './user-info-service';

describe('UserInfoService', () => {
    let service: UserInfoService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(UserInfoService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('setUserInfo', () => {
        it('should set the user information correctly', () => {
            const userInfo = 'j:["12348761248761","John Doe"]';
            const userRole = 'p:["Admin"]';
            service.setUserInfo(userInfo, userRole);
            expect(service.idamID).toEqual('12348761248761');
            expect(service.userName).toEqual('John Doe');
            expect(service.userRoles).toEqual(['Admin']);
        });
    });

    describe('getIdamId', () => {
        it('should return the IDAM ID', () => {
            service.idamID = '12345';
            const idamID = service.getIdamId();
            expect(idamID).toEqual('12345');
        });
    });

    describe('getUserName', () => {
        it('should return the user name', () => {
            service.userName = 'John Doe';
            const userName = service.getUserName();

            expect(userName).toEqual('John Doe');
        });
    });
});
