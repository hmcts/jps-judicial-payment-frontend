const { I } = inject();

function clickAddSittingRecords() {

  I.amOnPage("/")
  I.see('Judicial sitting records');
  I.click('Add sitting records');
}

module.exports = { clickAddSittingRecords }
