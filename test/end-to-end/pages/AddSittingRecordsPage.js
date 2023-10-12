const { I } = inject();

function selectJOH(name, role, row=0) {
  I.see('Select the Judicial office holders (JOH) associated with this sitting');
  I.see('You can select a maximum of 3 office holders for each sitting.');
  I.fillField(`#judge-${row}`, name);
  I.click('.mdc-list-item__primary-text');
  I.wait(2);
  if (role != ''){
    I.selectOption(`//*[@id="main-content"]/div/div[1]/div[${row + 1}]/div[3]/div/select`, role);
  }
}

function removeJOH(name) {
  I.click('Remove');
  I.dontSee(name);
}

function selectPeriod (period) {
  I.see('Period')
  I.checkOption(period)
}

function cancelClicked(tribunal, venue, day, month, year) {
  I.click('Cancel');
  I.see('Manage judicial sitting records');
  I.seeInField('//*[@id="main-content"]/form/div[1]', tribunal);
  I.seeInField('#venue-select', venue);
  I.seeInField('input[name = "msr-date-day"]', day);
  I.seeInField('input[name = "msr-date-month"]', month);
  I.seeInField('input[name = "msr-date-year"]', year);
}

function previousClicked(name, role){
  I.click('Previous');
  I.see('Select the Judicial office holders (JOH) associated with this sitting');
  I.seeInField('#judge-0', name);
  I.seeInField('#role', role);
}

module.exports = { selectJOH, selectPeriod, removeJOH, cancelClicked, previousClicked }
