const { defineConfig } = require("cypress");

module.exports = defineConfig({
  failOnStatusCode: false,
  projectId: "q8jyn4",
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    excludeSpecPattern: [
      "cypress/e2e/1-getting-started/**",
      "cypress/e2e/2-advanced-examples/**",
    ],
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    defaultCommandTimeout: 10000,
  },
});
