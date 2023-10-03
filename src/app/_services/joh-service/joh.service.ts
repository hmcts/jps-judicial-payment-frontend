import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class JohService {

    constructor(
        private readonly http: HttpClient,
    ) { }

    public getJohAttributes(personalCode): Observable<any> {

        const headers = {
            'Content-Type': 'application/json',
        };

        return this.http.get<any>(`/joh/johAttributes/${personalCode}`, { headers: headers });

    }

    public postJohAttributes(flagValues, personalCode): Observable<any> {

        const headers = {
            'Content-Type': 'application/json',
        };

        return this.http.post<any>(`/joh/johAttributes/${personalCode}`, { flagValues: flagValues}, { headers: headers });

    }

}