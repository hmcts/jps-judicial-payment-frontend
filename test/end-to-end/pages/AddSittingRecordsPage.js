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
  I.dontSeeInField(name);
}

function selectPeriod (period) {
  I.see('Period')
  I.checkOption(period)
}

function cancelClicked(tribunal, venue, day, month, year) {
  I.click('Cancel');
  I.see('Manage judicial sitting records');
  I.see(tribunal);
  I.see(venue);
  I.see(day);
  I.see(month);
  I.see(year);
}

function previousClicked(name, role){
  I.click('Previous');
  I.see('Select the Judicial office holders (JOH) associated with this sitting');
  I.seeInField('#judge-0', name);
  I.seeInField('#role', role);
}

module.exports = { selectJOH, selectPeriod, removeJOH, cancelClicked, previousClicked }
