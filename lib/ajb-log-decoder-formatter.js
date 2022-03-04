'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ajb-log-decoder-formatter:format': () => this.replaceCharacters()
    }));
  },

  replaceCharacters() {
    console.log('LogDecoder Formatter: Removing characters');
    const charsToReplace = ['', '', '']; // They all look the same, but they are different ascii values
    const editor = atom.workspace.getActiveTextEditor();
    var text = editor.getText();
    for (var x = 0; x < charsToReplace.length; x++) {
      const curChar = charsToReplace[x];
      console.log("Replacing character " + curChar + " (" + curChar.charCodeAt(0) + ")");
      while (text.search(curChar) >= 0) {
          text = text.replace(curChar," ");
      }
    }
    editor.setText(text);
    console.log("LogDecoder Formatter: Done");
  }

};
