// SIDE NOTE
const plusNote = document.getElementById("plus-note");
const sideGrid = document.getElementById("side-grid");

function addNote(e) {
  e.preventDefault();

  // SIDE NOTE
  const sideNote = document.createElement("div");
  sideNote.classList.add("side-note");

  // X MARK
  const xMark = document.createElement("div");
  xMark.classList.add("x-mark");
  const xText = document.createElement("p");
  xText.classList.add("x-mark-p");
  xText.innerText = "x";

  // NOTE TEXT / +
  const noteText = document.createElement("div");
  noteText.classList.add("center-content");

  // APPEND
  xMark.appendChild(xText);
  sideNote.appendChild(xMark);
  sideNote.appendChild(noteText);
  sideGrid.appendChild(sideNote);
}

plusNote.addEventListener("click", addNote);
