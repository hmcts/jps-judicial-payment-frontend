const AddSittingRecordsPage = require('../pages/AddSittingRecordsPage');
const ConfirmNewSittingRecordsPage = require('../pages/ConfirmNewSittingRecordsPage');
const JudicialSittingRecordsPage = require('../pages/JudicialSittingRecordsPage');
const {addSittingRecordsInformation} = require('../pages/ManageJudicialSittingRecordsPage');

Feature('Create new Sitting Records Feature Tests @functional @F-002');

Before(({ I, RandomDateHelper }) => {
  const randomDay = RandomDateHelper.getRandomDay();
  const randomMonth = RandomDateHelper.getRandomMonth();
  const randomYear = RandomDateHelper.getRandomYear();

  I.loginWithJPSRecorderUser();
  addSittingRecordsInformation('BBA3', 'Sutton', randomDay, randomMonth, randomYear);
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
});

Scenario('User is able to successfully save a single Sitting Record @S-002.1',({ I}) => {
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  AddSittingRecordsPage.selectPeriod('Full day');
  ConfirmNewSittingRecordsPage.confirmSittingRecords('Joe Bloggs', 'Judge', 'Full day', 'Recorder');
  I.click('Save record(s)');
  I.see('Sitting record(s) saved');
});

Scenario('User is successfully able to save multiple Sitting Records @S-002.2',({ I}) => {
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  I.click('Add another');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  I.click('Add another');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  AddSittingRecordsPage.selectPeriod('Full day');
  ConfirmNewSittingRecordsPage.confirmSittingRecords('Joe Bloggs', 'Judge', 'Full day', 'Recorder');
  I.click('Save record(s)');
  I.see('Sitting record(s) saved')
});

Scenario('User is able to remove a Sitting Record by clicking on Remove button @S-002.3',({ I}) => {
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  I.click('Add another')
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  I.click('Add another')
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joan', 'judge');
  AddSittingRecordsPage.removeJOH('Joan')
  I.dontSee('Judicial office holder 3');
});

Scenario('User should not be able to add more than 3 Sitting Records in UI @S-002.4',({ I}) => {
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  I.click('Add another');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  I.click('Add another');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  I.dontSee('Add another');
});

Scenario('Display error message "Enter valid Judicial Office Holder Name @S-002.5',({ I}) => {
  AddSittingRecordsPage.selectJOH('', 'judge');
  AddSittingRecordsPage.selectPeriod('AM');
  I.click('Continue');
  I.see('Enter valid Judicial Office Holder Name');
});

Scenario('Display error message "Select valid Role" @S-002.6',({ I}) => {
  AddSittingRecordsPage.selectJOH('Joe', '');
  AddSittingRecordsPage.selectPeriod('PM');
  I.click('Continue');
  I.see('Select valid Role');
});

Scenario('User should not be allowed to select a Role for Judicial Office Holder before entering valid Name @S-002.7',({ I}) => {
  I.seeElement('#role[disabled]');
});

Scenario('Display error message "Select valid Period value" @S-002.8',({ I}) => {
  AddSittingRecordsPage.selectJOH('Joe', 'Judge');
  I.click('Continue');
  I.see('Select valid Period value');
});

Scenario('User is displayed "Manage judicial sitting records" when Cancel is clicked while adding new Sitting Record(s) @S-002.9',({ I}) => {
  AddSittingRecordsPage.selectJOH('Joe', 'Judge');
  AddSittingRecordsPage.selectPeriod('PM');
  I.click('Cancel');
  I.see('Manage judicial sitting records');
});

Scenario('User is displayed "Manage judicial sitting records" when Cancel is clicked while confirming new Sitting Record(s) @S-002.10',({ I}) => {
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  AddSittingRecordsPage.selectPeriod('Full day');
  ConfirmNewSittingRecordsPage.confirmSittingRecords('Joe Bloggs', 'Judge', 'Full day', 'Recorder');
  I.click('Cancel');
  I.see('Manage judicial sitting records');
});

Scenario('User is displayed "Judicial sitting records" when Previous button is clicked while confirming new Sitting Record(s) @S-002.11',({ I}) => {
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  AddSittingRecordsPage.selectPeriod('Full day');
  ConfirmNewSittingRecordsPage.confirmSittingRecords('Joe Bloggs', 'Judge', 'Full day', 'Recorder');
  I.click('Previous');
  I.see('Judicial sitting records');
});

Scenario('User will displayed potential duplicate record @S-002.12',({ I}) => {
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  AddSittingRecordsPage.selectPeriod('Full day');
  ConfirmNewSittingRecordsPage.confirmSittingRecords('Joe Bloggs', 'Judge', 'Full day', 'Recorder');
  I.click('Save record(s)');
  I.see('Sitting record(s) saved');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  I.click('Add another');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  I.click('Add another');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  AddSittingRecordsPage.selectPeriod('Full day');
  I.click('Continue');
  I.see('Record Cannot be Saved');
  I.selectOption('');
  I.click('Save records');
});

Scenario('User will displayed invalid duplicate record @S-002.13',({ I}) => {
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  AddSittingRecordsPage.selectPeriod('Full day');
  ConfirmNewSittingRecordsPage.confirmSittingRecords('Joe Bloggs', 'Judge', 'Full day', 'Recorder');
  I.click('Save record(s)');
  I.see('Sitting record(s) saved');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  I.click('Add another');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  I.click('Add another');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  AddSittingRecordsPage.selectPeriod('Full day');
  I.click('Continue');
  I.see('Record Cannot be Saved');
});

Scenario('User will displayed potential duplicate and user saves already existing record(s) screen @S-002.14',({ I}) => {
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  AddSittingRecordsPage.selectPeriod('Full day');
  ConfirmNewSittingRecordsPage.confirmSittingRecords('Joe Bloggs', 'Judge', 'Full day', 'Recorder');
  I.click('Save record(s)');
  I.see('Sitting record(s) saved');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  I.click('Add another');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  I.click('Add another');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  AddSittingRecordsPage.selectPeriod('Full day');
  I.click('Continue');
  I.see('Record Cannot be Saved');
  I.selectOption('');
  I.click('Save records');
  I.see('Existing sitting record(s) saved');
});

Scenario('User will displayed potential duplicate and user saves already existing record(s) @S-002.15',({ I}) => {
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  AddSittingRecordsPage.selectPeriod('Full day');
  ConfirmNewSittingRecordsPage.confirmSittingRecords('Joe Bloggs', 'Judge', 'Full day', 'Recorder');
  I.click('Save record(s)');
  I.see('Sitting record(s) saved');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  I.click('Add another');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  I.click('Add another');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  AddSittingRecordsPage.selectPeriod('Full day');
  I.click('Continue');
  I.see('Record Cannot be Saved');
  I.selectOption('');
  I.click('Save records');
  I.see('Existing sitting record(s) saved');
});
