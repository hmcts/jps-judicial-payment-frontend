const AddSittingRecordsPage = require('../pages/AddSittingRecordsPage');
const ConfirmNewSittingRecordsPage = require('../pages/ConfirmNewSittingRecordsPage');
const JudicialSittingRecordsPage = require('../pages/JudicialSittingRecordsPage');
const ManageJudicialSittingRecordsPage = require('../pages/ManageJudicialSittingRecordsPage');
const PossibleDuplicatesPage = require('../pages/PossibleDuplicatesPage')

Feature('Create new Sitting Records Feature Tests @functional @F-002').retry(2);

const randomDays = [];
for (let i = 0; randomDays.length < 7; i++) {
  let num = ('0' + (Math.floor(Math.random() * 28) + 1)).slice(-2);
  if (randomDays.includes(num)) { continue; }
  randomDays.push(num);
}

const randomMonths = [];
for (let i = 0; randomMonths.length < 7; i++) {
  let num = ('0' + (Math.floor(Math.random() * 12) + 1)).slice(-2);
  if (randomMonths.includes(num)) { continue; }
  randomMonths.push(num);
}
const year = '2022';

const joeAmbroseName = 'Joe Ambrose';
const maryGallegosName = 'Mary Gallegos';
const brandonRojasName = 'Brandon Rojas';
const tribunalJudgeRole = 'Tribunal Judge';
const regionalTribunalJudgeRole = 'Regional Tribunal Judge';
const tribunalMemberDisabilityRole = 'Tribunal Member Disability';
const johRecorderRole = 'Recorder';
const morningPeriod = 'Morning';
const afternoonPeriod = 'Afternoon';
const fullDayPeriod = 'Full day';
const socialSecurityTribunalService = 'Social Security and Child Support';
const suttonVenue = 'Sutton';
const londonVenue = 'London';
const jpsRecorderRole = 'jps recorder';
const recordedStatus = 'Recorded';
const deletedStatus = 'Deleted';

Scenario('User is able to successfully save a single Sitting Record @S-002.1',async ({ I}) => {
  await I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDays[0], randomMonths[0], year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.createSittingRecord(joeAmbroseName, tribunalJudgeRole, afternoonPeriod);
});

