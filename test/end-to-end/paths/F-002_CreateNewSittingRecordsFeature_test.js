const AddSittingRecordsPage = require('../pages/AddSittingRecordsPage');
const ConfirmNewSittingRecordsPage = require('../pages/ConfirmNewSittingRecordsPage');
const JudicialSittingRecordsPage = require('../pages/JudicialSittingRecordsPage');
const ManageJudicialSittingRecordsPage = require('../pages/ManageJudicialSittingRecordsPage');

Feature('Create new Sitting Records Feature Tests @functional @F-002');

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

Scenario('User is able to successfully save a single Sitting Record @S-002.1',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDays[0], randomMonths[0], '2022');
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.createSittingRecord('Joe Ambrose', 'Tribunal Judge', 'Afternoon');
});

Scenario('User is successfully able to save multiple Sitting Records @S-002.2',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDays[0], randomMonths[0], '2022');
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe Ambrose', 'Tribunal Judge');
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH('Mary', 'Regional Tribunal Judge', 1);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH('Brandon', 'Tribunal Member Disability', 2);
  AddSittingRecordsPage.selectPeriod('Morning');
  I.click('Continue');
  ConfirmNewSittingRecordsPage.confirmSittingRecords('Joe Ambrose', 'Tribunal Judge', 'Morning', 'jps recorder');
  I.click('Save Record(s)');
  I.see('Sitting record(s) saved');
});

Scenario('User is able to remove a Sitting Record by clicking on Remove button @S-002.3',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDays[0], randomMonths[0], '2022');
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe Ambrose', 'Tribunal Judge');
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH('Mary', 'Regional Tribunal Judge', 1);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH('Brandon', 'Tribunal Member Disability', 2);
  AddSittingRecordsPage.removeJOH('Brandon')
  I.dontSee('Judicial office holder 3');
});

Scenario('User should not be able to add more than 3 Sitting Records in UI @S-002.4',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDays[0], randomMonths[0], '2022');
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe Ambrose', 'Tribunal Judge');
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH('Mary', 'Regional Tribunal Judge', 1);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH('Brandon', 'Tribunal Member Disability', 2);
  I.dontSee('Add Another');
});

Scenario('Continue button is disabled when Role is not selected @S-002.6',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDays[0], randomMonths[0], '2022');
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe Ambrose', '');
  AddSittingRecordsPage.selectPeriod('Morning');
  I.seeElement('.govuk-button[disabled]');
});

Scenario('User should not be allowed to select a Role for Judicial Office Holder before entering valid Name @S-002.7',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDays[0], randomMonths[0], '2022');
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.seeElement('#role[disabled]');
});

Scenario('Continue button is disabled when Period is not selected @S-002.8',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDays[0], randomMonths[0], '2022');
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe Ambrose', 'Tribunal Judge');
  I.seeElement('.govuk-button[disabled]');
});

Scenario('User is displayed "Manage judicial sitting records" when Cancel is clicked while adding new Sitting Record(s) @S-002.9',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDays[0], randomMonths[0], '2022');
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe Ambrose', 'Tribunal Judge');
  AddSittingRecordsPage.selectPeriod('Afternoon');
  I.click('Cancel');
  I.see('Manage judicial sitting records');
});

Scenario('User is displayed "Manage judicial sitting records" when Cancel is clicked while confirming new Sitting Record(s) @S-002.10',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDays[0], randomMonths[0], '2022');
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe Ambrose', 'Tribunal Judge');
  AddSittingRecordsPage.selectPeriod('Full day');
  I.click('Continue');
  ConfirmNewSittingRecordsPage.confirmSittingRecords('Joe Ambrose', 'Tribunal Judge', 'Full day', 'jps recorder');
  I.click('Cancel');
  I.see('Manage judicial sitting records');
});

