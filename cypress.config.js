const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'isnekd',
  "reporter": "mochawesome",

  env:
  {
   url : "https://demo.nopcommerce.com/"
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
