Feature('hello world test @functional');

Scenario('test something',  ({ I}) => {
  // loginPage.loginWithJPSAdminUser();
  I.login('jps-admin@gmail.com','password');
});
