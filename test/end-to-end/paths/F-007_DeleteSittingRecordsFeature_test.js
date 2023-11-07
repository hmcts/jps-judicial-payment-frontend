const ManageJudicialSittingRecordsPage = require('../pages/ManageJudicialSittingRecordsPage');
const DeleteSittingRecordPage = require('../pages/DeleteSittingRecordPage');
const JudicialSittingRecordsPage = require('../pages/JudicialSittingRecordsPage.js')

const randomDay = ('0' + (Math.floor(Math.random() * 28) + 1)).slice(-2);
const randomMonth = ('0' + (Math.floor(Math.random() * 12) + 1)).slice(-2);
const year = '2022';

const joeAmbroseName = 'Joe Ambrose';
const maryGallegosName = 'Mary Gallegos';
const brandonRojasName = 'Brandon Rojas';
const tribunalJudgeRole = 'Tribunal Judge';
const regionalTribunalJudgeRole = 'Regional Tribunal Judge';
const tribunalMemberDisabilityRole = 'Tribunal Member Disability';
const morningPeriod = 'Morning';
const afternoonPeriod = 'Afternoon';
const socialSecurityTribunalService = 'Social Security and Child Support';
const bournemouthVenue = 'Bournemouth';
const bournemouthFullVenue = 'Bournemouth Combined Court';
const londonVenue = 'London';
const londonFullVenue = 'East London Tribunal Hearing Centre (Import Building)';
const jpsRecorderRole = 'jps recorder';

Feature('Delete Judicial Sitting Records Tests @functional @F-007');

Scenario('Successfully delete a sitting record @S-007.1',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, bournemouthVenue, randomDay, randomMonth, year);
  I.click("Continue");
  I.see("Judicial sitting records");
  I.see("Sitting records for " + socialSecurityTribunalService + ', ' + bournemouthFullVenue + ", for " + randomDay + "/" + randomMonth + "/" + year);
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.createSittingRecord(joeAmbroseName, tribunalJudgeRole, morningPeriod);
  JudicialSittingRecordsPage.clickDelete();
  DeleteSittingRecordPage.deleteRecord();
  I.click('Return To Sitting Records');
  I.see('Deleted');
});
  
Scenario('Return back to View Sitting Records page when cancel is clicked @S-007.2',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, bournemouthVenue, randomDay, randomMonth, year);
  I.click("Continue");
  I.see("Judicial sitting records");
  I.see("Sitting records for " + socialSecurityTribunalService + ', ' + bournemouthFullVenue + ", for " + randomDay + "/" + randomMonth + "/" + year);
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.createSittingRecord(maryGallegosName, regionalTribunalJudgeRole, morningPeriod);
  JudicialSittingRecordsPage.clickDelete();
  I.click('Cancel');
  I.see("Judicial sitting records");
  I.see("Sitting records for " + socialSecurityTribunalService + ', ' + bournemouthFullVenue + ", for " + randomDay + "/" + randomMonth + "/" + year);
  JudicialSittingRecordsPage.seeSittingRecords(maryGallegosName, regionalTribunalJudgeRole, morningPeriod, jpsRecorderRole);
});

Scenario('Show error when trying to delete record created by another user @S-007.3',({ I}) => {
  I.loginWithJPSSubmitterUser();
  ManageJudicialSittingRecordsPage.seeCommonLandingPage();
  I.click('Find, add or delete a sitting record');
  I.click('Continue');
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, londonVenue, randomDay, randomMonth, year);
  I.click("Continue");
  I.see("Judicial sitting records");
  I.see("Sitting records for "  + socialSecurityTribunalService + ', ' + londonFullVenue + ', for ' + randomDay + "/" + randomMonth + "/" + year);
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.createSittingRecord(brandonRojasName, tribunalMemberDisabilityRole, afternoonPeriod);
  I.click('Sign out');
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, londonVenue, randomDay, randomMonth, year);
  I.click("Continue");
  JudicialSittingRecordsPage.clickDelete();
  I.click('Delete');
  I.see('There is a problem');
  I.see('Selected sitting record was not recorded by the recorder. Record cannot be deleted.');
});