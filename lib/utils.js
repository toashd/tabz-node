module.exports = {
  isMac : () => {
    return process.platform === 'darwin'
  },
  clearConsole: () => {
    process.stdout.write('\x1Bc');
  }
};
