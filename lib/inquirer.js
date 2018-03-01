const fuzzy = require('fuzzy');
const inquirer = require('inquirer');

const Promise = require('promise');

inquirer.registerPrompt(
  'autocomplete',
  require('inquirer-autocomplete-prompt')
);

var tabs = {};

function searchTabs(answers, input) {
  input = input || '';
  return new Promise(function(resolve) {
    var result = fuzzy.filter(input, tabs, {
      extract: (t) => { return t.title; }
    });
    resolve(result.map(function(el) {
      return el.original.url;
    }));
  });
}

module.exports = {
  askUrls: (data) => {
    tabs = data;
    const questions = [
      {
        type: 'autocomplete',
        name: 'url',
        message: `tabz (${tabs.length} currently open) >`,
        source: searchTabs,
        pageSize: 13,
      }
    ];
    return inquirer.prompt(questions);
  }
};

