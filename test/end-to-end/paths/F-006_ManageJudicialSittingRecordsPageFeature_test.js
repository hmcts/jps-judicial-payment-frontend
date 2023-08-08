const ManageJudicialSittingRecordsPage = require('../pages/ManageJudicialSittingRecordsPage');

Feature('Manage Judicial Sitting Records Pages Tests @functional @F-006');

Scenario('Successfully continue to "Judicial sitting records" page @S-006.1',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('1', 'Bournemouth', '11', '03', '2022');
  I.click('Continue');
  I.see("Judicial Sitting Records");
  I.see("Sitting records for 1, Bournemouth Combined Court, for 11/03/2022");
});

Scenario('"Manage judicial sitting records" page is not displayed for a user that does not have recorder role @S-006.2',({ I}) => {
  I.loginWithJPSPublisherUser();
  I.dontSee('Find, add or delete judicial sitting records');
});

Scenario('Venue field should be enabled only after tribunal service is selected @S-006.3',  ({ I}) => {
  I.loginWithJPSRecorderUser();
  I.see('Manage Judicial Sitting Records');
  I.see('Find, add or delete judicial sitting records');
  I.seeElement('#venue-select[disabled]');
});

Scenario('Venue field should be reset if tribunal service is changed @S-006.4',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('1', 'Bournemouth', '11', '03', '2022');
  I.selectOption('Select a tribunal service', '2');
  I.dontSeeInField('Select a venue','Bournemouth Combined Court');
});

Scenario('"Manage Judicial Sitting Records" page will be displayed when Previous button is clicked @S-006.6',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('1', 'Bournemouth', '11', '03', '2022');
  I.click('Continue');
  I.click('Previous');
  I.seeInField('Select a tribunal service', '1');
  I.seeInField('Select a venue','Bournemouth Combined Court');
  I.seeInField('Day', '11');
});

Scenario('User with jps-submitter can view the landing page and 2 radio buttons @S-006.7',({ I}) => {
  I.loginWithJPSSubmitterUser();
  ManageJudicialSittingRecordsPage.seeCommonLandingPage();
  I.see('Find, add or delete a sitting record');
  I.see('Submit sitting records to Finance');
});

Scenario('User with jps-admin can view the landing page and 1 radio button @S-006.8',({ I}) => {
  I.loginWithJPSAdminUser();
  ManageJudicialSittingRecordsPage.seeCommonLandingPage();
  I.see('Find, add or delete a sitting record');
});

Scenario('User with jps-JOH-admin can view the landing page and does not see any radio buttons @S-006.9',({ I}) => {
  I.loginWithJPSJOHAdminUser()
  ManageJudicialSittingRecordsPage.seeCommonLandingPage();
  I.dontSee('Find, add or delete a sitting record');
  I.dontSee('Submit sitting records to Finance');
});

Scenario('Region drop down will be populated with values when Submit sitting records to Finance is selected @S-006.10',({ I}) => {
  I.loginWithJPSSubmitterUser();
  ManageJudicialSittingRecordsPage.seeCommonLandingPage();
  I.click('Submit sitting records to Finance');
  I.selectOption('Select a service', '1');
  I.click('Select a region');
  I.seeNumberOfElements('option[value="[object Object]"]', 10);
});

Scenario('Region field should be enabled only after tribunal service is selected @S-006.11',({ I}) => {
  I.loginWithJPSSubmitterUser();
  ManageJudicialSittingRecordsPage.seeCommonLandingPage();
  I.click('Submit sitting records to Finance');
  I.seeElement('#region[disabled]');
});

Scenario('Region field selected value should be removed if a different tribunal service is selected @S-006.12',({ I}) => {
  I.loginWithJPSSubmitterUser();
  ManageJudicialSittingRecordsPage.seeCommonLandingPage();
  ManageJudicialSittingRecordsPage.selectSittingRecordsToSubmitToFinance('1', 'London', '11', '03', '2022');
  I.selectOption('Select a service', '2');
  I.see('Select a value');
});

Scenario('If date value is after today\'s date error should be displayed @S-006.13',({ I}) => {
  I.loginWithJPSSubmitterUser();
  ManageJudicialSittingRecordsPage.seeCommonLandingPage();
  ManageJudicialSittingRecordsPage.selectSittingRecordsToSubmitToFinance('1', 'London', '11', '03', '2040');
  I.see('The date you have selected is in the future');
});

