Feature('Submit Judicial Sitting Records Pages Tests @functional @F-007');

Scenario('User will be displayed Records to be submitted on the new page @S-007.1',({ I}) => {
  I.loginWithJPSSubmitterUser();
  // GIVEN a user with idam role jps-submitter has logged into the system
  ManageJudicialSittingRecordsPage.seeCommonLandingPage();
  // AND the user is [presented with "Manage judicial sitting records" common landing page]
  
  // AND the user has [Selected valid tribunal service from drop down]
  
  // AND the user has [Selected a valid region]
  
  // AND the user has [Entered a valid date for sitting date]
  
  // AND the user [clicks on Continue button which will call POST /searchSittingRecords/
  
  // {hmctsServiceCode}

  // THEN [A new page is displayed "Submit sitting records (view)"]

  // AND the user is [presented with paginated Sitting records that can be Submitted to Finance]

  // AND the new page [has 2 buttons visible Submit records and Cancel]
  });

Scenario('User will be displayed error if there is an error  @S-007.2',({ I}) => {
  I.loginWithJPSSubmitterUser();
  // GIVEN a user with idam role jps-submitter has logged into the system

  // AND the user is [presented with "Manage judicial sitting records" common landing page]

  // AND the user has [Selected valid tribunal service from drop down]

  // AND the user has [Selected a valid region]

  // AND the user has [Entered a valid date for sitting date]

  // AND the user [clicks on Continue button which will call POST /searchSittingRecords/{hmctsServiceCode}

  // ]

  // AND [timeout occurs in the endpoint]

  // THEN the user is [presented with an error displayed in the red box]
  });
  
  Scenario('User will be taken back to previous page when cancel button is clicked @S-007.3',({ I}) => {
    I.loginWithJPSSubmitterUser();
    // GIVEN a user with idam role jps-submitter has logged into the system

    // AND the user is [presented with "Manage judicial sitting records" common landing page]

    // AND the user has [Selected valid tribunal service from drop down]

    // AND the user has [Selected a valid region]

    // AND the user has [Entered a valid date for sitting date]

    // AND the user [clicks on Continue button which will call POST /searchSittingRecords/{hmctsServiceCode}

    // ]

    // AND [A new page is displayed "Submit sitting records (view)"]

    // AND the user is [presented with paginated Sitting records that can be Submitted to Finance]

    // AND the new page [has 2 buttons visible Submit records and Cancel]

    // AND the user [clicks on Cancel button]

    // THEN the user [will betaken back to "Manage Judicial sitting record" page]
    });
    
