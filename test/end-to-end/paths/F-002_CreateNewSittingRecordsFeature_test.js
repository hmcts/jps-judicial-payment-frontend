const AddSittingRecordsPage = require('../pages/AddSittingRecordsPage');
const ConfirmNewSittingRecordsPage = require('../pages/ConfirmNewSittingRecordsPage');
const JudicialSittingRecordsPage = require('../pages/JudicialSittingRecordsPage');
const ManageJudicialSittingRecordsPage = require('../pages/ManageJudicialSittingRecordsPage');

Feature('Create new Sitting Records Feature Tests @functional @F-002');

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
const fullDayPeriod = 'Full day';
const socialSecurityTribunalService = 'Social Security and Child Support';
const suttonVenue = 'Sutton';
const londonVenue = 'London';
const jpsRecorderRole = 'jps recorder';


Scenario('User is able to successfully save a single Sitting Record @S-002.1',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDay, randomMonth, year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.createSittingRecord(joeAmbroseName, tribunalJudgeRole, afternoonPeriod);
});

Scenario('User is successfully able to save multiple Sitting Records @S-002.2',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, londonVenue, randomDay, randomMonth, year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH(joeAmbroseName, tribunalJudgeRole);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH(maryGallegosName, regionalTribunalJudgeRole, 1);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH(brandonRojasName, tribunalMemberDisabilityRole, 2);
  AddSittingRecordsPage.selectPeriod(morningPeriod);
  I.click('Continue');
  ConfirmNewSittingRecordsPage.confirmSittingRecords(joeAmbroseName, tribunalJudgeRole, morningPeriod, jpsRecorderRole);
  I.click('Save Record(s)');
  I.see('Sitting record(s) saved');
});

Scenario('User is able to remove a Sitting Record by clicking on Remove button @S-002.3',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDay, randomMonth, year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH(joeAmbroseName, tribunalJudgeRole);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH(maryGallegosName, regionalTribunalJudgeRole, 1);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH(brandonRojasName, tribunalMemberDisabilityRole, 2);
  AddSittingRecordsPage.removeJOH(brandonRojasName);
  I.dontSee('Judicial Office Holder 3');
});

Scenario('User should not be able to add more than 3 Sitting Records in UI @S-002.4',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDay, randomMonth, year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH(joeAmbroseName, tribunalJudgeRole);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH(maryGallegosName, regionalTribunalJudgeRole, 1);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH(brandonRojasName, tribunalMemberDisabilityRole, 2);
  I.dontSee('Add Another');
});

Scenario('Continue button is disabled when Role is not selected @S-002.5',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDay, randomMonth, year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH(joeAmbroseName, '');
  AddSittingRecordsPage.selectPeriod(morningPeriod);
  I.seeElement('.govuk-button[disabled]');
});

Scenario('User should not be allowed to select a Role for Judicial Office Holder before entering valid Name @S-002.6',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDay, randomMonth, year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.seeElement('#role[disabled]');
});

Scenario('Continue button is disabled when Period is not selected @S-002.7',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDay, randomMonth, year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH(joeAmbroseName, tribunalJudgeRole);
  I.seeElement('.govuk-button[disabled]');
});

Scenario('User is displayed "Manage judicial sitting records" when Cancel is clicked while adding new Sitting Record(s) @S-002.8',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDay, randomMonth, year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH(joeAmbroseName, tribunalJudgeRole);
  AddSittingRecordsPage.selectPeriod(afternoonPeriod);
  AddSittingRecordsPage.cancelClicked(socialSecurityTribunalService, suttonVenue, randomDay, randomMonth, year);
});

Scenario('User is displayed "Manage judicial sitting records" when Cancel is clicked while confirming new Sitting Record(s) @S-002.9',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDay, randomMonth, year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH(joeAmbroseName, tribunalJudgeRole);
  AddSittingRecordsPage.selectPeriod(fullDayPeriod);
  I.click('Continue');
  ConfirmNewSittingRecordsPage.confirmSittingRecords(joeAmbroseName, tribunalJudgeRole, fullDayPeriod, jpsRecorderRole);
  AddSittingRecordsPage.cancelClicked(socialSecurityTribunalService, suttonVenue, randomDay, randomMonth, year);
});

Scenario('User is displayed "Judicial sitting records" when Previous button is clicked while confirming new Sitting Record(s) @S-002.10',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDay, randomMonth, year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH(joeAmbroseName, tribunalJudgeRole);
  AddSittingRecordsPage.selectPeriod(fullDayPeriod);
  I.click('Continue');
  ConfirmNewSittingRecordsPage.confirmSittingRecords(joeAmbroseName, tribunalJudgeRole, fullDayPeriod, jpsRecorderRole);
  AddSittingRecordsPage.previousClicked(joeAmbroseName, tribunalJudgeRole);
});