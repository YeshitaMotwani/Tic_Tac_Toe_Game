const board = document.querySelector(".board");
const squares = document.querySelectorAll("#square"); 
let scoreXDisplay = document.querySelector(".score1"); // These are the displays for scores
let scoreODisplay = document.querySelector(".score2");
let scoreX = 0; // Actual scores
let scoreO = 0;
let round = 1;
const players = ['X', 'O'];
let currPlayer = players[0];
let h2 = document.querySelector("h2");
let p = document.querySelector("p"); // Assuming this is the round display
let winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Add event listeners for each square
for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", () => {
        if (squares[i].innerText !== "") return; // Prevent overriding an already filled square
        squares[i].innerText = currPlayer;
        squares[i].style.color = (currPlayer === "X") ? "red" : "blue";

        if (checkWin(currPlayer)) {
            if (currPlayer === "X") {
                scoreX++; // Increment X's score
                scoreXDisplay.innerText = `Score X: ${scoreX}`; // Update X's score on screen
            } else {
                scoreO++; // Increment O's score
                scoreODisplay.innerText = `Score O: ${scoreO}`; // Update O's score on screen
            }

            if (round < 3) {
                h2.innerText = `Round ${round} Over! Player ${currPlayer} won!`;
                setTimeout(() => {
                    resetGame();
                }, 3000); // Reset game after 3 seconds
                round++;
                setTimeout(()=>{
                    p.innerText = `Round ${round}`;
                },3000);
            } else {
                gameOver();
            }
            return;
        }

        if (checkTie()) {
            h2.innerText = `Round ${round} over. It's a Tie!`;
            if (round < 3) {
                setTimeout(() => {
                    resetGame();
                }, 3000); // Reset game after 3 seconds
                round++;
                setTimeout(()=>{
                    p.innerText = `Round ${round}`;
                },3000);
            } else {
                gameOver();
            }
            return;
        }

        currPlayer = (currPlayer === players[0]) ? players[1] : players[0];
        h2.innerText = `Player ${currPlayer}'s turn`;
    });
}

// Check if the current player has won
function checkWin(currPlayer) {
    for (let i = 0; i < winCombinations.length; i++) {
        const [a, b, c] = winCombinations[i];
        if (squares[a].innerText === currPlayer && squares[b].innerText === currPlayer && squares[c].innerText === currPlayer) {
            // Highlight the winning squares
            squares[a].style.backgroundColor = "#76ff03";
            squares[b].style.backgroundColor = "#76ff03";
            squares[c].style.backgroundColor = "#76ff03";
            return true;
        }
    }
    return false;
}

// Check if the game is a tie (all squares filled and no winner)
function checkTie() {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].innerText === "") return false;
    }
    return true;
}

// Reset the game for the next round
function resetGame() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].innerText = ""; // Clear all squares
        squares[i].style.backgroundColor = "#fff8e1"; // Reset background color
    }
    currPlayer = players[0]; // Reset to player X
    h2.innerText = `Player ${currPlayer}'s turn`;
}

// Handle the game over logic when the final round ends
function gameOver() {
    if (scoreX > scoreO) {
        h2.innerText = `Game Over! Player X won with ${scoreX} rounds!`;
    } else if (scoreO > scoreX) {
        h2.innerText = `Game Over! Player O won with ${scoreO} rounds!`;
    } else {
        h2.innerText = `Game Over! It's a tie with both players winning equal rounds!`;
    }
}

const resetButton = document.querySelector(".reset");
resetButton.addEventListener("click", () => {
    resetGame(); // Call resetGame when the button is clicked
    scoreX = 0; // Reset scores
    scoreO = 0;
    p.innerText="Round 1";
    scoreXDisplay.innerText = `Score X: ${scoreX}`; // Update score display
    scoreODisplay.innerText = `Score O: ${scoreO}`; // Update score display
});
