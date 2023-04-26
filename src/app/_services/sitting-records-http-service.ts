import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { sittingRecordsPostBody } from "../_models/addSIttingRecords";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})

export class SittingRecordsHttpService{
    constructor(
        private http: HttpClient
    ){}

    postNewSittingRecord(newSittingRecords: sittingRecordsPostBody){
        return this.http.post(
            'url',
            newSittingRecords,
            httpOptions
        )
    }

}