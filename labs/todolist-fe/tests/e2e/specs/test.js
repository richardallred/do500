// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  "default e2e tests": browser => {
    browser
      .url(process.env.VUE_DEV_SERVER_URL)
      .waitForElementVisible("#app", 5000)
      .pause(1000)
      .assert.elementPresent(".banner-image")
      .assert.containsText("h1", "Welcome 👋")
      .assert.elementCount("img", 1)
      .end();
  }
};
