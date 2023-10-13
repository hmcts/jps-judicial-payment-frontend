const { I } = inject();

function deleteRecord() {
    I.click('Delete');
    I.waitForText('Sitting record deleted', 3);
}

module.exports = { deleteRecord }
