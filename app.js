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

  // SIDE NOTE
  const sideNote = document.createElement("div");
  sideNote.classList.add("side-note");
  sideNote.setAttribute("id", `side-${id}`);

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
  mainNote.setAttribute("id", `main-${id}`);
  const noteTitle = document.createElement("h1");
  noteTitle.classList.add("title");
  noteTitle.textContent = mainNote.id;
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

  // Add event listener for the newly added side note
  sideNote.addEventListener("click", changeFocus);

  id += 1;
}

function changeFocus(e) {
  e.preventDefault();

  const sideNoteId = e.currentTarget.id;

  const mainNoteId = `main-${sideNoteId.split("-")[1]}`;
  const allMainNotes = document.querySelectorAll(".note");
  allMainNotes.forEach((note) => {
    if (note.id === mainNoteId) {
      note.style.display = "block";
    } else {
      note.style.display = "none";
    }
  });
}

plusNote.addEventListener("click", addNote);
