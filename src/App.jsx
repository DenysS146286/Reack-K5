import { useState } from 'react';
import './App.css';
 
const SIZE = 8;
const MINES = 10;
 
function emptyBoard() {
  return Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => ({
      mine: false, open: false, flag: false, number: 0
    }))
  );
}
 
function forNeighbors(r, c, fn) {
  for (let i = -1; i <= 1; i++)
    for (let j = -1; j <= 1; j++) {
      const nr = r + i, nc = c + j;
      if ((i || j) && nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE) fn(nr, nc);
    }
}
 
function placeMines(b, safeR, safeC) {
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * SIZE);
    const c = Math.floor(Math.random() * SIZE);
    if (b[r][c].mine || (r === safeR && c === safeC)) continue;
    b[r][c].mine = true;
    placed++;
  }
  b.forEach((row, r) => row.forEach((cell, c) => {
    forNeighbors(r, c, (nr, nc) => {
      if (b[nr][nc].mine) cell.number++;
    });
  }));
}
 
function openCell(b, r, c) {
  const cell = b[r][c];
  if (cell.open || cell.flag) return;
  cell.open = true;
  if (!cell.mine && cell.number === 0) {
    forNeighbors(r, c, (nr, nc) => openCell(b, nr, nc));
  }
}
 
function App() {
  const [board, setBoard] = useState(emptyBoard);
  const [status, setStatus] = useState('Playing');
  const [started, setStarted] = useState(false);
 
  function clickCell(r, c, flag = false) {
    if (status !== 'Playing') return;
 
    const b = board.map(row => row.map(cell => ({ ...cell })));
    const cell = b[r][c];
    if (cell.open) return;
 
    if (flag) {
      cell.flag = !cell.flag;
      setBoard(b);
      return;
    }
 
    if (cell.flag) return;
 
    if (!started) {
      placeMines(b, r, c);
      setStarted(true);
    }
 
    openCell(b, r, c);
 
    if (cell.mine) {
      b.flat().forEach(x => { if (x.mine) x.open = true; });
      setStatus('Game Over!');
    } else if (b.flat().filter(x => x.open && !x.mine).length === SIZE * SIZE - MINES) {
      setStatus('You Win!');
    }
    setBoard(b);
  }
 
  function newGame() {
    setBoard(emptyBoard());
    setStatus('Playing');
    setStarted(false);
  }
 
  const flags = board.flat().filter(x => x.flag).length;
 
  return (
    <div className="app">
      <h1>Minesweeper</h1>
      <p>Mines left: {MINES - flags} | Status: {status}</p>
      <button onClick={newGame}>New Game</button>
      <div className="board">
        {board.map((row, r) => row.map((cell, c) => (
          <button
            key={`${r}-${c}`}
            className="cell"
            onClick={() => clickCell(r, c)}
            onContextMenu={e => {
              e.preventDefault();
              clickCell(r, c, true);
            }}
          >
            {cell.open ? cell.mine ? '💣' : cell.number || '' : cell.flag ? '🚩' : ''}
          </button>
        )))}
      </div>
    </div>
  );
}
 
export default App;