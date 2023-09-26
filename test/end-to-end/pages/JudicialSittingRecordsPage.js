const { I } = inject();

function clickAddSittingRecords() {
  I.see('Judicial sitting records');
  I.click('Add Sitting Record(s)');
}

function checkRecord(name, role, period, enteredBy, status) {
  I.see(name);
  I.see(role);
  I.see(period);
  I.see(enteredBy);
  I.see(status);
}

module.exports = { clickAddSittingRecords, checkRecord }
