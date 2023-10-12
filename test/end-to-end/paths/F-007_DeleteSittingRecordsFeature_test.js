const ManageJudicialSittingRecordsPage = require('../pages/ManageJudicialSittingRecordsPage');
const DeleteSittingRecordPage = require('../pages/DeleteSittingRecordPage');

const randomDay = ('0' + (Math.floor(Math.random() * 28) + 1)).slice(-2);
const randomMonth = ('0' + (Math.floor(Math.random() * 12) + 1)).slice(-2);
const year = '2022';

const joeAmbroseName = 'Joe Ambrose';
const tribunalJudgeRole = 'Tribunal Judge';
const morningPeriod = 'Morning';
const afternoonPeriod = 'Afternoon';
const socialSecurityTribunalService = 'Social Security and Child Support';
const bournemouthVenue = 'Bournemouth';
const bournemouthFullVenue = 'Bournemouth Combined Court';
const londonVenue = 'London';
const londonFullVenue = 'East London Tribunal Hearing Centre (Import Building)';

Feature('Delete Judicial Sitting Records Tests @functional @F-007');

Scenario('Successfully delete a sitting records page @S-007.1',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, bournemouthVenue, randomDay, randomMonth, year);
  I.click("Continue");
  I.see("Judicial sitting records");
  I.see("Sitting records for Social Security and Child Support, Bournemouth Combined Court, for " + randomDay + "/" + randomMonth + "/" + year);
  I.click("Add Sitting Record(s)");
  I.createSittingRecord(joeAmbroseName, tribunalJudgeRole, morningPeriod);
  I.doubleClick('//*[@id="sittingRecordViewTable"]/thead/tr/th[5]');
  DeleteSittingRecordPage.deleteRecord(socialSecurityTribunalService, bournemouthFullVenue, randomDay + "/" + randomMonth + "/" + year);
  I.click('Return To Sitting Records');
  I.see('Deleted');
});
  
Scenario('Return back to View Sitting Records page when cancel is clicked @S-007.2',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, bournemouthVenue, randomDay, randomMonth, year);
  I.click("Continue");
  I.see("Judicial sitting records");
  I.see("Sitting records for Social Security and Child Support, Bournemouth Combined Court, for " + randomDay + "/" + randomMonth + "/" + year);
  I.click("Add Sitting Record(s)");
  I.createSittingRecord(joeAmbroseName, tribunalJudgeRole, morningPeriod);
  I.doubleClick('//*[@id="sittingRecordViewTable"]/thead/tr/th[5]');
  DeleteSittingRecordPage.clickCancel(socialSecurityTribunalService, bournemouthFullVenue, randomDay + "/" + randomMonth + "/" + year);
  I.see("Judicial sitting records");
  I.see("Sitting records for Social Security and Child Support, Bournemouth Combined Court, for " + randomDay + "/" + randomMonth + "/" + year);
});

Scenario('Show error when trying to delete record created by another user @S-007.3',({ I}) => {
  I.loginWithJPSSubmitterUser();
  ManageJudicialSittingRecordsPage.seeCommonLandingPage();
  I.click('Find, add or delete a sitting record');
  I.click('Continue');
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, londonVenue, randomDay, randomMonth, year);
  I.click("Continue");
  I.see("Judicial sitting records");
  I.see("Sitting records for"  + socialSecurityTribunalService + ', ' + londonFullVenue + ', for ' + randomDay + "/" + randomMonth + "/" + year);
  I.click("Add Sitting Record(s)");
  I.createSittingRecord(joeAmbroseName, tribunalJudgeRole, afternoonPeriod);
  I.logOutThenLoginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, londonVenue, randomDay, randomMonth, year);
  I.click("Continue");
  I.doubleClick('//*[@id="sittingRecordViewTable"]/thead/tr/th[5]');
  I.click('Delete');
  I.see('Delete sitting record for ' + socialSecurityTribunalService + ', ' + londonFullVenue + ', for ' + randomDay + "/" + randomMonth + "/" + year);
  I.see('Delete sitting record');
  I.click('Delete');
  I.see('There is a problem');
  I.see('Selected sitting record was not recorded by the recorder. Record cannot be deleted.');
});