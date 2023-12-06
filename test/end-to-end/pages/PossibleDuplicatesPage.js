const { I } = inject();

function saveNewRecord(){
    I.click('Save New Record(s)');
    I.waitForText('Sitting record(s) saved', 3);
    I.click('View Record Table');
    I.see('Judicial sitting records');
}

function existingRecordSaved (){
    I.see('Existing sitting record(s) saved');
    I.click('Return to record table');
    I.see('Judicial sitting records');    
}

function potentialDuplicateFound(){
    I.click('Save Record(s)');
    I.see('There is a problem');
    I.see('Potential duplicate found');    
}

function recordAlreadyExists(){
    I.click('Save Record(s)');
    I.see('There is a problem');
    I.see('Record already exists');    
}

function newRecordToSubmit(){
    I.click('Continue');
    I.see('New record(s) to submit');
    I.see('Existing record(s)');    
}

module.exports = { saveNewRecord, existingRecordSaved, potentialDuplicateFound, recordAlreadyExists, newRecordToSubmit }

