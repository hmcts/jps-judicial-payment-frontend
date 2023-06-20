Feature('Login Page @functional');

Scenario('Successful login @F-001.1',({ I}) => {
  I.loginWithJPSRecorderUser();
  I.see('Welcome');
});

Scenario('Show an error message for invalid password @F-001.2',({ I}) => {
  I.amOnPage('/')
  I.fillField('Email address', 'email-address@gmail.com');
  I.fillField('Password', '1234');
  I.click('Sign in');
  I.see('Incorrect email or password--')
});

Scenario('Show an error message for invalid email for username @F-001.3',({ I}) => {
  I.amOnPage('/')
  I.fillField('Email address', 'email-address@gmail');
  I.fillField('Password', '1234');
  I.click('Sign in');
  I.see('Email address is not valid')
});
