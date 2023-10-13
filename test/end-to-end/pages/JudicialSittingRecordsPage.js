const { I } = inject();

function clickAddSittingRecords() {
  I.waitForVisible('.govuk-button');
  I.click('Add Sitting Record(s)');
  I.waitForText('Select the Judicial office holders (JOH) associated with this sitting', 3);
}

function seeSittingRecords(name, role, period, enteredBy) {
  I.see(name);
  I.see(role);
  I.see(period);
  I.see(enteredBy);
}

function clickDelete() {
  I.doubleClick('//*[@id="sittingRecordViewTable"]/thead/tr/th[5]');
  I.click('Delete');
  I.waitForText('Delete sitting record', 3);
}

module.exports = { clickAddSittingRecords, seeSittingRecords, clickDelete }
