export class sittingRecordsPostObj {
    hmctsServiceCode!: string;
    sittingDate!: string;
    epimmsId!: string;
    personalCode!: string;
    contractTypeId!: string;
    judgeRoleTypeId!: string;
    AM!: boolean;
    PM!: boolean;
    replaceDuplicate!: boolean;
}

export class sittingRecordsPostBody {
    postedSittingRecords: Array<sittingRecordsPostObj> = [];
}