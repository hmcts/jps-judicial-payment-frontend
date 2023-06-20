const { I } = inject();

function loginWithJPSAdminUser(username, password) {

  I.amOnPage("/")
  I.fillField('username', 'jps-admin@gmail.com');
  I.fillField('password', 'password');
  I.click("Sign in");
  I.see("Welcomeee");
}

module.exports = { loginWithJPSAdminUser }
