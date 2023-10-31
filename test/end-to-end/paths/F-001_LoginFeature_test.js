Feature('Login Feature Tests @functional @F-001');

Scenario('Successful login @S-001.1',async({ I}) => {
  await I.loginWithJPSRecorderUser();
  I.see('Manage judicial sitting records');
});

Scenario('Show an error message for invalid password @S-001.2',({ I}) => {
  I.amOnPage('/')
  I.fillField('Email address', 'email-address@gmail.com');
  I.fillField('Password', '1234');
  I.click('Sign in');
  I.see('Incorrect email or password')
});

Scenario('Show an error message for invalid email for username @S-001.3',({ I}) => {
  I.amOnPage('/')
  I.fillField('Email address', 'email-address@gmail');
  I.fillField('Password', '1234');
  I.click('Sign in');
  I.see('Email address is not valid')
});
