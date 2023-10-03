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

    describe('isRecorder', () => {
        it('should return the index of "jps-recorder" in userRoles', () => {
            service.userRoles = 'jps-recorder';
            const index = service.isRecorder();
            expect(index).toEqual(0);
        });

        it('should return -1 if "jps-recorder" is not in userRoles', () => {
            service.userRoles = 'User';
            const index = service.isRecorder();
            expect(index).toEqual(-1);
        });
    });

    describe('isPublisher', () => {
        it('should return the index of "jps-publisher" in userRoles', () => {
            service.userRoles = 'jps-publisher';
            const index = service.isPublisher();
            expect(index).toEqual(0);
        });

        it('should return -1 if "jps-publisher" is not in userRoles', () => {
            service.userRoles = 'User';
            const index = service.isPublisher();
            expect(index).toEqual(-1);
        });
    });

    describe('isJohAdmin', () => {
        it('should return the index of "jps-JOH-admin" in userRoles', () => {
            service.userRoles = 'jps-JOH-admin';
            const index = service.isJohAdmin();
            expect(index).toEqual(0);
        });

        it('should return -1 if "jps-JOH-admin" is not in userRoles', () => {
            service.userRoles = 'User';
            const index = service.isJohAdmin();
            expect(index).toEqual(-1);
        });
    });

});