Scenario('User is successfully able to save multiple Sitting Records @S-002.2',async ({ I}) => {
  await I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, londonVenue, randomDays[0], randomMonths[0], year);
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

Scenario('User is able to remove a Sitting Record by clicking on Remove button @S-002.3',async ({ I}) => {
  await I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDays[0], randomMonths[0], year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH(joeAmbroseName, tribunalJudgeRole);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH(maryGallegosName, regionalTribunalJudgeRole, 1);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH(brandonRojasName, tribunalMemberDisabilityRole, 2);
  AddSittingRecordsPage.removeJOH(2);
  I.dontSee('Judicial Office Holder 3');
});

Scenario('User should not be able to add more than 3 Sitting Records in UI @S-002.4',async ({ I}) => {
  await I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDays[0], randomMonths[0], year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH(joeAmbroseName, tribunalJudgeRole);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH(maryGallegosName, regionalTribunalJudgeRole, 1);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH(brandonRojasName, tribunalMemberDisabilityRole, 2);
  I.dontSee('Add Another');
});

Scenario('Continue button is disabled when Role is not selected @S-002.5',async ({ I}) => {
  await I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDays[0], randomMonths[0], year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH(joeAmbroseName, '');
  AddSittingRecordsPage.selectPeriod(morningPeriod);
  I.seeElement('.govuk-button[disabled]');
});

Scenario('User should not be allowed to select a Role for Judicial Office Holder before entering valid Name @S-002.6',async ({ I}) => {
  await I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDays[0], randomMonths[0], year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.seeElement('#role[disabled]');
});

Scenario('Continue button is disabled when Period is not selected @S-002.7',async ({ I}) => {
  await I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDays[0], randomMonths[0], year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH(joeAmbroseName, tribunalJudgeRole);
  I.seeElement('.govuk-button[disabled]');
});

Scenario('User is displayed "Manage judicial sitting records" when Cancel is clicked while adding new Sitting Record(s) @S-002.8',async ({ I}) => {
  await I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDays[0], randomMonths[0], year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH(joeAmbroseName, tribunalJudgeRole);
  AddSittingRecordsPage.selectPeriod(afternoonPeriod);
  AddSittingRecordsPage.clickCancel(socialSecurityTribunalService, suttonVenue, randomDays[0], randomMonths[0], year);
});

Scenario('User is displayed "Manage judicial sitting records" when Cancel is clicked while confirming new Sitting Record(s) @S-002.9',async ({ I}) => {
  await I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDays[0], randomMonths[0], year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH(joeAmbroseName, tribunalJudgeRole);
  AddSittingRecordsPage.selectPeriod(fullDayPeriod);
  I.click('Continue');
  ConfirmNewSittingRecordsPage.confirmSittingRecords(joeAmbroseName, tribunalJudgeRole, fullDayPeriod, jpsRecorderRole);
  AddSittingRecordsPage.clickCancel(socialSecurityTribunalService, suttonVenue, randomDays[0], randomMonths[0], year);
});

Scenario('User is displayed "Judicial sitting records" when Previous button is clicked while confirming new Sitting Record(s) @S-002.10',async ({ I}) => {
  await I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDays[0], randomMonths[0], year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH(joeAmbroseName, tribunalJudgeRole);
  AddSittingRecordsPage.selectPeriod(fullDayPeriod);
  I.click('Continue');
  ConfirmNewSittingRecordsPage.confirmSittingRecords(joeAmbroseName, tribunalJudgeRole, fullDayPeriod, jpsRecorderRole);
  AddSittingRecordsPage.clickPrevious(joeAmbroseName, tribunalJudgeRole);
});

Scenario('User will be displayed potential duplicate record #AC01 @S-002.11',async ({ I}) => {
  await I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDays[1], randomMonths[1], year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.createSittingRecord(joeAmbroseName, tribunalJudgeRole, morningPeriod);
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH(maryGallegosName, regionalTribunalJudgeRole);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH(joeAmbroseName, johRecorderRole, 1);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH(brandonRojasName, tribunalMemberDisabilityRole, 2);
  AddSittingRecordsPage.selectPeriod(morningPeriod);
  I.click('Continue');
  ConfirmNewSittingRecordsPage.confirmSittingRecords(joeAmbroseName, johRecorderRole, morningPeriod, jpsRecorderRole);
  PossibleDuplicatesPage.potentialDuplicateFound();
  I.checkOption('//*[@id="main-content"]/div[1]/app-potential-duplicate/table/tbody/tr[1]/td[9]/div/div/input');
  I.click('Continue');
  ConfirmNewSittingRecordsPage.confirmSittingRecords(joeAmbroseName, johRecorderRole, morningPeriod, jpsRecorderRole);
  PossibleDuplicatesPage.saveNewRecord();
  I.waitForText('Judicial sitting records');
  JudicialSittingRecordsPage.seeRecords(brandonRojasName, tribunalMemberDisabilityRole, morningPeriod, jpsRecorderRole, recordedStatus);
  JudicialSittingRecordsPage.seeRecords(joeAmbroseName, johRecorderRole, morningPeriod, jpsRecorderRole, recordedStatus);
  JudicialSittingRecordsPage.seeRecords(joeAmbroseName, tribunalJudgeRole, morningPeriod, jpsRecorderRole, deletedStatus);
  JudicialSittingRecordsPage.seeRecords(maryGallegosName, regionalTribunalJudgeRole, morningPeriod, jpsRecorderRole, recordedStatus);
});

Scenario('User will be displayed invalid duplicate record #AC02 @S-002.12',async ({ I}) => {
  await I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDays[2], randomMonths[2], year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.createSittingRecord(joeAmbroseName, tribunalJudgeRole, morningPeriod);
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH(maryGallegosName, regionalTribunalJudgeRole);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH(joeAmbroseName, tribunalJudgeRole, 1);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH(brandonRojasName, tribunalMemberDisabilityRole, 2);
  AddSittingRecordsPage.selectPeriod(morningPeriod);
  I.click('Continue');
  ConfirmNewSittingRecordsPage.confirmSittingRecords(joeAmbroseName, tribunalJudgeRole, morningPeriod, jpsRecorderRole);
  PossibleDuplicatesPage.recordAlreadyExists();
  I.click('Continue');
  PossibleDuplicatesPage.saveNewRecord();
  JudicialSittingRecordsPage.seeRecords(brandonRojasName, tribunalMemberDisabilityRole, morningPeriod, jpsRecorderRole, recordedStatus);
  JudicialSittingRecordsPage.seeRecords(joeAmbroseName, tribunalJudgeRole, morningPeriod, jpsRecorderRole, recordedStatus);
  JudicialSittingRecordsPage.seeRecords(maryGallegosName, regionalTribunalJudgeRole, morningPeriod, jpsRecorderRole, recordedStatus);
});

Scenario('User will be displayed potential duplicate and invalid duplicate records #AC03 @S-002.13',async ({ I}) => {
  await I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDays[3], randomMonths[3], year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.createSittingRecord(joeAmbroseName, johRecorderRole, morningPeriod);
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.createSittingRecord(maryGallegosName, regionalTribunalJudgeRole, morningPeriod);
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH(maryGallegosName, regionalTribunalJudgeRole);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH(joeAmbroseName, tribunalJudgeRole, 1);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH(brandonRojasName, tribunalMemberDisabilityRole, 2);
  AddSittingRecordsPage.selectPeriod(morningPeriod);
  I.click('Continue');
  ConfirmNewSittingRecordsPage.confirmSittingRecords(joeAmbroseName, tribunalJudgeRole, morningPeriod, jpsRecorderRole);
  PossibleDuplicatesPage.potentialDuplicateFound();
  I.see('Record already exists');
  I.checkOption('//*[@id="main-content"]/div[1]/app-potential-duplicate/table/tbody/tr[1]/td[9]/div/div/input');
  PossibleDuplicatesPage.newRecordToSubmit();
  PossibleDuplicatesPage.saveNewRecord();
  JudicialSittingRecordsPage.seeRecords(brandonRojasName, tribunalMemberDisabilityRole, morningPeriod, jpsRecorderRole, recordedStatus);
  JudicialSittingRecordsPage.seeRecords(joeAmbroseName, tribunalJudgeRole, morningPeriod, jpsRecorderRole, recordedStatus);
  JudicialSittingRecordsPage.seeRecords(joeAmbroseName, johRecorderRole, morningPeriod, jpsRecorderRole, deletedStatus);
  JudicialSittingRecordsPage.seeRecords(maryGallegosName, regionalTribunalJudgeRole, morningPeriod, jpsRecorderRole, recordedStatus);
});

Scenario('User will be displayed potential duplicate and user saves already existing record(s) screen #AC04 @S-002.14',async ({ I}) => {
  await I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDays[4], randomMonths[4], year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.createSittingRecord(joeAmbroseName, tribunalJudgeRole, morningPeriod);
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH(maryGallegosName, regionalTribunalJudgeRole);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH(joeAmbroseName, johRecorderRole, 1);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH(brandonRojasName, tribunalMemberDisabilityRole, 2);
  AddSittingRecordsPage.selectPeriod(morningPeriod);
  I.click('Continue');
  ConfirmNewSittingRecordsPage.confirmSittingRecords(joeAmbroseName, johRecorderRole, morningPeriod, jpsRecorderRole);
  PossibleDuplicatesPage.potentialDuplicateFound();
  I.checkOption('//*[@id="main-content"]/div[1]/app-potential-duplicate/table/tbody/tr[3]/td[9]/div/div/input');
  PossibleDuplicatesPage.newRecordToSubmit();
  PossibleDuplicatesPage.saveNewRecord();
  JudicialSittingRecordsPage.seeRecords(brandonRojasName, tribunalMemberDisabilityRole, morningPeriod, jpsRecorderRole, recordedStatus);
  JudicialSittingRecordsPage.seeRecords(joeAmbroseName, tribunalJudgeRole, morningPeriod, jpsRecorderRole, recordedStatus);
  JudicialSittingRecordsPage.seeRecords(maryGallegosName, regionalTribunalJudgeRole, morningPeriod, jpsRecorderRole, recordedStatus);
});

Scenario('User will be displayed only one potential duplicate record and user saves already existing record @S-002.15',async ({ I}) => {
  await I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDays[5], randomMonths[5], year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.createSittingRecord(joeAmbroseName, tribunalJudgeRole, morningPeriod);
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH(joeAmbroseName, johRecorderRole);
  AddSittingRecordsPage.selectPeriod(morningPeriod);
  I.click('Continue');
  ConfirmNewSittingRecordsPage.confirmSittingRecords(joeAmbroseName, johRecorderRole, morningPeriod, jpsRecorderRole);
  PossibleDuplicatesPage.potentialDuplicateFound();
  I.checkOption('//*[@id="main-content"]/div[1]/app-potential-duplicate/table/tbody/tr[3]/td[9]/div/div/input');
  I.click('Continue');
  PossibleDuplicatesPage.existingRecordSaved();
  JudicialSittingRecordsPage.seeRecords(joeAmbroseName, tribunalJudgeRole, morningPeriod, jpsRecorderRole, recordedStatus);
});

Scenario('User will be displayed one invalid duplicate record and nothing saved @S-002.16',async ({ I}) => {
  await I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation(socialSecurityTribunalService, suttonVenue, randomDays[6], randomMonths[6], year);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.createSittingRecord(joeAmbroseName, tribunalJudgeRole, afternoonPeriod);
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH(joeAmbroseName, tribunalJudgeRole);
  AddSittingRecordsPage.selectPeriod(afternoonPeriod);
  I.click('Continue');
  ConfirmNewSittingRecordsPage.confirmSittingRecords(joeAmbroseName, tribunalJudgeRole, afternoonPeriod, jpsRecorderRole);
  PossibleDuplicatesPage.recordAlreadyExists();
  I.click('Continue');
  PossibleDuplicatesPage.existingRecordSaved();
  JudicialSittingRecordsPage.seeRecords(joeAmbroseName, tribunalJudgeRole, afternoonPeriod, jpsRecorderRole, recordedStatus);
});
