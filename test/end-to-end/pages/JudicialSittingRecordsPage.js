const { I } = inject();

function clickAddSittingRecords() {
  I.waitForVisible('.govuk-button');
  I.click('Add Sitting Record(s)');
  I.waitForText('Select the Judicial office holders (JOH) associated with this sitting', 3);
}

function seeRecords(name, role, period, enteredBy) {
  I.see(name);
  I.see(role);
  I.see(period);
  I.see(enteredBy);
}

module.exports = { clickAddSittingRecords, seeRecords }
