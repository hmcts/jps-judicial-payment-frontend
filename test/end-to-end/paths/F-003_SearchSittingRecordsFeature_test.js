const AddSittingRecordsPage = require('../pages/AddSittingRecordsPage');
const ConfirmNewSittingRecordsPage = require('../pages/ConfirmNewSittingRecordsPage');
const JudicialSittingRecordsPage = require('../pages/JudicialSittingRecordsPage');
const ManageJudicialSittingRecordsPage = require('../pages/ManageJudicialSittingRecordsPage');

const randomDay = ('0' + (Math.floor(Math.random() * 28) + 1)).slice(-2);
const randomMonth = ('0' + (Math.floor(Math.random() * 12) + 1)).slice(-2);
const year = '2022';

const joeAmbroseName = 'Joe Ambrose';
const tribunalJudgeRole = 'Tribunal Judge';
const morningPeriod = 'Morning';
const socialSecurityTribunalService = 'Social Security and Child Support';
const suttonVenue = 'Sutton';
const suttonFullVenue = 'Sutton Social Security and Child Support Tribunal (Copthall House)';
const londonVenue = 'London';
const londonFullVenue = 'East London Tribunal Hearing Centre (Import Building)';
const jpsRecorderRole = 'jps recorder';
const recordedStatus = 'Recorded';

Feature('Search Sitting Records Feature Tests @functional @F-003');

Scenario('User is able to view Sitting Record(s) @S-003.1',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, londonVenue, randomDay, randomMonth, year);
  I.click('Continue');
  I.see('Judicial sitting records');
  I.see('Sitting records for ' + socialSecurityTribunalService + ', ' + londonFullVenue + ', for ' + randomDay + '/' + randomMonth + '/' + year);
  I.click('Add Sitting Record(s)');
  I.createSittingRecord(joeAmbroseName, tribunalJudgeRole, morningPeriod);
  JudicialSittingRecordsPage.seeSittingRecord(joeAmbroseName, tribunalJudgeRole, morningPeriod, jpsRecorderRole, recordedStatus);
});

Scenario('User is displayed "Manage judicial sitting records" when Previous button is clicked @S-003.2',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDay, randomMonth, year);
  I.click('Continue');
  I.see('Judicial sitting records');
  I.see('Sitting records for ' + socialSecurityTribunalService + ', ' + suttonFullVenue + ', for ' + randomDay + '/' + randomMonth + '/' + year);
  JudicialSittingRecordsPage.previousClicked(socialSecurityTribunalService, suttonVenue, randomDay, randomMonth, year);
});
