const { I } = inject();

function clickAddSittingRecords() {
  I.amOnPage("/")
  I.see('Judicial sitting records');
  I.click('Add sitting records');
}

function seeSittingRecord(name, role, period, enteredBy, status) {
  I.see(name);
  I.see(role);
  I.see(period);
  I.see(enteredBy);
  I.see(status);
}

module.exports = { clickAddSittingRecords, seeSittingRecord }