Scenario('User is displayed "Judicial sitting records" when Previous button is clicked while confirming new Sitting Record(s) @S-002.11',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDays[0], randomMonths[0], '2022');
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe Ambrose', 'Tribunal Judge');
  AddSittingRecordsPage.selectPeriod('Full day');
  I.click('Continue');
  ConfirmNewSittingRecordsPage.confirmSittingRecords('Joe Ambrose', 'Tribunal Judge', 'Full day', 'jps recorder');
  I.click('Previous');
  I.see('Add sitting records for Social Security and Child Support, Sutton Social Security and Child Support Tribunal (Copthall House), for ' + randomDays[0] + '/' + randomMonths[0] + '/2022');
  I.seeInField('#judge-0', 'Joe Ambrose');
  I.seeInField('#role', 'Tribunal Judge');
});

Scenario('User will be displayed potential duplicate record #AC01 @S-002.12',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDays[1], randomMonths[1], '2022');
  I.click('Continue');  
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.createSittingRecord('Joe Am', 'Tribunal Judge', 'Morning');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Mary', 'Regional Tribunal Judge');
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH('Joe Am', 'Recorder', 1);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH('Brandon', 'Tribunal Member Disability', 2);
  AddSittingRecordsPage.selectPeriod('Morning');
  I.click('Continue');
  ConfirmNewSittingRecordsPage.confirmSittingRecords('Joe Ambrose', 'Recorder', 'Morning', 'jps recorder');
  I.potentialDuplicateFound();
  I.checkOption('//*[@id="main-content"]/div[1]/app-potential-duplicate/table/tbody/tr[1]/td[9]/div/div/input');
  I.click('Continue');
  ConfirmNewSittingRecordsPage.confirmSittingRecords('Joe Ambrose', 'Recorder', 'Morning', 'jps recorder');
  I.saveNewRecord();
  I.see('Judicial sitting records');
  JudicialSittingRecordsPage.checkRecord('Brandon Rojas', 'Tribunal Member Disability', 'Morning', 'jps recorder', 'Recorded');
  JudicialSittingRecordsPage.checkRecord('Joe Ambrose', 'Recorder', 'Morning', 'jps recorder', 'Recorded');
  JudicialSittingRecordsPage.checkRecord('Joe Ambrose', 'Tribunal Judge', 'Morning', 'jps recorder', 'Deleted');
  JudicialSittingRecordsPage.checkRecord('Mary Gallegos', 'Regional Tribunal Judge', 'Morning', 'jps recorder', 'Recorded');
});

Scenario('User will be displayed invalid duplicate record #AC02 @S-002.13',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDays[2], randomMonths[2], '2022');
  I.click('Continue');  
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.createSittingRecord('Joe Ambrose', 'Tribunal Judge', 'Morning');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Mary', 'Regional Tribunal Judge');
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH('Joe Ambrose', 'Tribunal Judge', 1);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH('Brandon', 'Tribunal Member Disability', 2);
  AddSittingRecordsPage.selectPeriod('Morning');
  I.click('Continue');
  ConfirmNewSittingRecordsPage.confirmSittingRecords('Joe Ambrose', 'Tribunal Judge', 'Morning', 'jps recorder');
  I.recordAlreadyExists();
  I.click('Continue');
  I.saveNewRecord();
  JudicialSittingRecordsPage.checkRecord('Brandon Rojas', 'Tribunal Member Disability', 'Morning', 'jps recorder', 'Recorded');
  JudicialSittingRecordsPage.checkRecord('Joe Ambrose', 'Tribunal Judge', 'Morning', 'jps recorder', 'Recorded');
  JudicialSittingRecordsPage.checkRecord('Mary Gallegos', 'Regional Tribunal Judge', 'Morning', 'jps recorder', 'Recorded');
});

