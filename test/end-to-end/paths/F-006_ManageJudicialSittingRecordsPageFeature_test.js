const ManageJudicialSittingRecordsPage = require('../pages/ManageJudicialSittingRecordsPage');

Feature('Manage Judicial Sitting Records Pages Tests @functional @F-006');

Scenario('Successfully continue to "Judicial sitting records" page @S-006.1',async ({ I}) => {
  await I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Bournemouth', '11', '03', '2022');
  I.click('Continue');
  I.see("Judicial sitting records");
  I.see("Sitting records for Social Security and Child Support, Bournemouth Combined Court, for 11/03/2022");
});

Scenario('"Manage judicial sitting records" page is not displayed for a user that does not have recorder role @S-006.2',async ({ I}) => {
  await I.loginWithJPSPublisherUser();
  I.dontSee('Find, add or delete judicial sitting records');
});

Scenario('Venue field should be enabled only after tribunal service is selected @S-006.3',async ({ I}) => {
  await I.loginWithJPSRecorderUser();
  I.see('Manage judicial sitting records');
  I.see('Find, add or delete judicial sitting records');
  I.seeElement('#venue-select[disabled]');
});

Scenario('"Manage Judicial Sitting Records" page will be displayed when Previous button is clicked @S-006.4',async ({ I}) => {
  await I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Bournemouth', '11', '03', '2022');
  I.click('Continue');
  I.click('Previous');
  I.see('Social Security and Child Support');
  I.seeInField('Select a venue','Bournemouth Combined Court');
  I.seeInField('Day', '11');
  I.seeInField('Month', '03');
  I.seeInField('Year', '2022');
});

Scenario('User with jps-submitter can view the landing page and 2 radio buttons @S-006.5',async ({ I}) => {
  await I.loginWithJPSSubmitterUser();
  ManageJudicialSittingRecordsPage.seeCommonLandingPage();
  I.see('Find, add or delete a sitting record');
  I.see('Submit sitting records to Finance');
});

Scenario('User with jps-admin can view the landing page and 1 radio button @S-006.6',async ({ I}) => {
  await I.loginWithJPSAdminUser();
  ManageJudicialSittingRecordsPage.seeCommonLandingPage();
  I.see('Find, add or delete a sitting record');
});

Scenario('User with jps-JOH-admin can view the landing page and does not see any radio buttons @S-006.7',async ({ I}) => {
  await I.loginWithJPSJOHAdminUser()
  ManageJudicialSittingRecordsPage.seeCommonLandingPage();
  I.dontSee('Find, add or delete a sitting record');
  I.dontSee('Submit sitting records to Finance');
});

Scenario('Region drop down will be populated with values when Submit sitting records to Finance is selected @S-006.8',async ({ I}) => {
  await I.loginWithJPSSubmitterUser();
  ManageJudicialSittingRecordsPage.seeCommonLandingPage();
  I.click('Submit sitting records to Finance');
  I.selectOption('Select a service', 'Social Security and Child Support');
  I.click('#region-select');
  I.seeNumberOfElements('option[value*="Object"]', 10);
});

Scenario('Region field should be enabled only after tribunal service is selected @S-006.9',async ({ I}) => {
  await I.loginWithJPSSubmitterUser();
  ManageJudicialSittingRecordsPage.seeCommonLandingPage();
  I.click('Submit sitting records to Finance');
  I.seeElement('#region-select[disabled]');
});

Scenario('Region field selected value should be removed if a different tribunal service is selected @S-006.10',async ({ I}) => {
  await I.loginWithJPSSubmitterUser();
  ManageJudicialSittingRecordsPage.seeCommonLandingPage();
  ManageJudicialSittingRecordsPage.selectSittingRecordsToSubmitToFinance('Social Security and Child Support', 'London', '11', '03', '2022');
  I.selectOption('Select a service', 'Private Law');
  I.see('Select a value');
});

Scenario('If date value is after today\'s date error should be displayed @S-006.11',async ({ I}) => {
  await I.loginWithJPSSubmitterUser();
  ManageJudicialSittingRecordsPage.seeCommonLandingPage();
  ManageJudicialSittingRecordsPage.selectSittingRecordsToSubmitToFinance('Social Security and Child Support', 'London', '11', '03', '2040');
  I.see('The date you have selected is in the future');
});

