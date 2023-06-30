import { HttpClient } from "@angular/common/http";
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
        const headers = {
            'Content-Type': 'application/json',
        };

        return this.http.post('/sittingrecord/add', { sittingRecords: newSittingRecords }, { headers: headers});
    }

}