Scenario('User will be displayed potential duplicate and invalid duplicate records #AC03 @S-002.14',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDays[3], randomMonths[3], '2022');
  I.click('Continue');  
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.createSittingRecord('Joe Ambrose', 'Recorder', 'Morning');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.createSittingRecord('Mary Gallegos', 'Regional Tribunal Judge', 'Morning');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Mary', 'Regional Tribunal Judge');
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH('Joe Ambrose', 'Tribunal Judge', 1);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH('Brandon', 'Tribunal Member Disability', 2);
  AddSittingRecordsPage.selectPeriod('Morning');
  I.click('Continue');
  ConfirmNewSittingRecordsPage.confirmSittingRecords('Joe Ambrose', 'Tribunal Judge', 'Morning', 'jps recorder');
  I.potentialDuplicateFound();
  I.see('Record already exists');
  I.checkOption('//*[@id="main-content"]/div[1]/app-potential-duplicate/table/tbody/tr[1]/td[9]/div/div/input');
  I.newRecordToSubmit();
  I.saveNewRecord();
  JudicialSittingRecordsPage.checkRecord('Brandon Rojas', 'Tribunal Member Disability', 'Morning', 'jps recorder', 'Recorded');
  JudicialSittingRecordsPage.checkRecord('Joe Ambrose', 'Tribunal Judge', 'Morning', 'jps recorder', 'Recorded');
  JudicialSittingRecordsPage.checkRecord('Joe Ambrose', 'Recorder', 'Morning', 'jps recorder', 'Deleted');
  JudicialSittingRecordsPage.checkRecord('Mary Gallegos', 'Regional Tribunal Judge', 'Morning', 'jps recorder', 'Recorded');
});

Scenario('User will be displayed potential duplicate and user saves already existing record(s) screen #AC04 @S-002.15',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDays[4], randomMonths[4], '2022');
  I.click('Continue');  
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.createSittingRecord('Joe Ambrose', 'Tribunal Judge', 'Morning');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Mary', 'Regional Tribunal Judge');
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH('Joe Ambrose', 'Recorder', 1);
  I.click('Add Another');
  AddSittingRecordsPage.selectJOH('Brandon', 'Tribunal Member Disability', 2);
  AddSittingRecordsPage.selectPeriod('Morning');
  I.click('Continue');
  ConfirmNewSittingRecordsPage.confirmSittingRecords('Joe Ambrose', 'Recorder', 'Morning', 'jps recorder');
  I.potentialDuplicateFound();
  I.checkOption('//*[@id="main-content"]/div[1]/app-potential-duplicate/table/tbody/tr[3]/td[9]/div/div/input');
  I.newRecordToSubmit();
  I.saveNewRecord();
  JudicialSittingRecordsPage.checkRecord('Brandon Rojas', 'Tribunal Member Disability', 'Morning', 'jps recorder', 'Recorded');
  JudicialSittingRecordsPage.checkRecord('Joe Ambrose', 'Tribunal Judge', 'Morning', 'jps recorder', 'Recorded');
  JudicialSittingRecordsPage.checkRecord('Mary Gallegos', 'Regional Tribunal Judge', 'Morning', 'jps recorder', 'Recorded');
});

Scenario('User will be displayed only one potential duplicate record and user saves already existing record @S-002.16',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDays[5], randomMonths[5], '2022');
  I.click('Continue');  
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.createSittingRecord('Joe Ambrose', 'Tribunal Judge', 'Morning');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe Ambrose', 'Recorder');
  AddSittingRecordsPage.selectPeriod('Morning');
  I.click('Continue');
  ConfirmNewSittingRecordsPage.confirmSittingRecords('Joe Ambrose', 'Recorder', 'Morning', 'jps recorder');
  I.potentialDuplicateFound();
  I.checkOption('//*[@id="main-content"]/div[1]/app-potential-duplicate/table/tbody/tr[3]/td[9]/div/div/input');
  I.click('Continue');
  I.existingRecordSaved();
  JudicialSittingRecordsPage.checkRecord('Joe Ambrose', 'Tribunal Judge', 'Morning', 'jps recorder', 'Recorded');
});

Scenario('User will be displayed one invalid duplicate record and nothing saved @S-002.17',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDays[6], randomMonths[6], '2022');
  I.click('Continue');  
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.createSittingRecord('Joe Ambrose', 'Tribunal Judge', 'Afternoon');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe Ambrose', 'Tribunal Judge');
  AddSittingRecordsPage.selectPeriod('Afternoon');
  I.click('Continue');
  ConfirmNewSittingRecordsPage.confirmSittingRecords('Joe Ambrose', 'Tribunal Judge', 'Afternoon', 'jps recorder');
  I.recordAlreadyExists();
  I.click('Continue');
  I.existingRecordSaved();
  JudicialSittingRecordsPage.checkRecord('Joe Ambrose', 'Tribunal Judge', 'Afternoon', 'jps recorder', 'Recorded');
});
