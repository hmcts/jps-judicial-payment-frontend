export interface mainPostObj {
    publishedByIdAMId: string;
    publishedByName: string;
    fileInfos: Array<fileInfo>;
    errors: errors;
}

export interface fileInfo {
    recordsInError: number;
    johAttributesInError: Array<johAttributesInError>;
    johPayrollsInError: johPayrollInError;
    courtVenuesInError: Array<courtVenueInError>;
    feesInError: Array<feeInError>;
    servicesInError: string[];
}

export interface errors {
    recordsInError: number;
    johAttributessInError: Array<johAttributesInError>;
    johPayrollsInError: johPayrollInError;
    courtVenuesInError: Array<courtVenueInError>;
    feesInError: Array<feeInError>;
    servicesInError: string[];
}

export interface johAttributesInError {
    personalCode: string;
    sittingDate: string;
    email: string;
    postNominals: string;
    fullName: string;
}

export interface johPayrollInError {
    personalCode: string;
    judgeRoleTypeId: string;
    judgeRoleTypeName: string;
    sittingDate: string;
    email: string;
    postNominals: string;
    fullName: string;
}

export interface courtVenueInError {
    hmctsServiceId: string;
    epimsId: string;
}

export interface feeInError {
    hmctsServiceId: string;
    judgeRoleTypeId: string;
    judgeRoleTypeName: string;
    sittingDate: string;
}