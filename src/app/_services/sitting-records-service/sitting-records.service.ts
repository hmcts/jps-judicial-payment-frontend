import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SittingRecordsPostBody } from "../../_models/addSittingRecords.model";
import { CookieService } from 'ngx-cookie-service';
import { DateService } from "../date-service/date-service";

@Injectable({
    providedIn: 'root',
})

export class SittingRecordsService{
    constructor(
        private dateSvc: DateService,
        private http: HttpClient,
        private readonly cookies: CookieService
    ){}

    postNewSittingRecord(newSittingRecords: SittingRecordsPostBody) {
        const headers = {
            'Content-Type': 'application/json',
        };

        return this.http.post('/sittingrecord/add', { sittingRecords: newSittingRecords }, { headers: headers});
    }


    createNewSRPostObj(joh: any, tribunalService: any, dateSelected: any, venue: any, period:any) {
        return {
            hmctsServiceCode: tribunalService.hmctsServiceCode,
            sittingDate: this.dateSvc.createDateObjFromFormData(dateSelected),
            epimsId: venue.epimms_id,
            personalCode: joh.johName.personalCode,
            contractTypeId: this.changeContractNameToId(joh.johRole.appointment_type),
            judgeRoleTypeId: this.changeRoleToRoleId(joh.johRole.appointment),
            replaceDuplicate: false,
            durationBoolean: period.value
        };
    }

    //Temp functions until refdata calls are updated:
    roleTypeMap: Record<string, number> = {
        'President of Tribunal': 1,
        'Regional Tribunal Judge': 2,
        'Tribunal Judge': 3,
        'Tribunal Member Medical': 4,
        'Tribunal Member Disability': 5,
        'Tribunal Member Lay': 6,
        'Tribunal Member Financial': 7,
        'Circuit Judge': 8,
        'Deputy Circuit Judge': 9,
        'Deputy District Judge- Sitting in Retirement': 10,
        'Deputy High Court Judge': 11,
        'District Judge': 12,
        'District Judge (MC)': 13,
        'Recorder': 14,
    };
    contractTypeMap: Record<string, number> = {
        'Salaried': 1,
        'Fee-Paid': 2,
        'Voluntary': 3,
        'Part Time SPTW 10': 4,
        'Part Time SPTW 20': 5,
        'Part Time SPTW 30': 6,
        'Part Time SPTW 40': 7,
        'Part Time SPTW 50': 8,
        'Part Time SPTW 60': 9,
        'Part Time SPTW 70': 10,
        'Part Time SPTW 80': 11,
        'Part Time SPTW 90': 12,
    };

    changeRoleToRoleId(roleName) {
        return this.roleTypeMap[roleName].toString()
    }

    changeContractNameToId(contractName) {
        return this.contractTypeMap[contractName].toString()
    }

}