const ManageJudicialSittingRecordsPage = require('../pages/ManageJudicialSittingRecordsPage');
const DeleteSittingRecordPage = require('../pages/DeleteSittingRecordPage');

const randomDay = ('0' + (Math.floor(Math.random() * 28) + 1)).slice(-2);
const randomMonth = ('0' + (Math.floor(Math.random() * 12) + 1)).slice(-2);

Feature('Delete Judicial Sitting Records Tests @functional @F-007');

Scenario('Successfully delete a sitting records page @S-007.1',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Bournemouth', randomDay, randomMonth, '2022');
  I.click("Continue");
  I.see("Judicial sitting records");
  I.see("Sitting records for Social Security and Child Support, Bournemouth Combined Court, for " + randomDay + "/" + randomMonth + "/2022");
  I.click("Add Sitting Record(s)");
  I.createSittingRecord('Joe Ambrose', 'Tribunal Judge', 'Morning');
  I.doubleClick('//*[@id="sittingRecordViewTable"]/thead/tr/th[5]');
  DeleteSittingRecordPage.clickDelete('Social Security and Child Support', 'Bournemouth Combined Court', randomDay + "/" + randomMonth + "/2022");
  I.see('Deleted');
});
  
Scenario('Return back to View Sitting Records page when cancel is clicked @S-007.2',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Bournemouth', randomDay, randomMonth, '2022');
  I.click("Continue");
  I.see("Judicial sitting records");
  I.see("Sitting records for Social Security and Child Support, Bournemouth Combined Court, for " + randomDay + "/" + randomMonth + "/2022");
  I.click("Add Sitting Record(s)");
  I.createSittingRecord('Joe Ambrose', 'Tribunal Judge', 'Morning');
  I.doubleClick('//*[@id="sittingRecordViewTable"]/thead/tr/th[5]');
  DeleteSittingRecordPage.clickCancel('Social Security and Child Support', 'Bournemouth Combined Court', randomDay + "/" + randomMonth + "/2022");
  I.see("Judicial sitting records");
  I.see("Sitting records for Social Security and Child Support, Bournemouth Combined Court, for " + randomDay + "/" + randomMonth + "/2022");
});

Scenario('Show error when trying to delete record created by another user @S-007.3',({ I}) => {
  I.loginWithJPSSubmitterUser();
  ManageJudicialSittingRecordsPage.seeCommonLandingPage();
  I.click('Find, add or delete a sitting record');
  I.click('Continue');
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'London', randomDay, randomMonth, '2022');
  I.click("Continue");
  I.see("Judicial sitting records");
  I.see("Sitting records for Social Security and Child Support, East London Tribunal Hearing Centre (Import Building), for " + randomDay + "/" + randomMonth + "/2022");
  I.click("Add Sitting Record(s)");
  I.createSittingRecord('Joe Ambrose', 'Tribunal Judge', 'Afternoon');
  I.logOutThenLoginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'London', randomDay, randomMonth, '2022');
  I.click("Continue");
  I.doubleClick('//*[@id="sittingRecordViewTable"]/thead/tr/th[5]');
  DeleteSittingRecordPage.clickDeleteRoleError('Social Security and Child Support', 'East London Tribunal Hearing Centre (Import Building)', randomDay + "/" + randomMonth + "/2022");
});