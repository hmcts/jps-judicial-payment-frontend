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

function previousClicked(tribunal, venue, day, month, year) {
  I.click('Previous');
  I.see('Manage judicial sitting records');
  I.seeInField('//*[@id="main-content"]/form/div[1]', tribunal);
  I.seeInField('#venue-select', venue);
  I.seeInField('input[name = "msr-date-day"]', day);
  I.seeInField('input[name = "msr-date-month"]', month);
  I.seeInField('input[name = "msr-date-year"]', year);
}

module.exports = { clickAddSittingRecords, seeSittingRecord, previousClicked }
