// css import
import '../index.css'

// react functionalities import 
import { useState } from 'react';
import { useEffect } from 'react';

// pages import


// components import
import GameBoard from './GameBoard';
import GameButtons from './GameButtons';
import WinPopup from './WinPopup';

// hooks import


function GameArea({difficulty, leftMouseDownFlag, rightMouseDownFlag, updateLeft, updateRight, clearRightFlag, updateClearRight, clearLeftFlag, updateClearLeft}) {

  if(!localStorage.getItem(`${difficulty}values`)) localStorage.setItem(`${difficulty}values`,JSON.stringify(initValues(difficulty)));

	let [puzzleValueState, setPuzzleValue] = useState({
    values: initValues(difficulty),
    verticalClues: initClues(difficulty),
    horizontalClues: initClues(difficulty),
  });
  let [answers, setAnswers] = useState(initValues[difficulty]);
  let [winState, setWinState] = useState('none');

  useEffect(() => {
    if(localStorage.getItem(`${difficulty}puzzle`)) {
      const puzzle = JSON.parse(localStorage.getItem(`${difficulty}puzzle`));
      setPuzzleValue({
        values: JSON.parse(localStorage.getItem(`${difficulty}values`)),
        verticalClues: puzzle.colClues,
        horizontalClues: puzzle.rowClues
      });
      setAnswers(puzzle.grid);
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/random_puzzle?difficulty=${difficulty}`)
    .then(res => res.json())
    .then(data => {
      localStorage.setItem(`${difficulty}puzzle`, JSON.stringify(data));
      setPuzzleValue({
        values: JSON.parse(localStorage.getItem(`${difficulty}values`)),
        verticalClues: data.colClues,
        horizontalClues: data.rowClues
      });
      setAnswers(data.grid);
    })
    .catch(err => console.error(err));
  }, [difficulty]);

  const newGame = () => {
    fetch(`${import.meta.env.VITE_API_URL}/random_puzzle?difficulty=${difficulty}`)
    .then(res => res.json())
    .then(data => {
      localStorage.setItem(`${difficulty}puzzle`, JSON.stringify(data));
      setPuzzleValue({
        values: initValues(difficulty),
        verticalClues: data.colClues,
        horizontalClues: data.rowClues
      });
      setAnswers(data.grid);
    })
    .catch(err => console.error(err));
  }

  const clearBoard = () => {
    const size = puzzleValueState.values.length;
    let newPuzzleValues = [];
    for( let i = 0; i < size; i++) {
      newPuzzleValues.push([]);
      for( let j = 0; j < size; j++) {
        newPuzzleValues[i].push(0);
      }
    }
    localStorage.setItem(`${difficulty}values`,JSON.stringify(newPuzzleValues));
    setPuzzleValue(prev => ({
      ...prev,
      values: newPuzzleValues
    }));
  }

  const updateGrid = (position,newValue) => {
    const newGrid = [...puzzleValueState.values.map(row => [...row])];
    newGrid[position[0]][position[1]] = newValue;
    localStorage.setItem(`${difficulty}values`,JSON.stringify(newGrid));
    setPuzzleValue(prev => ({
      ...prev,
      values: newGrid
    }));
  }

  const submit = () => {
    if(winState != 'none') return;
    for(let i = 0; i < answers.length; i++) {
      for(let j = 0; j < answers[0].length; j++) {
        if(answers[i][j] == 1 && puzzleValueState.values[i][j] != 1) {
          setWinState('lost');
          setTimeout(() => {
            setWinState('none');
          }, 3000);
          return;
        } else if(answers[i][j] == 0 && puzzleValueState.values[i][j] == 1) {
          setWinState('lost');
          setTimeout(() => {
            setWinState('none');
          }, 3000);
          return;
        }
      }
    }
    setWinState('win');
    setTimeout(() => {
      setWinState('none');
    }, 4000);
  }

  return (
    <div className='game-area-outer'>
      <GameButtons resetAction={()=>clearBoard()} newGameAction={()=>newGame()} submitAction={()=>submit()}/>
      <GameBoard
        puzzleValue={puzzleValueState}
        updateGrid={(position,value,leftFlag) => updateGrid(position,value,leftFlag)}
        winState={winState}
        leftMouseDownFlag={leftMouseDownFlag}
        rightMouseDownFlag={rightMouseDownFlag}
        updateLeft={(flag) => updateLeft(flag)}
        updateRight={(flag) => updateRight(flag)}
        clearLeftFlag={clearLeftFlag}
        clearRightFlag={clearRightFlag}
        updateClearLeft={(flag) => {updateClearLeft(flag)}}
        updateClearRight={(flag) => {updateClearRight(flag)}}
      />
      { (winState == 'none') ? null : <WinPopup win={winState} />}
    </div>
  );
}

function initValues(difficulty) {
  const n = (difficulty == 'hard') ? 15 : (difficulty == 'easy') ? 5 : 10;
  const values = [];
  for( let i = 0; i < n; i++) {
    values.push([]);
    for( let j = 0; j < n; j++) {
      values[i].push(0);
    }
  }
  return values;
}

function initClues(difficulty) {
  const n = (difficulty == 'hard') ? 15 : (difficulty == 'easy') ? 5 : 10;
  const values = [];
  for( let i = 0; i < n; i++) {
    values.push([]);
  }
  return values;
}

export default GameArea;
