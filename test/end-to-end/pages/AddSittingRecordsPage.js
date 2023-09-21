const { I } = inject();

function selectJOH(name, role, row) {
  I.see('Select the Judicial office holders (JOH) associated with this sitting');
  I.see('You can select a maximum of 3 office holders for each sitting.');
  I.fillField(`#judge-${row}`, name);
  I.click('.mdc-list-item__primary-text');
  I.wait(2);
  I.selectOption(`//*[@id="main-content"]/div/div[1]/div[${row + 1}]/div[3]/div/select`, role);
}

function removeJOH(name) {
  I.click('Remove');
  I.dontSee(name);
}

function selectPeriod (period) {
  I.see('Period')
  I.checkOption(period)
}

module.exports = { selectJOH, selectPeriod, removeJOH }
