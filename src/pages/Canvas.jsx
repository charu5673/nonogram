// css import
import '../index.css'

// react functionalities import 
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

// pages import


// components import
import CanvasButtons from '../components/CanvasButtons';
import CanvasGrid from '../components/CanvasGrid';
import Navbar from '../components/Navbar';
import TitleDialog from '../components/TitleDialog';
import Popup from '../components/Popup';
import CanvasDifficultyButtons from '../components/CanvasDifficultyButtons';

// hooks import


function Canvas() {

  const { difficulty, mode } = useParams(); 

  if(!localStorage.getItem(`${difficulty}canvasValues`) && mode != 'edit') localStorage.setItem(`${difficulty}canvasValues`,JSON.stringify(initValues(difficulty)));
  if(!localStorage.getItem(`${difficulty}canvasTitle`) && mode != 'edit') localStorage.setItem(`${difficulty}canvasTitle`,'');

  let [canvasValueState, setCanvasValue] = useState(initValues(difficulty));
  let [leftMouseDownFlag, setLeftMouseDownFlag] = useState(false);
  let [clearLeftFlag, setClearLeftFlag] = useState(false);
  let [submitFlag, setSubmitFlag] = useState(false);
  let [duplicateFlag, setDuplicateFlag] = useState(false);
  let [titleFlag, setTitleFlag] = useState(false);
  let [title, setTitle] = useState('');

  useEffect(() => {
    if( mode == 'edit' ) {
      setTitle(localStorage.getItem(`${difficulty}canvasTitleEdit`));
    } else {
      setTitle(localStorage.getItem(`${difficulty}canvasTitle`));
    }
    if( mode == 'edit' ) {
      setCanvasValue(JSON.parse(localStorage.getItem(`${difficulty}canvasValuesEdit`)));
    } else {
      setCanvasValue(JSON.parse(localStorage.getItem(`${difficulty}canvasValues`)));
    }
    return;
  }, [difficulty, mode]);

  const clearBoard = () => {
    const size = canvasValueState.length;
    let newCanvasValues = [];
    for( let i = 0; i < size; i++) {
      newCanvasValues.push([]);
      for( let j = 0; j < size; j++) {
        newCanvasValues[i].push(0);
      }
    }
    localStorage.setItem(`${difficulty}canvasValues${ mode == 'edit' ? 'Edit' : ''}`,JSON.stringify(newCanvasValues));
    localStorage.setItem(`${difficulty}canvasTitle${ mode == 'edit' ? 'Edit' : ''}`,'');
    setCanvasValue(newCanvasValues);
    setTitle('');
  }

  const updateGrid = (position,newValue) => {
    const newGrid = [...canvasValueState.map(row => [...row])];
    newGrid[position[0]][position[1]] = newValue;
    localStorage.setItem(`${difficulty}canvasValues${ mode == 'edit' ? 'Edit' : ''}`,JSON.stringify(newGrid));
    setCanvasValue(newGrid);
  }

  const submit = () => {
    if(localStorage.getItem(`${difficulty}user-puzzles`) && mode != 'edit') {
      const storageArr = JSON.parse(localStorage.getItem(`${difficulty}user-puzzles`));
      for( let i = 0; i < storageArr.length; i++ ) {
        if( storageArr[i].title == title.toLowerCase()) {
          setDuplicateFlag(true);
          setTimeout(() => {
            setDuplicateFlag(false);
          }, 3000);
          return;
        }
      }
    }
    const grid = [...canvasValueState.map(row => [...row])];
    const width = canvasValueState.length;
    const height = canvasValueState.length;
    const difficultyVal = (difficulty == 'easy') ? 1 : (difficulty == 'hard') ? 15 : 10;
    const colClues = [];
    const rowClues = [];
    let rowCurr = 0;
    let colCurr = 0;
    for(let i = 0; i < width; i++) {
      rowClues.push([]);
      colClues.push([]);
      for(let j = 0; j < width; j++) {
        if(grid[i][j] == 1) {
          rowCurr++;
        } else {
          if(rowCurr > 0) {
            rowClues[i].push(rowCurr);
            rowCurr = 0;
          }
        }
        if(grid[j][i] == 1) {
          colCurr++;
        } else {
          if(colCurr > 0) {
            colClues[i].push(colCurr);
            colCurr = 0;
          }
        }
      }
      if( rowCurr > 0 ) rowClues[i].push(rowCurr);
      if( colCurr > 0 ) colClues[i].push(colCurr);
      rowCurr = 0;
      colCurr = 0;
    }
    const newUserPuzzle = {
      title: title.toLowerCase(),
      colClues: colClues,
      rowClues: rowClues,
      width: width,
      height: height,
      difficulty: difficultyVal,
      grid: grid
    };
    if(!localStorage.getItem(`${difficulty}user-puzzles`)) {
      localStorage.setItem(`${difficulty}user-puzzles`,JSON.stringify([newUserPuzzle]));
    } else {
      const storageArr = JSON.parse(localStorage.getItem(`${difficulty}user-puzzles`));
      if( mode == 'edit' ) {
        storageArr[parseInt(localStorage.getItem(`${difficulty}editIndex`))] = newUserPuzzle;
      } else {
        storageArr.push(newUserPuzzle);
      }
      localStorage.setItem(`${difficulty}user-puzzles`,JSON.stringify(storageArr));
    }
    setSubmitFlag(true);
    setTimeout(() => {
      setSubmitFlag(false);
    }, 3000);
  }

  const updateTitle = (text) => {
    setTitle(text);
    localStorage.setItem(`${difficulty}canvasTitle${ mode == 'edit' ? 'Edit' : ''}`,text);
  }

  const handleLeftMouseDrag = (flag) => {
    setLeftMouseDownFlag(flag);
  }

  const handleMouseUp = () => {
    setLeftMouseDownFlag(false);
    setClearLeftFlag(false);
  }

  const handleClearLeft = (flag) => {
    setClearLeftFlag(flag);
  }

  return (
    <div className='canvas-page-outer' onMouseUp={handleMouseUp}>
      <Navbar createdFlag={false} createFlag={false}/>
      <div className='canvas-grid-area'>
        <CanvasButtons clearBoard={clearBoard} submit={submit} setTitleFlag={setTitleFlag} mode={mode} />
        <CanvasGrid 
        values={canvasValueState}
        updateGrid={updateGrid}
        leftMouseDownFlag={leftMouseDownFlag}
        updateLeft={handleLeftMouseDrag}
        clearLeftFlag={clearLeftFlag}
        updateClearLeft={handleClearLeft}
        title={title}
        />
        <CanvasDifficultyButtons mode={mode} />
      </div>
      { (submitFlag) ? <Popup text={ ((mode == 'edit') ? 'Edited' : 'Submitted') + "! Remember that some puzzles may be unsolvable!"} /> : null }
      { (duplicateFlag) ? <Popup text={"Puzzle with this name already exists!"} /> : null }
      { (titleFlag) ? <TitleDialog setTitleFlag={setTitleFlag} updateTitle={updateTitle} titleText={title} /> : null }
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

export default Canvas;
