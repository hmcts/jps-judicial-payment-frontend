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
  I.seeInField('Month', '03');
  I.seeInField('Year', '2022');
});

