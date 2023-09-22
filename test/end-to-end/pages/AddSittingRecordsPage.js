const { I } = inject();

function selectJOH(name, role) {
  I.amOnPage("/")
  I.see('Select the Judicial office holders (JOH) associated with this sitting');
  I.fillField('Name', name);
  I.selectOption('Role', role);
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
