export class viewSittingRecordApiResponse {
    "sittingRecords": Array<sittingRecord>
}

export class sittingRecord {  
    "sittingRecordId": string
    "sittingDate": Date
    "statusId": string
    "regionId": string
    "regionName": string
    "epimmsId": string
    "hmctsServiceId": string
    "personalCode": string
    "personalName": string
    "contractTypeId": number
    "judgeRoleTypeId": string
    "AM": string
    "PM": string
    "createdDateTime": string
    "createdByUserId": string
    "createdByUserName": string
    "changedDateTime": string
    "changedByUserId": string
    "changedByUserName": string
  }