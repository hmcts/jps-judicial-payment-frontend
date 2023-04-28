import { Component, OnInit } from '@angular/core';
import { SittingRecordWorkflowService } from '../../_workflows/sitting-record-workflow.service';
import { DateService } from '../../_services/date-service';
import { Router } from '@angular/router';
import { defaultDtOptions }  from '../../_services/default-dt-options'
@Component({
  selector: 'app-view-sitting-records',
  templateUrl: './view-sitting-records.component.html',
  styleUrls: ['./view-sitting-records.component.scss']
})
export class ViewSittingRecordsComponent implements OnInit {

  tribService = "";
  venue = "";
  date = "";

  tempData = [
    {
      "sittingRecordId": "13",
      "sittingDate": "2023-05-04",
      "statusId": "Recorded",
      "regionId": "3",
      "regionName": "Birmingham",
      "epimmsId": "1122334455",
      "hmctsServiceId": "MNO",
      "personalCode": "PC246",
      "personalName": "Jessica Lee",
      "contractTypeId": "1",
      "judgeRoleTypeId": "1",
      "AM": false,
      "PM": true,
      "createdDateTime": "2023-05-04T09:00:00",
      "createdByUserId": "303",
      "createdByUserName": "Frank",
      "changedDateTime": "2023-05-04T09:00:00",
      "changedByUserId": "303",
      "changedByUserName": "Frank"
    },
    {
      "sittingRecordId": "14",
      "sittingDate": "2023-05-05",
      "statusId": "Recorded",
      "regionId": "1",
      "regionName": "London",
      "epimmsId": "7788990011",
      "hmctsServiceId": "PQR",
      "personalCode": "PC789",
      "personalName": "Steven Wilson",
      "contractTypeId": "2",
      "judgeRoleTypeId": "2",
      "AM": true,
      "PM": true,
      "createdDateTime": "2023-05-05T12:00:00",
      "createdByUserId": "505",
      "createdByUserName": "Gina",
      "changedDateTime": "2023-05-05T12:00:00",
      "changedByUserId": "505",
      "changedByUserName": "Gina"
    },
    {
      "sittingRecordId": "15",
      "sittingDate": "2023-05-06",
      "statusId": "Recorded",
      "regionId": "2",
      "regionName": "Manchester",
      "epimmsId": "1213141516",
      "hmctsServiceId": "STU",
      "personalCode": "PC135",
      "personalName": "Olivia Evans",
      "contractTypeId": "1",
      "judgeRoleTypeId": "Lead Judge",
      "AM": true,
      "PM": false,
      "createdDateTime": "2023-05-06T14:30:00",
      "createdByUserId": "808",
      "createdByUserName": "Harry",
      "changedDateTime": "2023-05-06T14:30:00",
      "changedByUserId": "808",
      "changedByUserName": "Harry"
    },
    {
        "sittingRecordId": "17",
        "sittingDate": "2023-05-08",
        "statusId": "Recorded",
        "regionId": "1",
        "regionName": "London",
        "epimmsId": "2223242526",
        "hmctsServiceId": "YZA",
        "personalCode": "PC789",
        "personalName": "William Johnson",
        "contractTypeId": "1",
        "judgeRoleTypeId": "Disability Member",
        "AM": false,
        "PM": true,
        "createdDateTime": "2023-05-08T16:45:00",
        "createdByUserId": "111",
        "createdByUserName": "Karen",
        "changedDateTime": "2023-05-08T16:45:00",
        "changedByUserId": "111",
        "changedByUserName": "Karen"
      },
      {
        "sittingRecordId": "18",
        "sittingDate": "2023-05-09",
        "statusId": "Recorded",
        "regionId": "2",
        "regionName": "Manchester",
        "epimmsId": "2728293031",
        "hmctsServiceId": "BCD",
        "personalCode": "PC135",
        "personalName": "Sophia Wilson",
        "contractTypeId": "2",
        "judgeRoleTypeId": "Financial Member",
        "AM": true,
        "PM": true,
        "createdDateTime": "2023-05-09T13:00:00",
        "createdByUserId": "404",
        "createdByUserName": "Lisa",
        "changedDateTime": "2023-05-09T13:00:00",
        "changedByUserId": "404",
        "changedByUserName": "Lisa"
      },
      {
        "sittingRecordId": "19",
        "sittingDate": "2023-05-10",
        "statusId": "Recorded",
        "regionId": "3",
        "regionName": "Birmingham",
        "epimmsId": "3233343536",
        "hmctsServiceId": "EFG",
        "personalCode": "PC246",
        "personalName": "Mia Johnson",
        "contractTypeId": "1",
        "judgeRoleTypeId": "2",
        "AM": false,
        "PM": true,
        "createdDateTime": "2023-05-10T10:30:00",
        "createdByUserId": "707",
        "createdByUserName": "Natalie",
        "changedDateTime": "2023-05-10T10:30:00",
        "changedByUserId": "707",
        "changedByUserName": "Natalie"
      },
    ]

  dtOptions: DataTables.Settings = {};
  
  goBack(){
    this.router.navigate(['sittingRecords','manage'])
  }

  getPeriod(am: boolean, pm: boolean){
    if(am && pm){ return "Full Day" }
    if(am){ return "Morning" }
    if(pm){ return "Afternoon" }
    return ""
  }

  constructor(
    private srWorkFlow: SittingRecordWorkflowService,
    private dateSvc: DateService,
    private router: Router
  ){}
    
  ngOnInit(){
    const formData = this.srWorkFlow.getFormData().value;
    const { dateSelected, tribunalService, venue } = formData;
    this.tribService = tribunalService;
    this.venue = venue;
    this.date = this.dateSvc.formatDateFromForm(dateSelected);

    this.dtOptions = {
      ...defaultDtOptions,
      columnDefs:[
        {orderData: 1, targets: [0]},
        {orderData: 2, targets: [1]},
        {orderData: 3, targets: [2]},
        {orderData: 4, targets: [3]},
        {orderData: 5, targets: [4]},
        {orderData: 6, targets: [5], orderable: false},
      ],
      
      drawCallback: 
        /* istanbul ignore next */ 
        () => {
        /* istanbul ignore next */
        document
          .querySelectorAll(`#sittingRecordViewTable_info`)
          .forEach((elem) => elem.classList.add('govuk-body'))
      },
      
    };

  }

}
