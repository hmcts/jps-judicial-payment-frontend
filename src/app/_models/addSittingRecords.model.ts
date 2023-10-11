export class SittingRecordsPostObj {
    hmctsServiceCode!: string;
    sittingDate!: Date;
    epimmsId!: string;
    personalCode!: string;
    contractTypeId!: string;
    judgeRoleTypeId!: string;
    durationBoolean!: string;
    replaceDuplicate!: boolean;
}

export class SittingRecordsPostBody {
    recordedByIdamId!: string;
    recordedByName!: string;
    recordedSittingRecords: SittingRecordsPostObj[] = [];
}

export interface DuplicateResponse {  
    postedRecord: SittingRecordsPostObj,
    errorCode: string,
    createdByName: string,
    AM: boolean,
    PM: boolean,
    judgeRoleTypeId: string,
    judgeRoleTypeName: string,
    createdDateTime: string,
    statusId: string
}