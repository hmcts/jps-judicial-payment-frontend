module.exports = function () {
  return actor({

    login: function(username, password){
      const I = this;
      I.amOnPage("/")
      I.fillField('username', username);
      I.fillField('password', password);
      I.click("Sign in");

    }
  });
}
