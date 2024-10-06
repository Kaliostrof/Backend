const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen("Note was added!"));
}

async function getNotes() {
  //   const notes = Buffer.from(buffer).toString("utf-8");
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" }); //encoding аналогична записи Buffer
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("Here is the list of notes"));
  notes.forEach((note) => {
    console.log(chalk.blue(note.id, "-", note.title));
  });
}

async function deleteNote(id) {
  const notes = await getNotes();
  const newNotes = notes.filter((note) => note.id !== id);

  await saveNotes(newNotes);
  console.log(chalk.red(`Note with id="${id}" has been removed.`));
}

async function editNote(id, title) {
  const notes = await getNotes();
  index = notes.findIndex((note) => note.id === id);

  const newNotes = notes;
  newNotes[index].title = title;

  await saveNotes(newNotes);
  console.log(chalk.bgBlue("Note was edit!"));
}

module.exports = {
  addNote,
  getNotes,
  printNotes,
  deleteNote,
  editNote,
};
