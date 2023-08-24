export class ViewSittingRecordPost {
    pageSize = 100;
    offset = 0;
    dateOrder = "ASCENDING";
    regionId!: string;
    epimsId!: string;
    createdByUserId!: string;
    personalCode!: string;
    judgeRoleTypeId!: string;
    duration!: string;
    dateRangeFrom!: string;
    dateRangeTo!: string;
    statusIds!: string[];
} 

export class ViewSittingRecordResponse {
    sittingRecords!: Array<SittingRecord>;
}

export class SittingRecord {  
    sittingRecordId!: string;
    sittingDate!: Date;
    statusId!: string;
    regionId!: string;
    regionName!: string;
    epimmsId!: string;
    hmctsServiceId!: string;
    personalCode!: string;
    personalName!: string;
    contractTypeId!: number;
    judgeRoleTypeId!: string;
    am!: string;
    pm!: string;
    createdDateTime!: string;
    createdByUserId!: string;
    createdByUserName!: string;
    changedDateTime!: string;
    changedByUserId!: string;
    changedByUserName!: string;
    venueName!: string;
}