const { I } = inject();

function selectJOH(name, role) {
  I.see('Select the Judicial office holders (JOH) associated with this sitting');
  I.see('You can select a maximum of 3 office holders for each sitting.');
  I.fillField('#judge-0', name);
  I.wait(3);
  I.selectOption('.govuk-select', role);
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
