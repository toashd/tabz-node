const fs = require('fs');
const jsonlz4 = require('mozlz4');
const opn = require('opn');

const browser = require('./lib/browser');
const config = require('./lib/config').config();
const inquirer = require('./lib/inquirer');
const utils = require('./lib/utils');

const run = async () => {
  // Clear output.
  utils.clearConsole();

  // Read open browser tabs.
  let tabs = browser.readTabs();

  // Show tabs in a list.
  inquirer.askUrls(tabs).then(answer => {
    onsole.log(`${config.browser} opening ${answer.url}`);
    opn(answer.url, {app: config.browser});
    process.exit();
  });
}

// Only mac supported for now.
if (!utils.isMac()) {
  console.log('[info] Mac only')
  process.exit(1);
}

// Run.
run();

