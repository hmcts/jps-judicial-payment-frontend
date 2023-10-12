const { I } = inject();

function deleteRecord(tribunal, venue, sittingDate) {
    I.see('Delete sitting record');
    I.click('Delete');
    I.see('Delete sitting record for ' + tribunal + ', ' + venue + ', for ' + sittingDate);
    I.see('Sitting record deleted');
}

function clickCancel(tribunal, venue, sittingDate) {
    I.click('Delete');
    I.see('Delete sitting record for ' + tribunal + ', ' + venue + ', for ' + sittingDate);
    I.see('Delete sitting record');
    I.click('Cancel');
}

module.exports = { deleteRecord, clickCancel }
