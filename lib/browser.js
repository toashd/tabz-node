const fs = require('fs');
const jsonlz4 = require('mozlz4');
const os = require('os');
const path = require('path');

function readRecoveryFile() {
  let recovery = path.join(os.homedir() + '/Library/Application Support/Firefox/Profiles/5s1jrvfv.default/sessionstore-backups/recovery.jsonlz4');

  if (!fs.existsSync(recovery)) {
    console.log('[error] no recovery file found');
    process.exit(1);
  }

  let file = fs.readFileSync(recovery);

  return jsonlz4.decompress(file);
}

module.exports = {
  readTabs: () => {
    var data = readRecoveryFile();

    var tabs = [];
    for(let w in data.windows) {
      let win = data.windows[w];
      for(let t in win.tabs) {
        let tab = win.tabs[t];
        let idx = tab.index-1;
        let entry = tab.entries[idx];

        tabs.push({
          title: entry.title,
          url: entry.url
        });
      }
    }

    return tabs;
  }
};
