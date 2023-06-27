const { I } = inject();

function addSittingRecordsInformation(tribunal, venue, day, month, year) {
  I.amOnPage("/");
  I.see('Manage judicial sitting records');
  I.see('Find, add or delete judicial sitting records');
  I.selectOption('Select a tribunal service', tribunal);
  I.fillField('Select a venue', venue);
  I.fillField('Day', day);
  I.fillField('Month', month);
  I.fillField('Year', year);
}

module.exports = { addSittingRecordsInformation }
