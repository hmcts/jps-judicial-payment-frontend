import {before} from "cheerio";

const JudicialSittingRecordsPage = require('../pages/JudicialSittingRecordsPage');
const ManageJudicialSittingRecordsPage = require('../pages/ManageJudicialSittingRecordsPage');

Feature('Judicial Sitting Records Page Tests @functional @F-006');

before(() => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('BBA3', 'Sutton', '11', '03', '2022');
  I.click('Continue');
});

Scenario('Successfully continue to "Judicial sitting records" page @S-006.1',({ I}) => {
  I.see("Judicial sitting records");
  I.see("Sitting records for [tribunal service], [venue], for [date]");
});

Scenario('Manage judicial sitting records" page is not displayed for invalid user @S-006.2',({ I}) => {
  I.see("Judicial sitting records");
  I.see("Sitting records for [tribunal service], [venue], for [date]");
});

Scenario('Venue field should be enabled only after tribunal service is selected @S-006.3',({ I}) => {
  I.amOnPage("/");
  I.see('Manage judicial sitting records');
  I.see('Find, add or delete judicial sitting records');
  I.dontSeeElementEnabled('Select a venue');
});

Scenario('Venue field should be reset if tribunal service is changed @S-006.4',({ I}) => {
  I.amOnPage("/");
  I.see('Manage judicial sitting records');
  I.see('Find, add or delete judicial sitting records');
  I.selectOption('Select a tribunal service', 'tribunal');
  I.fillField('Select a venue', venue);
  I.fillField('Day', day);
  I.fillField('Month', month);
  I.fillField('Year', year);
});
