import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState([
    1, 2, 3, 4,
    5, 6, 7, 8,
    9, 10, 11, 12,
    13, 14, 15, null,
  ]);
  const [moves, setMoves] = useState(0);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    shuffleBoard();
  }, []);

  useEffect(() => {
    if (isSolved()) {
      setSolved(true);
    } else {
      setSolved(false);
    }
  }, [board]);

  const shuffleBoard = () => {
    let newBoard = [
      1, 2, 3, 4,
      5, 6, 7, 8,
      9, 10, 11, 12,
      13, 14, 15, null,
    ];

    let emptyIndex = 15;

    for (let i = 0; i < 1000; i++) {
      const possibleMoves = [];

      const row = Math.floor(emptyIndex / 4);
      const col = emptyIndex % 4;

      if (row > 0) possibleMoves.push(emptyIndex - 4);
      if (row < 3) possibleMoves.push(emptyIndex + 4);
      if (col > 0) possibleMoves.push(emptyIndex - 1);
      if (col < 3) possibleMoves.push(emptyIndex + 1);

      const moveIndex = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      [newBoard[emptyIndex], newBoard[moveIndex]] = [newBoard[moveIndex], newBoard[emptyIndex]];
      emptyIndex = moveIndex;
    }

    setBoard(newBoard);
    setMoves(0);
  };

  const findEmpty = () => board.indexOf(null);

  const getRowCol = (index) => ({
    row: Math.floor(index / 4),
    col: index % 4,
  });

  const isValidMove = (emptyIndex, tileIndex) => {
    const emptyPos = getRowCol(emptyIndex);
    const tilePos = getRowCol(tileIndex);
    return (
      (Math.abs(emptyPos.row - tilePos.row) === 1 && emptyPos.col === tilePos.col) ||
      (Math.abs(emptyPos.col - tilePos.col) === 1 && emptyPos.row === tilePos.row)
    );
  };

  const moveTile = (tileIndex) => {
    const emptyIndex = findEmpty();
    if (isValidMove(emptyIndex, tileIndex)) {
      const newBoard = [...board];
      [newBoard[emptyIndex], newBoard[tileIndex]] = [
        newBoard[tileIndex],
        newBoard[emptyIndex],
      ];
      setBoard(newBoard);
      setMoves(moves + 1);
    }
  };

  const isSolved = () => {
    for (let i = 0; i < 15; i++) {
      if (board[i] !== i + 1) return false;
    }
    return true;
  };

  return (
    <div className="game-container">
      <h1>15 Puzzle Game</h1>
      <div className="puzzle-board">
        {board.map((tile, index) => (
          <div
            key={index}
            className={`tile ${tile === null ? 'empty' : ''}`}
            onClick={() => tile !== null && moveTile(index)}
          >
            {tile}
          </div>
        ))}
      </div>
      <p>Moves: {moves}</p>
      <button onClick={shuffleBoard}>Shuffle</button>
      {solved && <p className="solved-message">You solved the puzzle!</p>}
    </div>
  );
}

export default App;