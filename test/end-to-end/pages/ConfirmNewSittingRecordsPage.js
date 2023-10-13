const { I } = inject();

function confirmSittingRecords(name, role, period, enteredBy) {
  I.see('Confirm new sitting record(s)');
  I.see(name);
  I.see(role);
  I.see(period);
  I.see(enteredBy);
}

module.exports = { confirmSittingRecords }
