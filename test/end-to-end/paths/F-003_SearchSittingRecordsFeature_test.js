import {before} from "cheerio";

const AddSittingRecordsPage = require('../pages/AddSittingRecordsPage');
const ConfirmNewSittingRecordsPage = require('../pages/ConfirmNewSittingRecordsPage');
const JudicialSittingRecordsPage = require('../pages/JudicialSittingRecordsPage');
const ManageJudicialSittingRecordsPage = require('../pages/ManageJudicialSittingRecordsPage');

Feature('Search Sitting Records Feature Tests @functional @F-002');

before(() => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('BBA3', 'Sutton', '11', '03', '2022');
  I.click('Continue');
  JudicialSittingRecordsPage.clickAddSittingRecords();
  AddSittingRecordsPage.selectJOH('Joe', 'judge');
  AddSittingRecordsPage.selectPeriod('Full day');
  ConfirmNewSittingRecordsPage.confirmSittingRecords('Joe Bloggs', 'Judge', 'Full day', 'Recorder');
  I.click('Save record(s)');
  I.see('Sitting record(s) saved');
});

Scenario('User is able to view Sitting Record(s) @S-003.1',({ I}) => {
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('BBA3', 'Sutton', '11', '03', '2022');
  I.click('Continue');
  JudicialSittingRecordsPage.seeSittingRecord('Joe Bloggs', 'Judge', 'Full Day', 'Recorder', 'Recorded');
});

Scenario('User is displayed "Manage judicial sitting records" when Previous button is clicked @S-003.2',({ I}) => {
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('BBA3', 'Sutton', '11', '03', '2022');
  I.click('Continue');
  I.see('Judicial sitting records');
  I.click('Previous');
  I.see('Manage judicial sitting records');
});
