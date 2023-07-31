module.exports = function () {

  const recorderUsername = process.env.JPS_RECORDER_USERNAME || 'jps-recorder-role@gmail.com';
  const recorderPassword = process.env.JPS_RECORDER_PASSWORD || 'password';
  const submitterUsername = process.env.JPS_SUBMITTER_USERNAME || 'jps-submitter-role@gmail.com';
  const submitterPassword = process.env.JPS_SUBMITTER_PASSWORD || 'password';
  const publisherUsername = process.env.JPS_PUBLISHER_USERNAME || 'jps-publisher-role@gmail.com';
  const publisherPassword = process.env.JPS_PUBLISHER_PASSWORD || 'password';
  const invalidUsername = process.env.JPS_INVALID_USERNAME || 'jps-invalid-role@gmail.com';
  const invalidPassword = process.env.JPS_INVALID_PASSWORD || 'password';

  return actor({
    loginWithJPSRecorderUser: function(){
      const I = this;
      I.amOnPage('/');
      I.waitForElement('#username');
      I.fillField('Email address', recorderUsername);
      I.fillField('Password', recorderPassword);
      I.click('Sign in');
    },

    loginWithJPSSubmitterUser: function(){
      const I = this;
      I.amOnPage('/');
      I.waitForElement('#username');
      I.fillField('Email address', submitterUsername);
      I.fillField('Password', submitterPassword);
      I.click('Sign in');
    },

    loginWithJPSPublisherUser: function(){
      const I = this;
      I.amOnPage('/');
      I.waitForElement('#username');
      I.fillField('Email address', publisherUsername);
      I.fillField('Password', publisherPassword);
      I.click('Sign in');
    },

    loginWithJPSInvalidUser: function(){
      const I = this;
      I.amOnPage('/');
      I.waitForElement('#username');
      I.fillField('Email address', invalidUsername);
      I.fillField('Password', invalidPassword);
      I.click('Sign in');
    }
  });
}
