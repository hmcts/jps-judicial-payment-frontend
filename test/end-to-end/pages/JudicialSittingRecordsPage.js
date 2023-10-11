const { I } = inject();

function clickAddSittingRecords() {
  I.waitForVisible('.govuk-button');
  I.click('Add Sitting Record(s)');
}

function seeRecords(name, role, period, enteredBy) {
  I.see(name);
  I.see(role);
  I.see(period);
  I.see(enteredBy);
}

module.exports = { clickAddSittingRecords, seeRecords }
