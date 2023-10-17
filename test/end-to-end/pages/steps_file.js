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
    loginWithJPSRecorderUser: function () {
      const I = this;
      I.amOnPage('/');
      I.wait(10);
      I.waitForElement('//*[@id="footer"]/div/div/div[2]');
      I.waitForVisible('#username', 10);
      I.fillField('Email address', recorderUsername);
      I.fillField('Password', recorderPassword);
      I.click('Sign in');
    },

    loginWithJPSSubmitterUser: function () {
      const I = this;
      I.amOnPage('/');
      I.wait(10);
      I.waitForElement('//*[@id="footer"]/div/div/div[2]');
      I.waitForVisible('#username', 10);
      I.fillField('Email address', submitterUsername);
      I.fillField('Password', submitterPassword);
      I.click('Sign in');
    },

    loginWithJPSAdminUser: function () {
      const I = this;
      I.amOnPage('/');
      I.wait(10);
      I.waitForElement('//*[@id="footer"]/div/div/div[2]');
      I.waitForVisible('#username', 10);
      I.fillField('Email address', adminUsername);
      I.fillField('Password', adminPassword);
      I.click('Sign in');
    },

    loginWithJPSJOHAdminUser: function () {
      const I = this;
      I.amOnPage('/');
      I.wait(10);
      I.waitForElement('//*[@id="footer"]/div/div/div[2]');
      I.waitForVisible('#username', 10);
      I.fillField('Email address', johAdminUsername);
      I.fillField('Password', johAdminPassword);
      I.click('Sign in');
    },

    loginWithJPSPublisherUser: function () {
      const I = this;
      I.amOnPage('/');
      I.wait(10);
      I.waitForElement('//*[@id="footer"]/div/div/div[2]');
      I.waitForVisible('#username', 10);
      I.fillField('Email address', publisherUsername);
      I.fillField('Password', publisherPassword);
      I.click('Sign in');
    },

    loginWithJPSInvalidUser: function () {
      const I = this;
      I.amOnPage('/');
      I.wait(10);
      I.waitForElement('//*[@id="footer"]/div/div/div[2]');
      I.waitForVisible('#username', 10);
      I.fillField('Email address', invalidUsername);
      I.fillField('Password', invalidPassword);
      I.click('Sign in');
    },

    createSittingRecord: function (name, role, period) {
      const I = this;
      I.fillField('.govuk-input', name);
      I.click('.mdc-list-item__primary-text');
      I.selectOption('.govuk-select', role);
      I.checkOption(period);
      I.click('Continue');
      I.click('Save Record(s)');
      I.waitForText('Sitting record(s) saved', 2);
      I.click('View Record Table');
      I.see(name);
      I.see(role);
      I.see(period);
    }
  }).retry({ retries: 10, except: ['createSittingRecord'] });
};
