const ManageJudicialSittingRecordsPage = require('../pages/ManageJudicialSittingRecordsPage');

Feature('Submit Judicial Sitting Records Pages Tests @functional @F-007');

Scenario('User will be displayed Records to be submitted on the new page @S-007.1',({ I}) => {
  I.loginWithJPSSubmitterUser();
  ManageJudicialSittingRecordsPage.seeCommonLandingPage();
  ManageJudicialSittingRecordsPage.selectSittingRecordsToSubmitToFinance('Social Security and Child Support', 'London', '11', '03', '2022');
  I.click('Continue');
  I.see('Submit Sitting records for BBA3, London, up to and including the 11/03/2022');
  I.see('Submit Sitting Records');
  // AND the user is [presented with paginated Sitting records that can be Submitted to Finance]
  pause();
  I.see('Submit records');
  I.see('Cancel');
  });

Scenario('User will be displayed error if there is an error  @S-007.2',({ I}) => {
  I.loginWithJPSSubmitterUser();
  ManageJudicialSittingRecordsPage.seeCommonLandingPage();
  ManageJudicialSittingRecordsPage.selectSittingRecordsToSubmitToFinance('Social Security and Child Support', 'London', '11', '03', '2022');
  I.click('Continue');
  I.see('Submit Sitting records for BBA3, London, up to and including the 11/03/2022');
  // AND [timeout occurs in the endpoint]
  
  // THEN the user is [presented with an error displayed in the red box]
  I.see('There is a problem');
  I.see('An error has occurred.')
  });
  
  Scenario('User will be taken back to previous page when cancel button is clicked @S-007.3',({ I}) => {
    I.loginWithJPSSubmitterUser();
    ManageJudicialSittingRecordsPage.seeCommonLandingPage();
    ManageJudicialSittingRecordsPage.selectSittingRecordsToSubmitToFinance('Social Security and Child Support', 'London', '11', '03', '2022');
    I.click('Continue');
    I.see('Submit Sitting records for BBA3, London, up to and including the 11/03/2022');
    // AND the user is [presented with paginated Sitting records that can be Submitted to Finance]

    I.see('Submit records');
    I.see('Cancel');
    I.click('Cancel');
    // THEN the user [will betaken back to "Manage Judicial sitting record" page]
    ManageJudicialSittingRecordsPage.seeCommonLandingPage();
    });
    
