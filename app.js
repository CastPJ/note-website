// SIDE NOTE
const plusNote = document.getElementById("plus-note");
const sideGrid = document.getElementById("side-grid");
const mainContent = document.getElementById("main-content");
const sideNote = document.getElementById("side-note");

let id = 1;

function addNote(e) {
  e.preventDefault();

  // SIDE NOTE
  const sideNote = document.createElement("div");
  sideNote.classList.add("side-note");
  sideNote.setAttribute("id", "side-note");
  sideNote.setAttribute("id", id);

  // x-mark
  const xMark = document.createElement("div");
  xMark.classList.add("x-mark");
  const xText = document.createElement("p");
  xText.classList.add("x-mark-p");
  xText.innerText = "x";

  // note text / +
  const sideNoteText = document.createElement("div");
  sideNoteText.classList.add("center-content");

  // MAIN NOTE
  const mainNote = document.createElement("div");
  mainNote.classList.add("note");
  mainNote.setAttribute("id", id);
  const noteTitle = document.createElement("h1");
  noteTitle.classList.add("title");
  const noteText = document.createElement("p");
  noteText.classList.add("content");

  // APPEND
  //side
  xMark.appendChild(xText);
  sideNote.appendChild(xMark);
  sideNote.appendChild(sideNoteText);
  sideGrid.appendChild(sideNote);
  //main
  mainNote.appendChild(noteTitle);
  mainNote.appendChild(noteText);
  mainContent.appendChild(mainNote);
  // mainNote.style.display = "block";

  id += 1;
  console.log(id);
}

function changeFocus(e) {
  e.preventDefault();

  console.log(e);
}

plusNote.addEventListener("click", addNote);
sideNote.addEventListener("click", changeFocus);
