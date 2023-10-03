sconst { I } = inject();

function addSittingRecordsInformation(tribunal, venue, day, month, year) {
  I.waitForVisible('.govuk-heading-l', 10);
  I.see('Manage judicial sitting records');
  I.see('Find, add or delete judicial sitting records');
  I.selectOption('Select a tribunal service', tribunal);
  I.wait(3);
  I.fillField('Select a venue', venue);
  I.wait(3);
  I.click('.mdc-list-item__primary-text');
  I.fillField('Day', day);
  I.fillField('Month', month);
  I.fillField('Year', year);
}

function seeCommonLandingPage() {
  I.waitForVisible('.govuk-heading-l', 10);
  I.see('Manage Judicial Sitting Records');
  I.see('What would you like to do?');
}

function selectSittingRecordsToSubmitToFinance(service, region, day, month, year) {
  I.see('Submit sitting records to Finance');
  I.click('Submit sitting records to Finance');
  I.selectOption('Select a service', service);
  I.click('Select a region');
  I.selectOption('Select a region', region);
  I.fillField('Day', day);
  I.fillField('Month', month);
  I.fillField('Year', year);
}

module.exports = { addSittingRecordsInformation, seeCommonLandingPage, selectSittingRecordsToSubmitToFinance }
