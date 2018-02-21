// Imports
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');

// Option objects for command help
var titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};
var bodyOptions = {
  describe: 'Contents of note',
  demand: true,
  alias: 'b'
};

// Setup command help and flags
const argv = yargs
  .command('add', 'Add a new note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: titleOptions
  })
  .command('remove', 'Remove a note', {
    title: titleOptions
  })
  .help()
  .argv;

// Get command from terminal
var command = process.argv[2];

// Add new note
if(command === "add") {
  var note = notes.addNote(argv.title, argv.body);

  if (note) {
    console.log('Note created.');
    notes.logNote(note);
  } else {
    console.log('Note already exists.');
  }

// Read contents of an existing note
} else if(command === "read") {
  var note = notes.getNote(argv.title);

  if (note) {
    console.log('Note found.');
    notes.logNote(note);
  } else {
    console.log('Note note found.');
  }

// Remove a note
} else if(command === "remove") {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? `Note was removed.` : 'Note not found.';
  console.log(message);

// List all existing notes
} else if(command === "list") {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => notes.logNote(note));

// Invalid command was given
} else {
  console.log("Command not recognized.");
}
