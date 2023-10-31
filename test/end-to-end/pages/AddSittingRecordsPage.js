const { I } = inject();

const venueField = '#venue-select';
const dayField = 'input[name = "msr-date-day"]';
const monthField = 'input[name = "msr-date-month"]';
const yearField = 'input[name = "msr-date-year"]';
const judgeField = '#judge-';
const roleField = '#role';
const selectJudgeName = '.mdc-list-item__primary-text';

function selectJOH(name, role, row=0) {
  I.see('Select the judicial office holders (JOH) associated with this sitting');
  I.see('You can select a maximum of 3 office holders for each sitting.');
  I.fillField(judgeField + `${row}`, name);
  I.click(selectJudgeName);
  I.wait(2);
  if (role != ''){
    I.selectOption(`//*[@id="main-content"]/div/div[1]/div[${row + 1}]/div[3]/div/select`, role);
  }
}

function removeJOH(row) {
  I.click('Remove');
  I.dontSeeElement(judgeField + `${row}`);
}

function selectPeriod (period) {
  I.see('Period')
  I.checkOption(period)
}

function clickCancel(tribunal, venue, day, month, year) {
  I.click('Cancel');
  I.see('Manage judicial sitting records');
  I.see(tribunal);
  I.seeInField(venueField, venue);
  I.seeInField(dayField, day);
  I.seeInField(monthField, month);
  I.seeInField(yearField, year);
}

function clickPrevious(name, role){
  I.click('Previous');
  I.see('Select the judicial office holders (JOH) associated with this sitting');
  I.seeInField(judgeField + '0', name);
  I.seeInField(roleField, role);
}

module.exports = { selectJOH, selectPeriod, removeJOH, clickCancel, clickPrevious }
