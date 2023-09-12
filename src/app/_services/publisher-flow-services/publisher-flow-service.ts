import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DateService } from "../date-service/date-service";
import { Observable } from "rxjs";
import { mainPostObj } from "src/app/_models/publishRecordsResponse.model";

@Injectable({
    providedIn: 'root',
})

export class PublisherFlowService{
    constructor(
        private dateSvc: DateService,
        private http: HttpClient,
    ){}

    getPublishedRecords(serviceCode, searchObject): Observable<mainPostObj> {
        const headers = {
            'Content-Type': 'application/json',
        };

        return this.http.post<mainPostObj>('/sittingrecord/publishRecords/', { 'hmctsServiceCode': serviceCode, 'searchObject': searchObject }, { headers: headers});
    }

}