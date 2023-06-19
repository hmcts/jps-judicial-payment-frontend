export class SittingRecordsPostObj {
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

export class SittingRecordsPostBody {
    recordedByIdamId!: string;
    recordedByName!: string;
    recordedSittingRecords: SittingRecordsPostObj[] = [];
}
