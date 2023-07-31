export class SittingRecordsPostObj {
    hmctsServiceCode!: string;
    sittingDate!: Date;
    epimsId!: string;
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
