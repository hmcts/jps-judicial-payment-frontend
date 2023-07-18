const { I } = inject();

function addSittingRecordsInformation(tribunal, venue, day, month, year) {
  I.see('Manage Judicial Sitting Records');
  I.see('Find, add or delete judicial sitting records');
  I.selectOption('Select a tribunal service', tribunal);
  I.fillField('Select a venue', venue);
  I.click('.mdc-list-item__primary-text');
  I.fillField('Day', day);
  I.fillField('Month', month);
  I.fillField('Year', year);
}

module.exports = { addSittingRecordsInformation }
