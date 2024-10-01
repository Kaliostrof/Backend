// const { require } = require("yargs");
const { describe } = require("yargs");
const { command } = require("yargs");
const { addNote, printNotes, deleteNote } = require("./notes.controller");

const yargs = require("yargs");
const pkg = require("./package.json"); //для использования package как JS объект
const { demandOption } = require("yargs");

yargs.version(pkg.version);

yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: "list",
  describe: "Print all notes",
  async handler() {
    printNotes();
  },
});

yargs.command({
  command: "remove",
  describe: "Remove note by id",
  builder: {
    id: {
      type: "string",
      describe: "Note id",
      demandOption: true,
    },
  },
  async handler({ id }) {
    deleteNote(id);
  },
});

yargs.parse();
