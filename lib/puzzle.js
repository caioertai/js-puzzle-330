// Selecting all the static pieces of the application
const hintButton = document.querySelector("#show-hint");
const hintBox    = document.querySelector(".hint");
const pieces     = document.querySelectorAll(".game-table td")

// The rules for adjacency were as follows:
// -------------------------
// | x,y   x y   x y   x y |
// -------------------------
// | 0,0 | 1,0 | 2,0 | 3,0 |
// -------------------------
// | 0,1 | 1,1 | 2,1 | 3,1 |
// -------------------------
// | 0,2 | 1,2 | 2,2 | 3,2 |
// -------------------------
// | 0,3 | 1,3 | 2,3 | 3,3 |
// -------------------------
// A piece A is adjacent to a piece B if:

// xA === xB && yA is adjacent to yB
//              OR
// yA === yB && xA is adjacent to xB

// The trick to most of the livecode was finding this out!
// Now lets put into practice in the function.
const isAdjacentToEmpty = (piece) => {
  // Select the currently empty piece
  // We need to do this everytime in this function, since the empty piece will
  // change while the game plays.
  const emptyPiece = document.querySelector(".empty");

  // Get pieces (empty and clicked) X and Y
  // We use #cellIndex (which finds the element index within its <tr>) for X
  // and #parentIndex to select this elements <tr>, followed by a #rowIndex on
  // it (which finds the index of this same <tr> in its table) for the Y.
  const emptyX = emptyPiece.cellIndex;
  const emptyY = emptyPiece.parentElement.rowIndex;
  const pieceX = piece.cellIndex;
  const pieceY = piece.parentElement.rowIndex;

  const isSameX = pieceX === emptyX;              // xA === xB
  const isSameY = pieceY === emptyY;              // yA === yB
  const isAdjX = Math.abs(pieceX - emptyX) === 1; // xA is adjacent to xB
  const isAdjY = Math.abs(pieceY - emptyY) === 1; // yA is adjacent to yB

  // Puting it all together now:
  // same X and adjacent Y OR same Y and adjacent X
  return isSameX && isAdjY || isSameY && isAdjX
};

const swapWithEmpty = (piece) => {
  // Select the currently empty piece
  const emptyPiece = document.querySelector(".empty");

  // We need to swap the contents and classse from empty and clicked pieces
  // SO ...

  // We get the text (number of the piece) of the clicked piece
  const clickedNumber = piece.innerText;
  // Add empty class to clicked piece
  piece.classList.add("empty");
  // Remove the text from the clicked piece
  piece.innerText = "";

  // Remove the empty class from the empty piece
  emptyPiece.classList.remove("empty");
  // Add the text from the clicked piece to the previously empty one
  emptyPiece.innerText = clickedNumber;
}

// -------------------------------------
// Note that above this line you see only assignments and definitions.
// In here we start actually running our functions. This organization is super
// important to keep the code clean. We're going to start diving JS in multiple
// files later on.

// Take each piece
pieces.forEach((piece) => {

  // Assing a click behavior to it...
  piece.addEventListener("click", (event) => {
    const clickedPiece = event.currentTarget;

    // ... that checks if it is adjacent...
    if (isAdjacentToEmpty(clickedPiece)) {

      // ... and swaps its position with empty if true
      swapWithEmpty(clickedPiece);
    }
  })
})

// Assign a click behavior to the hint button...
hintButton.addEventListener("click", (event) => {

  // ... to toggle the hint text
  hintBox.classList.toggle("active");
});
