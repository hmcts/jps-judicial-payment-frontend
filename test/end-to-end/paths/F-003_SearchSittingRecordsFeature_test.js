const AddSittingRecordsPage = require('../pages/AddSittingRecordsPage');
const ConfirmNewSittingRecordsPage = require('../pages/ConfirmNewSittingRecordsPage');
const JudicialSittingRecordsPage = require('../pages/JudicialSittingRecordsPage');
const ManageJudicialSittingRecordsPage = require('../pages/ManageJudicialSittingRecordsPage');

const randomDay = ('0' + (Math.floor(Math.random() * 28) + 1)).slice(-2);
const randomMonth = ('0' + (Math.floor(Math.random() * 12) + 1)).slice(-2);

Feature('Search Sitting Records Feature Tests @functional @F-003');

Scenario('User is able to view Sitting Record(s) @S-003.1',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', randomDay, randomMonth, '2022');
  I.click('Continue');
  I.see("Judicial sitting records");
  I.see("Sitting records for Social Security and Child Support, Sutton Social Security and Child Support Tribunal (Copthall House), for " + randomDay + "/" + randomMonth + "/2022");
  I.click("Add Sitting Record(s)");
  I.createSittingRecord('Joe Ambrose', 'Tribunal Judge', 'Morning');
  JudicialSittingRecordsPage.seeSittingRecord('Joe Ambrose', 'Tribunal Judge', 'Morning', 'jps recorder', 'Recorded');
});

Scenario('User is displayed "Manage judicial sitting records" when Previous button is clicked @S-003.2',({ I}) => {
  I.loginWithJPSRecorderUser();
  ManageJudicialSittingRecordsPage.addSittingRecordsInformation('Social Security and Child Support', 'Sutton', '11', '03', '2022');
  I.click('Continue');
  I.see('Judicial sitting records');
  I.see('Sitting records for Social Security and Child Support, Sutton Social Security and Child Support Tribunal (Copthall House), for 11/03/2022')
  I.click('Previous');
  I.see('Manage judicial sitting records');
});
