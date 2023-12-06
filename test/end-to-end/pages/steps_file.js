module.exports = function () {
  const recorderUsername = process.env.JPS_RECORDER_USERNAME || 'jps-recorder-role@gmail.com';
  const recorderPassword = process.env.JPS_RECORDER_PASSWORD || 'password';
  const submitterUsername = process.env.JPS_SUBMITTER_USERNAME || 'jps-submitter-role@gmail.com';
  const submitterPassword = process.env.JPS_SUBMITTER_PASSWORD || 'password';
  const publisherUsername = process.env.JPS_PUBLISHER_USERNAME || 'jps-publisher-role@gmail.com';
  const publisherPassword = process.env.JPS_PUBLISHER_PASSWORD || 'password';
  const adminUsername = process.env.JPS_ADMIN_USERNAME || 'jps-admin-role@gmail.com';
  const adminPassword = process.env.JPS_ADMIN_PASSWORD || 'password';
  const johAdminUsername = process.env.JPS_JOH_ADMIN_USERNAME || 'jps-JOH-admin-role@gmail.com';
  const johAdminPassword = process.env.JPS_JOH_ADMIN_PASSWORD || 'password';
  const invalidUsername = process.env.JPS_INVALID_USERNAME || 'jps-invalid-role@gmail.com';
  const invalidPassword = process.env.JPS_INVALID_PASSWORD || 'password';

  return actor({
    loginWithJPSRecorderUser: async function () {
      const I = this;
      await I.amOnPage('/');
      await I.waitForElement('//*[@id="footer"]/div/div/div[2]', 10);
      await I.waitForVisible('#username', 10);
      await I.fillField('Email address', recorderUsername);
      await I.fillField('Password', recorderPassword);
      await I.click('Sign in');
      await I.waitForText('Manage judicial sitting records', 10);
    },

    loginWithJPSSubmitterUser: async function () {
      const I = this;
      await I.amOnPage('/');
      await I.waitForElement('//*[@id="footer"]/div/div/div[2]', 10);
      await I.waitForVisible('#username', 10);
      await I.fillField('Email address', submitterUsername);
      await I.fillField('Password', submitterPassword);
      await I.click('Sign in');
      await I.waitForText('Manage judicial sitting records', 10);
    },

    loginWithJPSAdminUser: async function () {
      const I = this;
      await I.amOnPage('/');
      await I.waitForElement('//*[@id="footer"]/div/div/div[2]', 10);
      await  I.waitForVisible('#username', 10);
      await I.fillField('Email address', adminUsername);
      await I.fillField('Password', adminPassword);
      await I.click('Sign in');
      await I.waitForText('Manage judicial sitting records', 10);
    },

    loginWithJPSJOHAdminUser: async function () {
      const I = this;
      await I.amOnPage('/');
      await I.waitForElement('//*[@id="footer"]/div/div/div[2]', 10);
      await  I.waitForVisible('#username', 10);
      await I.fillField('Email address', johAdminUsername);
      await I.fillField('Password', johAdminPassword);
      await I.click('Sign in');
      await I.waitForText('Manage judicial sitting records', 10);
    },

    loginWithJPSPublisherUser: async function () {
      const I = this;
      await I.amOnPage('/');
      await I.wait(5);
      await I.waitForElement('//*[@id="footer"]/div/div/div[2]', 10);
      await I.waitForVisible('#username', 10);
      await I.fillField('Email address', publisherUsername);
      await I.fillField('Password', publisherPassword);
      await I.click('Sign in');
      await I.waitForText('Manage judicial sitting records', 10);
    },

    loginWithJPSInvalidUser: function () {
      const I = this;
      I.amOnPage('/');
      I.wait(5);
      I.waitForElement('//*[@id="footer"]/div/div/div[2]', 10);
      I.waitForVisible('#username', 10);
      I.fillField('Email address', invalidUsername);
      I.fillField('Password', invalidPassword);
      I.click('Sign in');
      I.wait(3);
    },

    createSittingRecord: function (name, role, period) {
      const I = this;
      I.fillField('.govuk-input', name);
      I.click('.mdc-list-item__primary-text');
      I.selectOption('.govuk-select', role);
      I.checkOption(period);
      I.click('Continue');
      I.click('Save Record(s)');
      I.waitForText('Sitting record(s) saved', 10);
      I.click('View Record Table');
      I.see(name);
      I.see(role);
      I.see(period);
    }
  });
};
