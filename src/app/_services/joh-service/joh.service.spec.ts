import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { JohService } from './joh.service';

describe('JohService', () => {
    let service: JohService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [JohService]
        });
        service = TestBed.inject(JohService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should retrieve Joh attributes', () => {
        const personalCode = '1234567890';

        const mockResponse = { };

        service.getJohAttributes(personalCode).subscribe(response => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`/joh/johAttributes/${personalCode}`);
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('should post Joh attributes', () => {
        const flagValues = {};
        const personalCode = '1234567890';

        const mockResponse = { };

        service.postJohAttributes(flagValues, personalCode).subscribe(response => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`/joh/johAttributes/${personalCode}`);
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual({ flagValues });
        req.flush(mockResponse);
    });
});