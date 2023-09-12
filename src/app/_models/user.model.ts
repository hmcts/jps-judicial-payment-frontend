export class UserModel {
   title!: string;
   knownAs!: string;
   surname!: string;
   fullName!: string;
   emailId!: string;
   idamId!: string;
   personalCode!: string 
}

export class UserInfoModel {
    sidam_id!: string;
    object_id!: string;
    known_as!: string;
    surname!: string;
    full_name!: string;
    post_nominals!: string;
    email_id!: string;
    personal_code!: string;
    appointments!: [
     {
        base_location_id: string,
        epimms_id: string,
        court_name: string,
        cft_region_id: string,
        cft_region: string,
        location_id: string,
        location: string,
        is_principal_appointment: string,
        appointment: string,
        appointment_type: string,
        service_code: string,
        roles: [
           string 
        ],
        start_date: string,
        end_date: string 
     }
    ];
    authorisations!: [
     {
        jurisdiction: string,
        ticket_description: string,
        ticket_code: string,
        service_codes: [
           string 
        ],
        start_date: string,
        end_date: string 
     }
    ]
  }
