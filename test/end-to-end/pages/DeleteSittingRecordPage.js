const { I } = inject();

function clickDelete(tribunal, venue, sittingDate) {
    I.click('Delete');
    I.see('Delete sitting record for ' + tribunal + ', ' + venue + ', for ' + sittingDate);
    I.see('Delete sitting record');
    I.click('Delete');
    I.see('Delete sitting record for ' + tribunal + ', ' + venue + ', for ' + sittingDate);
    I.see('Sitting record deleted');
    I.click('Return To Sitting Records');
}

function clickCancel(tribunal, venue, sittingDate) {
    I.click('Delete');
    I.see('Delete sitting record for ' + tribunal + ', ' + venue + ', for ' + sittingDate);
    I.see('Delete sitting record');
    I.click('Cancel');
}

function clickDeleteRoleError(tribunal, venue, sittingDate) {
    I.click('Delete');
    I.see('Delete sitting record for ' + tribunal + ', ' + venue + ', for ' + sittingDate);
    I.see('Delete sitting record');
    I.click('Delete');
    I.see('There is a problem');
    I.see('Selected sitting record was not recorded by the recorder. Record cannot be deleted.')
}

module.exports = { clickDelete, clickCancel, clickDeleteRoleError }
