const { I } = inject();

function addSittingRecordsInformation(tribunal, venue, day, month, year) {
  I.waitForVisible('.govuk-heading-l', 10);
  I.see('Manage judicial sitting records');
  I.see('Find, add or delete judicial sitting records');
  I.selectOption('Select a tribunal service', tribunal);
  I.fillField('Select a venue', venue);
  I.click('.mdc-list-item__primary-text');
  I.fillField('Day', day);
  I.fillField('Month', month);
  I.fillField('Year', year);
}

function seeCommonLandingPage() {
  I.waitForVisible('.govuk-heading-l', 10);
  I.see('Manage judicial sitting records');
  I.see('What would you like to do?');
}

function selectSittingRecordsToSubmitToFinance(service, region, day, month, year) {
  I.see('Submit sitting records to Finance');
  I.click('Submit sitting records to Finance');
  I.selectOption('//*[@id="sort"]', service);
  I.click('Select a region');
  I.selectOption('#region-select', region);
  I.fillField('Day', day);
  I.fillField('Month', month);
  I.fillField('Year', year);
}

function selectCreatePayrollFileAndPublishRecords(service, day, month, year) {
  I.see('Create payroll file and publish records');
  I.click('Create payroll file and publish records');
  I.selectOption('//*[@id="sort"]', service);
  I.fillField('Day', day);
  I.fillField('Month', month);
  I.fillField('Year', year);
}

module.exports = { addSittingRecordsInformation, seeCommonLandingPage, selectSittingRecordsToSubmitToFinance, selectCreatePayrollFileAndPublishRecords }
