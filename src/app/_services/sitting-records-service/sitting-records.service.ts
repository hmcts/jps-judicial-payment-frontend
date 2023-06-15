import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SittingRecordsPostBody } from "../../_models/addSittingRecords.model";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root',
})

export class SittingRecordsService{
    constructor(
        private http: HttpClient,
        private readonly cookies: CookieService
    ){}

    postNewSittingRecord(newSittingRecords: SittingRecordsPostBody) {
        // TODO: move these to service file
        const S2SToken: string  = this.cookies.get('__serviceauth__');
        const authToken: string = this.cookies.get('__auth__')

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': authToken,
            'ServiceAuthorization': S2SToken
        };

        return this.http.post('/sittingrecords/add', { sittingRecords: newSittingRecords }, { headers: headers});
    }

}