class Note {
  constructor(id, title = "Type your title...", content = "Your text...") {
    this.id = id;
    this.title = title;
    this.content = content;
    this.sideNote = this.createSideNote();
    this.mainNote = this.createMainNote();
  }

  createSideNote() {
    const sideNote = document.createElement("div");
    sideNote.classList.add("side-note");
    sideNote.setAttribute("id", `side-${this.id}`);

    const xMark = document.createElement("div");
    xMark.classList.add("x-mark");
    const xText = document.createElement("p");
    xText.classList.add("x-mark-p");
    xText.innerText = "x";

    const sideNoteText = document.createElement("p");
    sideNoteText.classList.add("center-content");
    sideNoteText.textContent = this.title;

    xMark.appendChild(xText);
    sideNote.appendChild(xMark);
    sideNote.appendChild(sideNoteText);

    // Bind event listener for changing focus
    sideNote.addEventListener("click", this.changeFocus.bind(this));

    return sideNote;
  }

  createMainNote() {
    const mainNote = document.createElement("div");
    mainNote.classList.add("note");
    mainNote.setAttribute("id", `main-${this.id}`);

    const noteTitle = document.createElement("h1");
    noteTitle.classList.add("title");
    noteTitle.setAttribute("contenteditable", "true");
    noteTitle.textContent = this.title;

    const noteText = document.createElement("p");
    noteText.classList.add("content");
    noteText.setAttribute("contenteditable", "true");
    noteText.textContent = this.content;

    // Update side note title when main note title changes
    noteTitle.addEventListener("input", () => {
      this.title = noteTitle.textContent;
      this.sideNote.querySelector(".center-content").textContent = this.title;
      saveNotesToLocalStorage();
    });

    // Update content and save to local storage
    noteText.addEventListener("input", () => {
      this.content = noteText.textContent;
      saveNotesToLocalStorage();
    });

    mainNote.appendChild(noteTitle);
    mainNote.appendChild(noteText);

    return mainNote;
  }

  addToDOM() {
    sideGrid.appendChild(this.sideNote);
    mainContent.appendChild(this.mainNote);
  }

  changeFocus(e) {
    e.preventDefault();

    const sideNoteId = e.currentTarget.id;
    const mainNoteId = `main-${sideNoteId.split("-")[1]}`;
    const allMainNotes = document.querySelectorAll(".note");
    allMainNotes.forEach((note) => {
      note.style.display = note.id === mainNoteId ? "block" : "none";
    });
  }
}

const plusNote = document.getElementById("plus-note");
const sideGrid = document.getElementById("side-grid");
const mainContent = document.getElementById("main-content");

let id = 1;

function addNote(e) {
  e.preventDefault();

  // Reset for focused note on adding a new one
  const allMainNotes = document.querySelectorAll(".note");
  allMainNotes.forEach((note) => {
    note.style.display = "none";
  });

  // Create and Add new note
  const note = new Note(id);
  note.addToDOM();
  saveNotesToLocalStorage();
  id += 1;
}

function saveNotesToLocalStorage() {
  const notes = [];
  document.querySelectorAll(".note").forEach((noteElement) => {
    const id = noteElement.id.split("-")[1];
    const title = noteElement.querySelector(".title").textContent;
    const content = noteElement.querySelector(".content").textContent;
    notes.push({ id, title, content });
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotesFromLocalStorage() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach((noteData) => {
    const note = new Note(noteData.id, noteData.title, noteData.content);
    note.addToDOM();
  });

  if (notes.length > 0) {
    id = parseInt(notes[notes.length - 1].id) + 1;
    // Hide all notes except the last one
    const allMainNotes = document.querySelectorAll(".note");
    allMainNotes.forEach((note) => {
      note.style.display = "none";
    });
  }
}

plusNote.addEventListener("click", addNote);
window.addEventListener("load", loadNotesFromLocalStorage);
