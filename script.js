document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = (() => {
      let board = ["", "", "", "", "", "", "", "", ""];
  
      const getBoard = () => board;
  
      const updateBoard = (index, marker) => {
        board[index] = marker;
      };
  
      const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
      };
  
      return { getBoard, updateBoard, resetBoard };
    })();
  
    const Player = (name, marker) => {
      return { name, marker };
    };
  
    const displayController = (() => {
      const cells = document.querySelectorAll(".cell");
      const resultDisplay = document.getElementById("result");
      const startBtn = document.getElementById("start-btn");
      const restartBtn = document.getElementById("restart-btn");
      const gameHistory = document.getElementById("game-history");
  
      let currentPlayer;
      let player1;
      let player2;
      let isFirstGame = true;
  
      const startGame = () => {
        const player1Name = document.getElementById("player1").value;
        const player2Name = document.getElementById("player2").value;
        player1 = Player(player1Name, "X");
        player2 = Player(player2Name, "O");
        currentPlayer = isFirstGame ? player1 : player2;
        isFirstGame = !isFirstGame;
        resultDisplay.textContent = `${currentPlayer.name}'s turn`;
        startBtn.style.display = "none";
        cells.forEach(cell => {
          cell.addEventListener("click", handleClick);
        });
      };
  
      const handleClick = event => {
        const cell = event.target;
        const index = parseInt(cell.dataset.index);
        if (gameBoard.getBoard()[index] === "") {
          cell.textContent = currentPlayer.marker;
          gameBoard.updateBoard(index, currentPlayer.marker);
          if (checkWin(currentPlayer.marker)) {
            resultDisplay.textContent = `${currentPlayer.name} wins!`;
            addGameHistory(currentPlayer.name);
            cells.forEach(cell => cell.removeEventListener("click", handleClick));
            restartBtn.style.display = "block";
          } else if (checkDraw()) {
            resultDisplay.textContent = "It's a draw!";
            addGameHistory("Draw");
            restartBtn.style.display = "block";
          } else {
            currentPlayer = currentPlayer === player1 ? player2 : player1;
            resultDisplay.textContent = `${currentPlayer.name}'s turn`;
          }
        }
      };
  
      const checkWin = marker => {
        const winningCombos = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];
        return winningCombos.some(combo => {
          return combo.every(index => gameBoard.getBoard()[index] === marker);
        });
      };
  
      const checkDraw = () => {
        return gameBoard.getBoard().every(cell => cell !== "");
      };
  
      const addGameHistory = winner => {
        const li = document.createElement("li");
        li.textContent = winner === "Draw" ? "It's a draw!" : `${winner} wins!`;
        gameHistory.appendChild(li);
      };
  
      startBtn.addEventListener("click", startGame);
  
      restartBtn.addEventListener("click", () => {
        gameBoard.resetBoard();
        cells.forEach(cell => {
          cell.textContent = "";
        });
        resultDisplay.textContent = "";
        restartBtn.style.display = "none";
        startBtn.style.display = "block";
      });
    })();
  });
  