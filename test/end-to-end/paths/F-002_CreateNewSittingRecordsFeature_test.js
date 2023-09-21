const AddSittingRecordsPage = require('../pages/AddSittingRecordsPage');
const ConfirmNewSittingRecordsPage = require('../pages/ConfirmNewSittingRecordsPage');
const JudicialSittingRecordsPage = require('../pages/JudicialSittingRecordsPage');
const ManageJudicialSittingRecordsPage = require('../pages/ManageJudicialSittingRecordsPage');

Feature('Create new Sitting Records Feature Tests @functional @F-002');

const randomDay = ('0' + (Math.floor(Math.random() * 28) + 1)).slice(-2);
const randomMonth = ('0' + (Math.floor(Math.random() * 12) + 1)).slice(-2);

Scenario('User is able to successfully save a single Sitting Record @S-002.1',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDay, randomMonth, '2022');
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.createSittingRecord('Joe Ambrose', 'Tribunal Judge', 'Afternoon');
});

Scenario('User is successfully able to save multiple Sitting Records @S-002.2',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDay, randomMonth, '2022');
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
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDay, randomMonth, '2022');
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
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDay, randomMonth, '2022');
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
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDay, randomMonth, '2022');
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe Ambrose', '');
  AddSittingRecordsPage.selectPeriod('Morning');
  I.seeElement('.govuk-button[disabled]');
});

Scenario('User should not be allowed to select a Role for Judicial Office Holder before entering valid Name @S-002.7',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDay, randomMonth, '2022');
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.seeElement('#role[disabled]');
});

Scenario('Continue button is disabled when Period is not selected @S-002.8',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDay, randomMonth, '2022');
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe Ambrose', 'Tribunal Judge');
  I.seeElement('.govuk-button[disabled]');
});

Scenario('User is displayed "Manage judicial sitting records" when Cancel is clicked while adding new Sitting Record(s) @S-002.9',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDay, randomMonth, '2022');
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe Ambrose', 'Tribunal Judge');
  AddSittingRecordsPage.selectPeriod('Afternoon');
  I.click('Cancel');
  I.see('Manage judicial sitting records');
});

Scenario('User is displayed "Manage judicial sitting records" when Cancel is clicked while confirming new Sitting Record(s) @S-002.10',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDay, randomMonth, '2022');
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
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDay, randomMonth, '2022');
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe Ambrose', 'Tribunal Judge');
  AddSittingRecordsPage.selectPeriod('Full day');
  I.click('Continue');
  ConfirmNewSittingRecordsPage.confirmSittingRecords('Joe Ambrose', 'Tribunal Judge', 'Full day', 'jps recorder');
  I.click('Previous');
  I.see('Add sitting records for Social Security and Child Support, Sutton Social Security and Child Support Tribunal (Copthall House), for ' + randomDay + '/' + randomMonth + '/2022');
});

Scenario('User is shown newly added sitting record when they click on "View record table" on the confirmation screen @S-002.12',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'London', randomDay, randomMonth, '2022');
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  I.createSittingRecord('Mary', 'Regional Tribunal Judge', 'Afternoon');
});

