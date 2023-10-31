const { I } = inject();

function clickAddSittingRecords() {
  I.waitForVisible('.govuk-button');
  I.click('Add Sitting Record(s)');
  I.waitForText('Select the judicial office holders (JOH) associated with this sitting', 3);
}

function seeRecords(name, role, period, enteredBy) {
  I.see(name);
  I.see(role);
  I.see(period);
  I.see(enteredBy);
}

function clickPrevious(tribunal, venue, day, month, year) {
  I.click('Previous');
  I.see('Manage judicial sitting records');
  I.see(tribunal);
  I.seeInField('#venue-select', venue);
  I.seeInField('input[name = "msr-date-day"]', day);
  I.seeInField('input[name = "msr-date-month"]', month);
  I.seeInField('input[name = "msr-date-year"]', year);
}

module.exports = { clickAddSittingRecords, seeRecords, clickPrevious }
