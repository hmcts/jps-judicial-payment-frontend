const { I } = inject();

function clickAddSittingRecords() {
  I.see('Judicial sitting records');
  I.click('Add Sitting Record(s)');
}

module.exports = { clickAddSittingRecords }
